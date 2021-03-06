from flask import Flask, request, jsonify
from flask_cors import CORS
from collections import defaultdict
from datetime import date
import pymysql

# create the Flask app
app = Flask(__name__)
CORS(app)
curr_email = ""
curr_id = None
db = None
activity_logs = defaultdict(list)
food_logs = defaultdict(list)

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

    return jsonify({'Added': 'valid'})

@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    global curr_email, db
    request_data = request.get_json()
    if request_data:
        if 'username' in request_data:
            curr_email = request_data['username']
            sql = '''SELECT 1 FROM Users WHERE email = '%s' ''' % (curr_email)
            if cursor.execute(sql) > 0:
                print("Found in DB")
            else:
                print("Not found")

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