from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql

# create the Flask app
app = Flask(__name__)
CORS(app)
curr_email = ""
curr_id = 0

@app.route('/registration', methods=['POST', 'OPTIONS'])
def registration():
    global curr_email
    db = pymysql.connect(host = 'database-1.cl6ppnv90bp5.us-east-2.rds.amazonaws.com', user = 'admin', password = '12345678')
    cursor = db.cursor()
    print("Version:", cursor.execute("select version()"))
    sql = '''use testdata'''
    print(cursor.execute(sql))
    request_data = request.get_json()
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
        print(cursor.execute(sql))
        db.commit()
        sql = '''select * from Users''' 
        print(cursor.execute(sql))
        print(cursor.fetchall())

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
    global curr_email
    db = pymysql.connect(host = 'database-1.cl6ppnv90bp5.us-east-2.rds.amazonaws.com', user = 'admin', password = '12345678')
    cursor = db.cursor()
    sql = '''use testdata'''
    cursor.execute(sql)
    request_data = request.get_json()
    sql = '''SELECT * FROM Users u WHERE u.email = '%s' ''' % (curr_email)
    print(cursor.execute(sql))
    ret = cursor.fetchall()[0]
    #x = cursor.fetchall()
    print(ret)
    curr_id = ret[0]

    return jsonify({'email': curr_email, 'name': ret[1] + " " + ret[2], 'username': ret[3], 'age': ret[5], 'height': ret[6], 'weight': ret[7]})

@app.route('/activity', methods=['POST', 'OPTIONS'])
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
            activity_name = request_data['activity_name']

        if 'start_time' in request_data:
            start_time = request_data['start_time']

        if 'end_time' in request_data:
            end_time = request_data['end_time']

        if 'intensity' in request_data:
            intensity = request_data['intensity']

        if 'calories_b' in request_data:
            calories_b = request_data['calories_b']

        sql = '''insert into Activities (activity_name, activity_start_time, activity_end_time, activity_c_burned, activity_intensity) values('%s', '%s', '%s', %d, %d)''' % (activity_name, start_time, end_time, int(calories_b), int(intensity))
        print(cursor.execute(sql))
        db.commit()
        sql = '''select * from Activities''' 
        print(cursor.execute(sql))
        print(cursor.fetchall())
    return jsonify({'received': 'true'})

@app.route('/food', methods=['POST', 'OPTIONS'])
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
            food_name = request_data['food_name']

        if 'time' in request_data:
            food_time = request_data['time']

        if 'calories_i' in request_data:
            food_c_intake = request_data['calories_i']

        sql = '''insert into Foods (food_name, food_time, food_c_intake) values ('%s', '%s', %d)''' % (food_name, food_time, int(food_c_intake))
        print(cursor.execute(sql))
        db.commit()
        sql = '''select * from Foods''' 
        print(cursor.execute(sql))
        print(cursor.fetchall())
    return jsonify({'received': 'true'})

if __name__ == '__main__':
    app.run(debug=True, port=3000)