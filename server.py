from flask import Flask, request, jsonify
from flask_cors import CORS
from collections import defaultdict
from datetime import date
import pymysql
import numpy as np
from sklearn.preprocessing import RobustScaler
import pandas as pd
from datetime import datetime

# create the Flask app
app = Flask(__name__)
CORS(app)
curr_email = ""
curr_id = None
db = None
today = 1
activity_logs = defaultdict(list)
food_logs = defaultdict(list)

def create_scalers(df):
  scalers = []
  for col in df.columns:
    scalers.append(RobustScaler().fit(np.expand_dims(df[col], axis=1)))
  return scalers


def scale_data(df, scalers):
  df_scaled = df.copy()
  i = 0
  for col in df.columns:
    df_scaled[col] = np.squeeze(scalers[i].transform(np.expand_dims(df[col], axis=1)), axis=1)
    i += 1
  return df_scaled

def get_similar_users(user, df_scaled, similars=1):
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
    global curr_id, db

    request_data = request.get_json()
    sql = '''SELECT l_id FROM Logs WHERE p_id = %d ''' % (curr_id)
    cursor.execute(sql)
    log_ids = cursor.fetchall()[0]
    breakfast_avg = 0
    b_c = 0
    lunch_avg = 0
    l_c = 0
    dinner_avg = 0
    d_c = 0
    i = 0
    for log_id in log_ids:
        sql = '''SELECT food_time, food_c_intake FROM Foods WHERE l_id = %d ''' % (log_id)
        cursor.execute(sql)
        times = cursor.fetchall()
        breakfast = datetime.strptime(times[0][0], '%m-%d-%y %I:%M %p')
        breakfast_avg += breakfast.hour * 60 + breakfast.minute
        lunch = datetime.strptime(times[1][0], '%m-%d-%y %I:%M %p')
        lunch_avg += lunch.hour * 60 + lunch.minute
        dinner = datetime.strptime(times[2][0], '%m-%d-%y %I:%M %p')
        dinner_avg += dinner.hour * 60 + dinner.minute

        b_c += times[0][1]
        l_c += times[1][1]
        d_c += times[2][1]
        i += 1

    breakfast_avg = int(breakfast_avg/i)
    breakfast_avg = datetime(2021, 1, 1, int(breakfast_avg / 60), breakfast_avg % 60, 0).strftime('%I:%M %p')
    lunch_avg = int(lunch_avg/i)
    lunch_avg = datetime(2021, 1, 1, int(lunch_avg / 60), lunch_avg % 60, 0).strftime('%I:%M %p')
    dinner_avg = int(dinner_avg/i)
    dinner_avg = datetime(2021, 1, 1, int(dinner_avg / 60), dinner_avg % 60, 0).strftime('%I:%M %p')

    b_c = int(b_c/i)
    l_c = int(l_c/i)
    d_c = int(d_c/i)

    sql = '''insert into Models (model_id, breakfast_avg, b_cal, lunch_avg, l_cal, dinner_avg, d_cal) values(%d, '%s', %d, '%s', %d, '%s', %d)''' % (curr_id, breakfast_avg, b_c, lunch_avg, l_c, dinner_avg, d_c)
    cursor.execute(sql)
    db.commit()
    print('Added to DB')

# Happens when end of day/next morning starts
def update_model():
    global curr_id, db

    request_data = request.get_json()
    sql = '''SELECT min(l_id) FROM Logs WHERE p_id = %d ''' % (curr_id)
    cursor.execute(sql)
    start = cursor.fetchall()[0][0]
    sql = '''SELECT max(l_id) FROM Logs WHERE p_id = %d ''' % (curr_id)
    cursor.execute(sql)
    end = cursor.fetchall()[0][0]
    
    days = end - start
    sql = '''SELECT food_time, food_c_intake FROM Foods WHERE l_id = %d ''' % (end)
    cursor.execute(sql)
    today_times = cursor.fetchall()
    
    today_breakfast = datetime.strptime(today_times[0][0], '%m-%d-%y %I:%M %p')
    today_breakfast = today_breakfast.hour * 60 + today_breakfast.minute
    today_lunch = datetime.strptime(today_times[1][0], '%m-%d-%y %I:%M %p')
    today_lunch = today_lunch.hour * 60 + today_lunch.minute
    today_dinner = datetime.strptime(today_times[2][0], '%m-%d-%y %I:%M %p')
    today_dinner = today_dinner.hour * 60 + today_dinner.minute
    t_b_c = today_times[0][1]
    t_l_c = today_times[1][1]
    t_d_c = today_times[2][1]

    sql = '''SELECT breakfast_avg, lunch_avg, dinner_avg, b_cal, l_cal, d_cal FROM Models WHERE model_id = %d ''' % (curr_id)
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

    sql = ''' Update Models Set breakfast_avg = '%s', b_cal = %d, lunch_avg = '%s', l_cal = %d, dinner_avg = '%s', d_cal = %d where model_id = %d ''' % (breakfast_avg, b_c, lunch_avg, l_c, dinner_avg, d_c, curr_id)
    cursor.execute(sql)
    db.commit()
    print('Added to DB')

# Called when user clicks their recommendation page
@app.route('/getrecommendation', methods=['POST', 'OPTIONS'])
def get_rec():
    global curr_id, db

    b_foods = dict()
    l_foods = dict()
    d_foods = dict()

    request_data = request.get_json()
    sql = '''SELECT model_id FROM Users WHERE p_id = %d ''' % (curr_id)
    cursor.execute(sql)
    model_id = cursor.fetchall()[0]
    sql = '''SELECT breakfast_avg, b_cal, lunch_avg, l_cal, dinner_avg, d_cal FROM Models WHERE model_id = %d ''' % (model_id)
    cursor.execute(sql)
    times = cursor.fetchall()[0]

    sql = '''SELECT l_id FROM Logs WHERE p_id = %d ''' % (curr_id)
    cursor.execute(sql)
    log_ids = cursor.fetchall()[0]
    for log_id in log_ids:
        sql = '''SELECT food_name, food_c_intake FROM Foods WHERE l_id = %d ''' % (log_id)
        cursor.execute(sql)
        food_data = cursor.fetchall()
        if food_data[0][0] not in b_foods and abs(food_data[0][1] - times[1]) < 200:
            b_foods[food_data[0][0]] = [1, food_data[0][1]]
        else:
            b_foods[food_data[0][0]] = [b_foods[food_data[0][0]][0] + 1, ((b_foods[food_data[0][0]][1] * b_foods[food_data[0][0]][0]) + food_data[0][1])/(b_foods[food_data[0][0]][0] + 1)]
        if food_data[1][0] not in l_foods and abs(food_data[1][1] - times[3]) < 200:
            l_foods[food_data[1][0]] = [1, food_data[1][1]]
        else:
            l_foods[food_data[1][0]] = [l_foods[food_data[1][0]][0] + 1, ((l_foods[food_data[1][0]][1] * l_foods[food_data[1][0]][0]) + food_data[1][1])/(l_foods[food_data[1][0]][0] + 1)]
        if food_data[2][0] not in d_foods and abs(food_data[2][1] - times[5]) < 200:
            d_foods[food_data[2][0]] = [1, food_data[2][1]]
        else:
            d_foods[food_data[2][0]] = [d_foods[food_data[2][0]][0] + 1, ((d_foods[food_data[2][0]][1] * d_foods[food_data[2][0]][0]) + food_data[2][1])/(d_foods[food_data[2][0]][0] + 1)]

    b_rec = sorted(b_foods.items(), key=lambda item: -item[1][0])[0][0]
    l_rec = sorted(l_foods.items(), key=lambda item: -item[1][0])[0][0]
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
    global curr_email, db, today
    request_data = request.get_json()
    if request_data:
        if 'username' in request_data:
            curr_email = request_data['username']
            sql = '''SELECT 1 FROM Users WHERE email = '%s' ''' % (curr_email)
            if cursor.execute(sql) > 0:
                print("Found in DB")
            else:
                print("Not found")

    # WHAT HAPPENS WHEN WE HAVE NO LOGS? Put this in a try-except block and make day value = 1?
    request_data = request.get_json()
    sql = '''SELECT min(l_id) FROM Logs WHERE p_id = %d ''' % (curr_id)
    cursor.execute(sql)
    start = cursor.fetchall()[0][0]
    sql = '''SELECT max(l_id) FROM Logs WHERE p_id = %d ''' % (curr_id)
    cursor.execute(sql)
    end = cursor.fetchall()[0][0]
    days = end - start + 1

    # We've reached a new day if this statement is true! (Treating it as a morning login)
    if days != today:
        today = days
        if today == 15:
            sql = ''' Update Users Set model_id = %d where p_id = %d ''' % (curr_id, curr_id)
            cursor.execute(sql)
            db.commit()
            create_model()
        if today > 15:
            update_model()

    print(curr_email)
    return jsonify({'valid': 'yes', 'email': 'found'})

@app.route('/loadprofile', methods=['POST', 'OPTIONS'])
def loadprofile():
    print("loadprofile")
    global curr_email, curr_id, db
    dct = {}
    print(curr_email)
    request_data = request.get_json()
    sql = '''SELECT * FROM Users u WHERE u.email = '%s' ''' % (curr_email)
    cursor.execute(sql)
    ret = cursor.fetchall()[0]
    print(ret)
    curr_id = ret[0]
    curr_date = date.today().strftime("%y-%m-%d")
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
        '''
        if activity_logs != {}:
            dct['calories_b'] = activity_logs['calories_b']
            dct['activity_name'] = activity_logs['activity_name']
            dct['activity_intensity'] = activity_logs['intensity']
        if food_logs != {}:
            dct['calories_i'] = food_logs['food_c_intake']
            dct['food_name'] = food_logs['food_name']
        '''
    else:
        dct = dct = {'email': curr_email, 'name': ret[1] + " " + ret[2], 'username': ret[3], 'age': ret[5], 'height': ret[6], 'weight': ret[7], 'calories_b': 0, 'calories_i': 0}
    return jsonify(dct)

@app.route('/loadactivity', methods=['POST', 'OPTIONS'])
def loadactivity():
    global activity_logs, db
    print("loadactivity")
    if activity_logs == {}:
        return jsonify({'valid':'false'})
    return jsonify({'activity_name': activity_logs['activity_name'][-1], 'start_time': activity_logs['start_time'][-1], 'end_time': activity_logs['end_time'][-1], 'intensity': activity_logs['intensity'][-1], 'calories_b': activity_logs['calories_b'][-1], 'valid': 'true'})

@app.route('/loadfood', methods=['POST', 'OPTIONS'])
def loadfood():
    global food_logs, db
    print("loadfood")
    if food_logs == {}:
        return jsonify({'valid':'false'})
    return jsonify({'food_name': food_logs['food_name'][-1], 'time': food_logs['food_time'][-1], 'calories_i': food_logs['food_c_intake'][-1], 'valid': 'true'})


@app.route('/activity', methods=['POST'])
def activity():
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
    global curr_id, activity_logs, food_logs, db
    if (curr_id is not None):
        print("entered logs")
        request_data = request.get_json()
        curr_date = date.today().strftime("%m-%d-%y")
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