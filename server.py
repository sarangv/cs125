from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql

# create the Flask app
app = Flask(__name__)
CORS(app)
curr_email = ""
curr_id = None
activity_logs = {}
food_logs = {}

@app.route('/registration', methods=['POST', 'OPTIONS'])
def registration():
    global curr_email
    db = pymysql.connect(host = 'database-1.cl6ppnv90bp5.us-east-2.rds.amazonaws.com', user = 'admin', password = '12345678')
    cursor = db.cursor()
    sql = '''use testdata'''
    cursor.execute(sql)
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

@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    global curr_email
    db = pymysql.connect(host = 'database-1.cl6ppnv90bp5.us-east-2.rds.amazonaws.com', user = 'admin', password = '12345678')
    cursor = db.cursor()
    sql = '''use testdata'''
    cursor.execute(sql)
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
    global curr_email, curr_id
    dct = {}
    print(curr_email)
    
    db = pymysql.connect(host = 'database-1.cl6ppnv90bp5.us-east-2.rds.amazonaws.com', user = 'admin', password = '12345678')
    cursor = db.cursor()
    sql = '''use testdata'''
    cursor.execute(sql)
    request_data = request.get_json()
    sql = '''SELECT * FROM Users u WHERE u.email = '%s' ''' % (curr_email)
    print(cursor.execute(sql))
    ret = cursor.fetchall()[0]
    print(ret)
    curr_id = ret[0]
    dct = {'email': curr_email, 'name': ret[1] + " " + ret[2], 'username': ret[3], 'age': ret[5], 'height': ret[6], 'weight': ret[7], 'calories_b': 0, 'calories_i': 0}

    if activity_logs != {}:
        dct['calories_b'] = activity_logs['calories_b']
        dct['activity_name'] = activity_logs['activity_name']
        dct['activity_intensity'] = activity_logs['intensity']
    if food_logs != {}:
        dct['calories_i'] = food_logs['food_c_intake']
        dct['food_name'] = food_logs['food_name']
    return jsonify(dct)

@app.route('/loadactivity', methods=['POST', 'OPTIONS'])
def loadactivity():
    global activity_logs
    print("loadactivity")
    if activity_logs == {}:
        return jsonify({'valid':'false'})
    return jsonify({'activity_name': activity_logs['activity_name'], 'start_time': activity_logs['start_time'], 'end_time': activity_logs['end_time'], 'itensity': activity_logs['intensity'], 'calories_b': activity_logs['calories_b'], 'valid': 'true'})

@app.route('/loadfood', methods=['POST', 'OPTIONS'])
def loadfood():
    global food_logs
    print("loadfood")
    if food_logs == {}:
        return jsonify({'valid':'false'})
    return jsonify({'food_name': food_logs['food_name'], 'time': food_logs['food_time'], 'calories_i': food_logs['food_c_intake'], 'valid': 'true'})


@app.route('/activity', methods=['POST'])
def activity():
    db = pymysql.connect(host = 'database-1.cl6ppnv90bp5.us-east-2.rds.amazonaws.com', user = 'admin', password = '12345678')
    cursor = db.cursor()
    sql = '''use testdata'''
    cursor.execute(sql)
    # (('l_id',), ('activity_id',), ('activity_name',), ('activity_start_time',), ('activity_end_time',), ('activity_c_burned',), ('activity_intensity',))
    request_data = request.get_json()
    print(request_data)
    if request_data:
        if 'activity_name' in request_data:
            activity_logs['activity_name'] = request_data['activity_name']

        if 'start_time' in request_data:
            activity_logs['start_time'] = request_data['start_time']

        if 'end_time' in request_data:
            activity_logs['end_time'] = request_data['end_time']

        if 'intensity' in request_data:
            activity_logs['intensity'] = request_data['intensity']

        if 'calories_b' in request_data:
            activity_logs['calories_b'] = request_data['calories_b']
    return jsonify({'received': 'true'})

@app.route('/food', methods=['POST'])
def food():
    db = pymysql.connect(host = 'database-1.cl6ppnv90bp5.us-east-2.rds.amazonaws.com', user = 'admin', password = '12345678')
    cursor = db.cursor()
    sql = '''use testdata'''
    cursor.execute(sql)
    # (('l_id',), ('food_id',), ('food_name',), ('food_time',), ('food_c_intake',))
    request_data = request.get_json()
    print(request_data)
    if request_data:
        if 'food_name' in request_data:
            food_logs['food_name'] = request_data['food_name']

        if 'time' in request_data:
            food_logs['food_time'] = request_data['time']

        if 'calories_i' in request_data:
            food_logs['food_c_intake'] = request_data['calories_i']
    return jsonify({'received': 'true'})

@app.route('/logs', methods=['POST'])
def logs():
    global curr_id, activity_logs, food_logs
    if (curr_id is not None):
        db = pymysql.connect(host = 'database-1.cl6ppnv90bp5.us-east-2.rds.amazonaws.com', user = 'admin', password = '12345678')
        cursor = db.cursor()
        sql = '''use testdata'''
        cursor.execute(sql)
        request_data = request.get_json()
        sql = '''insert into Logs (p_id, l_date) values (%d, "11-28-2020")''' % (curr_id)
        cursor.execute(sql)
        db.commit() 
        print('Adding to Logs')
        sql = '''SELECT * FROM Logs u WHERE u.p_id = '%s' ''' % (curr_id) 
        cursor.execute(sql)
        ret = cursor.fetchall()[0]
        print(ret)
        log_id = ret[1]
        if (request_data):
            if len(activity_logs) != 0:
                print('Adding to activity logs')
                sql = '''insert into Activities (l_id, activity_name, activity_start_time, activity_end_time, activity_c_burned, activity_intensity) values(%d, '%s', '%s', '%s', %d, %d)''' % (log_id, activity_logs['activity_name'], activity_logs['start_time'], activity_logs['end_time'], int(activity_logs['calories_b']), int(activity_logs['intensity']))
                cursor.execute(sql)
                db.commit()
                sql = '''select * from Activities a where a.l_id = %d''' % (log_id) 
                cursor.execute(sql)
                print(cursor.fetchall())
            if len(food_logs) != 0:
                print('Adding to food logs')
                sql = '''insert into Foods (l_id, food_name, food_time, food_c_intake) values (%d, '%s', '%s', %d)''' % (log_id, food_logs['food_name'], food_logs['food_time'], int(food_logs['food_c_intake']))
                cursor.execute(sql)
                db.commit()
                sql = '''select * from Foods f where f.l_id = %d''' % (log_id) 
                cursor.execute(sql)
                print(cursor.fetchall())
            #activity_logs = {}
            #food_logs = {}
        else:
            print("User not logged in")
    
    return jsonify({'received': 'true'})
if __name__ == '__main__':
    app.run(debug=True, port=3000)