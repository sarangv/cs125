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

    return 'Added to DB'

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

if __name__ == '__main__':
    app.run(debug=True, port=3000)