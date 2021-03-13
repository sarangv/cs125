from flask import Flask, request, jsonify
from flask_cors import CORS
from collections import defaultdict
from datetime import date
import pymysql
import numpy as np
from sklearn.preprocessing import RobustScaler
import pandas as pd
import time
from datetime import datetime

# create the Flask app
app = Flask(__name__)
CORS(app)
curr_email = ""
curr_id = None
curr_date = date.today().strftime("%y-%m-%d")
db = None
today = 1
activity_logs = defaultdict(list)
food_logs = defaultdict(list)

def create_scalers(df):
    ''' Takes a Pandas DataFrame and outputs a list of RobustScalers to scale down the data for each column in the DataFrame '''
  scalers = []
  for col in df.columns:
    scalers.append(RobustScaler().fit(np.expand_dims(df[col], axis=1)))
  return scalers


def scale_data(df, scalers):
    ''' Takes a Pandas DataFrame and list of RobustScalers (generated from create_scalers) and outputs a DataFrame with its columns of data scaled down according to the provided list '''
  df_scaled = df.copy()
  i = 0
  for col in df.columns:
    df_scaled[col] = np.squeeze(scalers[i].transform(np.expand_dims(df[col], axis=1)), axis=1)
    i += 1
  return df_scaled

def get_similar_users(user, df_scaled, similars=1):
    ''' Takes a user row index, scaled Pandas DataFrame, and desired number of top results for similar users to output the user index, whose data is the closest to the provided user row index’s data via Euclidean distance calculations '''
  similarity_dists = []
  data = df_scaled.to_numpy()
  user_data = df_scaled.loc[user]
  for i in range(len(data)):
    if user == df_scaled.index[i]:
      dist = 1e15
    else:
      dist = np.sqrt(np.sum([(a-b)*(a-b) for a, b in zip(user_data, data[i])]))
    similarity_dists.append(dist)
  similarity_dists = list(enumerate(similarity_dists))
  similarity_dists.sort(key=lambda x:x[1])
  users = [df_scaled.index[index] for index, val in similarity_dists[:similars]]
  return users

# Upon usergoals completion
def find_similar_user():
    ''' Executes the database request for pulling user information to use for comparison in the get_similar_users() function '''
    global curr_id, db
    request_data = request.get_json()
    sql = '''SELECT age, height, weight, snacks, meals, feasts, sleeptime, cal_burned, goal_cal FROM Users u '''
    cursor.execute(sql)
    ret = cursor.fetchall()
    #print(ret)
    
    sql_ids = '''SELECT p_id FROM Users u'''
    cursor.execute(sql_ids)
    ids = cursor.fetchall()
    #print(ids)

    df_user = pd.DataFrame(data=np.array(ret), index=np.squeeze(np.array(ids), axis=1))
    scalers = create_scalers(df_user)
    df_scaled = scale_data(df_user, scalers)

    # REPLACE WITH CURR_ID
    closest_user = get_similar_users(curr_id, df_scaled)[0]
    sql = ''' Update Users Set model_id = %d where p_id = %d ''' % (closest_user, curr_id)
    cursor.execute(sql)
    db.commit()


@app.route('/registration', methods=['POST', 'OPTIONS'])
def registration():
    ''' Grabs basic data from user and adds to Users table '''
    global curr_email, db
    request_data = request.get_json()
    print(request_data)
    username = None
    email = None
    password = None
    first_name = None
    last_name = None
    age = None
    height = None
    weight = None
    
    if request_data:
        if 'username' in request_data:
            username = request_data['username']

        if 'email' in request_data:
            email = request_data['email']
            curr_email = email

        if 'first_name' in request_data:
            first_name = request_data['first_name']

        if 'last_name' in request_data:
            last_name = request_data['last_name']

        if 'age' in request_data:
            age = request_data['age']

        if 'height' in request_data:
            height = request_data['height']

        if 'weight' in request_data:
            weight = request_data['weight']

        sql = '''insert into Users (fname, lname, username, email, age, weight, height) values('%s', '%s', '%s', '%s', %d, %d, %d)''' % (first_name, last_name, username, email, int(age), int(height), int(weight))
        cursor.execute(sql)
        db.commit()
        print('Added to DB')

    return jsonify({'Added': 'valid'})

@app.route('/usergoals', methods=['POST', 'OPTIONS'])
def usergoals():
    ''' Grabs goals from user, updates Users table, and finds a similar user for the first 14 days '''
    global curr_email, db
    sql = '''SELECT * FROM Users u WHERE u.email = '%s' ''' % (curr_email)
    cursor.execute(sql)
    ret = cursor.fetchall()[0]
    print(ret)
    curr_id = ret[0]
    request_data = request.get_json()
    print(request_data)

    snacks = None
    meals = None
    feasts = None
    sleeptime = None
    cal_burned = None
    goal_cal = None
    
    if request_data:
        if 'snacks' in request_data:
            snacks = request_data['snacks']

        if 'meals' in request_data:
            meals = request_data['meals']

        if 'feasts' in request_data:
            feasts = request_data['feasts']

        if 'sleeptime' in request_data:
            sleeptime = request_data['sleeptime']

        if 'cal_burned' in request_data:
            cal_burned = request_data['cal_burned']

        if 'goal_cal' in request_data:
            goal_cal = request_data['goal_cal']

        sql = ''' Update Users Set snacks = %d, meals = %d, feasts = %d, sleeptime = %d, cal_burned = %d, goal_cal = %d where p_id = %d ''' % (int(snacks), int(meals), int(feasts), int(sleeptime), int(cal_burned), int(goal_cal), curr_id)
        cursor.execute(sql)
        db.commit()
        print('Added to DB')

    # ASSOCIATES CURR USER WITH A SIMILAR USER'S MODEL
    find_similar_user()

    return jsonify({'Added': 'valid'})


def create_model():
    ''' Computes calorie and time averages for the first 14 days of data belonging to a logged-in user, and stores this information in the database’s Model table '''
    global curr_id, db

    request_data = request.get_json()
    sql = '''SELECT l_id FROM Logs WHERE p_id = %d ''' % (curr_id)
    cursor.execute(sql)
    #log_ids = cursor.fetchall()[0]
    log_ids = cursor.fetchall()
    b_times = [0,0,0,0,0,0,0]
    b_c = 0
    l_times = [0,0,0,0,0,0,0]
    l_c = 0
    d_times = [0,0,0,0,0,0,0]
    d_c = 0

    day_count = [0,0,0,0,0,0,0]
    i = 0

    for log_id in log_ids:
        sql = '''SELECT food_time, food_c_intake FROM Foods WHERE l_id = %d ''' % (log_id)
        cursor.execute(sql)
        times = cursor.fetchall()
        breakfast = datetime.strptime(times[0][0], '%m-%d-%y %I:%M %p')

        day_of_week = breakfast.weekday()

        b_times[day_of_week] += breakfast.hour * 60 + breakfast.minute
        lunch = datetime.strptime(times[1][0], '%m-%d-%y %I:%M %p')
        l_times[day_of_week] += lunch.hour * 60 + lunch.minute
        dinner = datetime.strptime(times[2][0], '%m-%d-%y %I:%M %p')
        d_times[day_of_week] += dinner.hour * 60 + dinner.minute

        b_c += times[0][1]
        l_c += times[1][1]
        d_c += times[2][1]
        day_count[day_of_week] += 1
        i += 1

    for j in range(7):
        b_times[j] = int(b_times[j]/day_count[j])
        b_times[j] = datetime(2021, 1, 1, int(b_times[j] / 60), b_times[j] % 60, 0).strftime('%I:%M %p')
        l_times[j] = int(l_times[j]/day_count[j])
        l_times[j] = datetime(2021, 1, 1, int(l_times[j] / 60), l_times[j] % 60, 0).strftime('%I:%M %p')
        d_times[j] = int(d_times[j]/day_count[j])
        d_times[j] = datetime(2021, 1, 1, int(d_times[j] / 60), d_times[j] % 60, 0).strftime('%I:%M %p')

    b_c = int(b_c/i)
    l_c = int(l_c/i)
    d_c = int(d_c/i)

    sql = '''insert ignore into Models (model_id, b_time0, b_time1, b_time2, b_time3, b_time4, b_time5, b_time6, b_cal, l_time0, l_time1, l_time2, l_time3, l_time4, l_time5, l_time6, l_cal, d_time0, d_time1, d_time2, d_time3, d_time4, d_time5, d_time6, d_cal) values(%d, '%s', '%s', '%s', '%s', '%s', '%s', '%s', %d, '%s', '%s', '%s', '%s', '%s', '%s', '%s', %d, '%s', '%s', '%s', '%s', '%s', '%s', '%s', %d)''' % (curr_id, b_times[0], b_times[1], b_times[2], b_times[3], b_times[4], b_times[5], b_times[6], b_c, l_times[0], l_times[1], l_times[2], l_times[3], l_times[4], l_times[5], l_times[6], l_c, d_times[0], d_times[1], d_times[2], d_times[3], d_times[4], d_times[5], d_times[6], d_c)
    cursor.execute(sql)
    db.commit()
    print('Added to DB')

# Happens when end of day/next morning starts
def update_model():
    ''' Updates the Model table for a logged-in user based on their recently entered food log '''
    global curr_id, db

    request_data = request.get_json()
    sql = '''SELECT min(l_id) FROM Logs WHERE p_id = %d ''' % (curr_id)
    cursor.execute(sql)
    start = cursor.fetchall()[0][0]
    sql = '''SELECT max(l_id) FROM Logs WHERE p_id = %d ''' % (curr_id)
    cursor.execute(sql)
    end = cursor.fetchall()[0][0]

    sql = '''SELECT food_time FROM Foods WHERE l_id = %d ''' % (start)
    cursor.execute(sql)
    first_day = cursor.fetchall()[0][0]
    first_day = datetime.strptime(first_day, '%m-%d-%y %I:%M %p').weekday()
    
    sql = '''SELECT food_time, food_c_intake FROM Foods WHERE l_id = %d ''' % (end)
    cursor.execute(sql)
    today_times = cursor.fetchall()
    
    today_breakfast = datetime.strptime(today_times[0][0], '%m-%d-%y %I:%M %p')

    day_of_week = today_breakfast.weekday()
    days = end - start
    days = int(days / 7) + (first_day < day_of_week)

    today_breakfast = today_breakfast.hour * 60 + today_breakfast.minute
    today_lunch = datetime.strptime(today_times[1][0], '%m-%d-%y %I:%M %p')
    today_lunch = today_lunch.hour * 60 + today_lunch.minute
    today_dinner = datetime.strptime(today_times[2][0], '%m-%d-%y %I:%M %p')
    today_dinner = today_dinner.hour * 60 + today_dinner.minute
    t_b_c = today_times[0][1]
    t_l_c = today_times[1][1]
    t_d_c = today_times[2][1]

    sql = '''SELECT b_time%d, l_time%d, d_time%d, b_cal, l_cal, d_cal FROM Models WHERE model_id = %d ''' % (day_of_week, day_of_week, day_of_week, curr_id)
    cursor.execute(sql)
    times = cursor.fetchall()[0]

    breakfast_avg = datetime.strptime('01-01-21 ' + times[0], '%m-%d-%y %I:%M %p')
    breakfast_avg = breakfast_avg.hour * 60 + breakfast_avg.minute
    lunch_avg = datetime.strptime('01-01-21 ' + times[1], '%m-%d-%y %I:%M %p')
    lunch_avg = lunch_avg.hour * 60 + lunch_avg.minute
    dinner_avg = datetime.strptime('01-01-21 ' + times[2], '%m-%d-%y %I:%M %p')
    dinner_avg = dinner_avg.hour * 60 + dinner_avg.minute
    b_c = times[3]
    l_c = times[4]
    d_c = times[5]

    breakfast_avg = int(((breakfast_avg * days) + today_breakfast)/(days+1))
    b_c = int(((b_c * days) + t_b_c)/(days+1))
    lunch_avg = int(((lunch_avg * days) + today_lunch)/(days+1))
    l_c = int(((l_c * days) + t_l_c)/(days+1))
    dinner_avg = int(((dinner_avg * days) + today_dinner)/(days+1))
    d_c = int(((d_c * days) + t_l_c)/(days+1))

    breakfast_avg = datetime(2021, 1, 1, int(breakfast_avg / 60), breakfast_avg % 60, 0).strftime('%I:%M %p')
    lunch_avg = datetime(2021, 1, 1, int(lunch_avg / 60), lunch_avg % 60, 0).strftime('%I:%M %p')
    dinner_avg = datetime(2021, 1, 1, int(dinner_avg / 60), dinner_avg % 60, 0).strftime('%I:%M %p')

    sql = ''' Update Models Set b_time%d = '%s', b_cal = %d, l_time%d = '%s', l_cal = %d, d_time%d = '%s', d_cal = %d where model_id = %d ''' % (day_of_week, breakfast_avg, b_c, day_of_week, lunch_avg, l_c, day_of_week, dinner_avg, d_c, curr_id)
    cursor.execute(sql)
    db.commit()
    print('Added to DB')

# Called when user clicks their recommendation page
@app.route('/getrecommendation', methods=['GET'])
def get_rec():
    ''' Pulls the Model and food item history for a logged-in user, and returns a JSON of the recommended meal times and meal items '''
    global curr_id, db

    b_foods = dict()
    l_foods = dict()
    d_foods = dict()

    request_data = request.get_json()
    sql = '''SELECT * FROM Models WHERE model_id = %d ''' % (9)
    cursor.execute(sql)
    a = cursor.fetchall()[0]
    print("Breakfast times:")
    print(a[1:8])
    print("Lunch times:")
    print(a[9:16])
    print("Dinner times:")
    print(a[17:-1])


    sql = '''SELECT model_id FROM Users WHERE p_id = %d ''' % (curr_id)
    cursor.execute(sql)
    model_id = cursor.fetchall()[0][0]

    sql = '''SELECT max(l_id), c_burned FROM Logs WHERE p_id = %d ''' % (curr_id)
    cursor.execute(sql)
    recent_pair = cursor.fetchall()[0]
    end = recent_pair[0]
    c_burned = recent_pair[1]

    sql = '''SELECT food_time FROM Foods WHERE l_id = %d ''' % (end)
    cursor.execute(sql)
    today = cursor.fetchall()[0][0]
    today = datetime.strptime(today, '%m-%d-%y %I:%M %p').weekday() 
    day_of_week = (today+1) % 7

    sql = '''SELECT b_time%d, b_cal, l_time%d, l_cal, d_time%d, d_cal FROM Models WHERE model_id = %d ''' % (day_of_week, day_of_week, day_of_week, model_id)
    cursor.execute(sql)
    times = list(cursor.fetchall()[0])
    print("Recommended times and calories:")
    print(times)
    times[1] += int(c_burned/3)
    times[3] += int(c_burned/3)
    times[5] += int(c_burned/3)

    sql = '''SELECT l_id FROM Logs WHERE p_id = %d ''' % (curr_id)
    cursor.execute(sql)
    log_ids = cursor.fetchall()[0]
    for log_id in log_ids:
        sql = '''SELECT food_name, food_c_intake FROM Foods WHERE l_id = %d ''' % (log_id)
        cursor.execute(sql)
        food_data = cursor.fetchall()
        print(food_data)
        if abs(food_data[0][1] - times[1]) < 200:
            if food_data[0][0] not in b_foods:
                b_foods[food_data[0][0]] = [1, food_data[0][1]]
            else:
                b_foods[food_data[0][0]] = [b_foods[food_data[0][0]][0] + 1, ((b_foods[food_data[0][0]][1] * b_foods[food_data[0][0]][0]) + food_data[0][1])/(b_foods[food_data[0][0]][0] + 1)]
        if abs(food_data[1][1] - times[3]) < 200:
            if food_data[1][0] not in l_foods:
                l_foods[food_data[1][0]] = [1, food_data[1][1]]
            else:
                l_foods[food_data[1][0]] = [l_foods[food_data[1][0]][0] + 1, ((l_foods[food_data[1][0]][1] * l_foods[food_data[1][0]][0]) + food_data[1][1])/(l_foods[food_data[1][0]][0] + 1)]
        if abs(food_data[2][1] - times[5]) < 200:
            if food_data[2][0] not in d_foods:
                d_foods[food_data[2][0]] = [1, food_data[2][1]]
            else:
                d_foods[food_data[2][0]] = [d_foods[food_data[2][0]][0] + 1, ((d_foods[food_data[2][0]][1] * d_foods[food_data[2][0]][0]) + food_data[2][1])/(d_foods[food_data[2][0]][0] + 1)]
    b_rec = ""
    l_rec = ""
    d_rec = ""
    if len(b_foods) > 0:
        b_rec = sorted(b_foods.items(), key=lambda item: -item[1][0])[0][0]
    if len(l_foods) > 0:
        l_rec = sorted(l_foods.items(), key=lambda item: -item[1][0])[0][0]
    if len(d_foods) > 0:
        d_rec = sorted(d_foods.items(), key=lambda item: -item[1][0])[0][0]

    return jsonify({
        'b_time': times[0],
        'b_food': b_rec,
        'l_time': times[2],
        'l_food': l_rec,
        'd_time': times[4],
        'd_food': d_rec
    })


@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    ''' Logs the user into app and validates if valid user. After login, their model is either updated or created if 14 days have passed '''
    global curr_email, curr_id, db, today
    print("login")
    request_data = request.get_json()
    print(request.headers)
    print(request_data)
    if request_data:
        if 'username' in request_data:
            curr_email = request_data['username']
            #sql = '''SELECT 1 FROM Users WHERE email = '%s' ''' % (curr_email)
            sql = '''SELECT * FROM Users u WHERE u.email = '%s' ''' % (curr_email)
            cursor.execute(sql)
            ret = cursor.fetchall()[0]
            print("SQL RETURN")
            print(ret)
            curr_id = ret[0]
            if cursor.execute(sql) > 0:
                print("Found in DB")
            else:
                print("Not found")
            print(curr_id)
            sql = '''SELECT min(l_id) FROM Logs WHERE p_id = %d ''' % (curr_id)
            print("Min_id")
            print(cursor.execute(sql))
            start = cursor.fetchall()[0]
            print(start)
            if len(start) > 0:
                start = start[0]
            else:
                start = 0
            sql = '''SELECT max(l_id) FROM Logs WHERE p_id = %d ''' % (curr_id)
            print("Max_id")
            print(cursor.execute(sql))
            end = cursor.fetchall()[0]
            print(end)
            if len(end) > 0:
                end = end[0]
            else:
                end = 0
            days = end - start + 1


            # We've reached a new day if this statement is true! (Treating it as a morning login)
            if days != today:
                today = days
                if today == 15:
                    sql = '''Update Users Set model_id = %d where p_id = %d ''' % (curr_id, curr_id)
                    cursor.execute(sql)
                    db.commit()
                    create_model()
                    print("Model Created")
                if today > 15:
                    update_model()
                    print("Model updates")

    print(curr_email)
    
    return jsonify({'valid': 'yes', 'email': 'found'})

@app.route('/loadprofile', methods=['POST', 'OPTIONS'])
def loadprofile():
    ''' Loads users' data for profile page '''
    print("loadprofile")
    global curr_email, curr_id, db, curr_date
    dct = {}
    print(curr_email)
    request_data = request.get_json()
    sql = '''SELECT * FROM Users u WHERE u.email = '%s' ''' % (curr_email)
    cursor.execute(sql)
    ret = cursor.fetchall()[0]
    print(ret)
    curr_id = ret[0]
    #curr_date = date.today().strftime("%y-%m-%d")
    sql = '''SELECT * FROM Logs l WHERE l.p_id = %d and l.l_date = '%s' ''' % (curr_id, curr_date)
    cursor.execute(sql)
    prof = cursor.fetchall()
    if len(prof) > 0:
        print(prof)
        log_id = prof[0][0]
        calories_b = prof[0][6]
        calories_i = prof[0][7]
        sql = '''SELECT * FROM Activities f WHERE f.l_id = %d ''' % (log_id)
        cursor.execute(sql)
        a = cursor.fetchall()
        print(a)
        sql = '''SELECT * FROM Foods f WHERE f.l_id = %d ''' % (log_id)
        cursor.execute(sql)
        f = cursor.fetchall()
        print(f)
        dct = {'email': curr_email, 'name': ret[1] + " " + ret[2], 'username': ret[3], 'age': ret[5], 'height': ret[6], 'weight': ret[7], 'calories_b': calories_b, 'calories_i': calories_i}
    else:
        dct = dct = {'email': curr_email, 'name': ret[1] + " " + ret[2], 'username': ret[3], 'age': ret[5], 'height': ret[6], 'weight': ret[7], 'calories_b': 0, 'calories_i': 0}
    return jsonify(dct)

@app.route('/loadactivity', methods=['POST', 'OPTIONS'])
def loadactivity():
    ''' Returns users' added activities '''
    global activity_logs, db
    print("loadactivity")
    if activity_logs == {}:
        return jsonify({'valid':'false'})
    return jsonify({'activity_name': activity_logs['activity_name'], 'start_time': activity_logs['start_time'], 'end_time': activity_logs['end_time'], 'intensity': activity_logs['intensity'], 'calories_b': activity_logs['calories_b'], 'valid': 'true'})

@app.route('/loadfood', methods=['POST', 'OPTIONS'])
def loadfood():
    ''' Returns users' added foods '''
    global food_logs, db
    print("loadfood")
    if food_logs == {}:
        return jsonify({'valid':'false'})
    return jsonify({'food_name': food_logs['food_name'], 'time': food_logs['food_time'], 'calories_i': food_logs['food_c_intake'], 'valid': 'true'})


@app.route('/activity', methods=['POST'])
def activity():
    ''' Stores activities '''
    global db, activity_logs
    # (('l_id',), ('activity_id',), ('activity_name',), ('activity_start_time',), ('activity_end_time',), ('activity_c_burned',), ('activity_intensity',))
    request_data = request.get_json()
    print(request_data)
    if request_data:
        if 'activity_name' in request_data:
            activity_logs['activity_name'].append(request_data['activity_name'])

        if 'start_time' in request_data:
            activity_logs['start_time'].append(request_data['start_time'])

        if 'end_time' in request_data:
            activity_logs['end_time'].append(request_data['end_time'])

        if 'intensity' in request_data:
            activity_logs['intensity'].append(request_data['intensity'])

        if 'calories_b' in request_data:
            activity_logs['calories_b'].append(request_data['calories_b'])
        print(activity_logs)
    return jsonify({'received': 'true'})

@app.route('/food', methods=['POST'])
def food():
    ''' Stores foods '''
    global db, food_logs
    # (('l_id',), ('food_id',), ('food_name',), ('food_time',), ('food_c_intake',))
    request_data = request.get_json()
    print(request_data)
    if request_data:
        if 'food_name' in request_data:
            food_logs['food_name'].append(request_data['food_name'])

        if 'time' in request_data:
            food_logs['food_time'].append(request_data['time'])

        if 'calories_i' in request_data:
            food_logs['food_c_intake'].append(request_data['calories_i'])
        print(food_logs)
    return jsonify({'received': 'true'})

@app.route('/logs', methods=['POST'])
def logs():
    ''' Adds processed logs, activities, and foods to DB '''
    global curr_id, activity_logs, food_logs, db, curr_date
    if (curr_id is not None):
        print("entered logs")
        request_data = request.get_json()
        #curr_date = date.today().strftime("%m-%d-%y")
        sql = '''SELECT * FROM Logs u WHERE u.p_id = '%s' and u.l_date = '%s' ''' % (curr_id, curr_date) 
        cursor.execute(sql)
        ret = cursor.fetchall()
        log_id = None
        calories_i = 0
        calories_b = 0
        print(ret)
        if len(ret) == 0:
            sql = '''insert into Logs (p_id, l_date) values (%d, '%s')''' % (curr_id, curr_date)
            cursor.execute(sql)
            db.commit() 
            sql = '''SELECT * FROM Logs u WHERE u.p_id = %d and u.l_date = '%s' ''' % (curr_id, curr_date) 
            print(sql)
            cursor.execute(sql)
            new_ret = cursor.fetchall()[0]
            log_id = new_ret[0]
            print(log_id)
            print('Adding to Logs')
        else: 
            log_id = ret[0][0]
            calories_b = ret[0][6]
            calories_i = ret[0][7]
            print(log_id)
        
        if (request_data):
            if len(activity_logs) != 0:
                print('Adding to activity logs')
                num_activities = len(activity_logs['activity_name'])
                for i in range(num_activities):
                    start = curr_date + " " + activity_logs['start_time'][i]
                    end = curr_date + " " + activity_logs['end_time'][i]
                    calories_b += int(activity_logs['calories_b'][i])
                    sql = '''insert into Activities (l_id, activity_name, activity_start_time, activity_end_time, activity_c_burned, activity_intensity) values(%d, '%s', '%s', '%s', %d, %d)''' % (log_id, activity_logs['activity_name'][i], start, end, int(activity_logs['calories_b'][i]), int(activity_logs['intensity'][i]))
                    print(sql)
                    cursor.execute(sql)
                    db.commit()
                print("Activities added: ")
                sql = '''select * from Activities a where a.l_id = %d''' % (log_id) 
                cursor.execute(sql)
                print(cursor.fetchall())
            if len(food_logs) != 0:
                print('Adding to food logs')
                num_foods = len(food_logs['food_name'])
                for i in range(num_foods):
                    tme = curr_date + " " + food_logs['food_time'][i]
                    calories_i += int(food_logs['food_c_intake'][i])
                    sql = '''insert into Foods (l_id, food_name, food_time, food_c_intake) values (%d, '%s', '%s', %d)''' % (log_id, food_logs['food_name'][i], tme, int(food_logs['food_c_intake'][i]))
                    print(sql)
                    cursor.execute(sql)
                    db.commit()
                print("Foods added: ")
                sql = '''select * from Foods f where f.l_id = %d''' % (log_id) 
                cursor.execute(sql)
                print(cursor.fetchall())

            sql = ''' Update Logs Set c_burned = %d, c_intake = %d where l_id = %d and l_date = '%s' ''' % (calories_b, calories_i, log_id, curr_date)
            cursor.execute(sql)
            db.commit()
            activity_logs = defaultdict(list)
            food_logs = defaultdict(list)
        else:
            print("User not logged in")
    
    return jsonify({'received': 'true'})
if __name__ == '__main__':
    db = pymysql.connect(host = 'database-1.cl6ppnv90bp5.us-east-2.rds.amazonaws.com', user = 'admin', password = '12345678')
    cursor = db.cursor()
    sql = '''use testdata'''
    cursor.execute(sql)
    app.run(debug=True, port=3000)
