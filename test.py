import pymysql
from datetime import date
'''
DB instance identifier: database-1
Username: admin
Pass: 12345678
Host: database-1.cl6ppnv90bp5.us-east-2.rds.amazonaws.com
Port: 3306
'''

db = pymysql.connect(host = 'database-1.cl6ppnv90bp5.us-east-2.rds.amazonaws.com', user = 'admin', password = '12345678')
cursor = db.cursor()
print("Version:", cursor.execute("select version()"))

def create_db(db_name):
    sql = '''create database %s''' % (db_name)
    print(cursor.execute(sql))
    cursor.connection.commit()

def use_db(db_name):
    sql = '''use %s''' % (db_name)
    print(cursor.execute(sql))

def create_table(table_name):
    sql = '''create table %s (p_id int not null auto_increment, fname text, lname text, username text, email text, age int not null, weight int not null, height int not null, snacks int, meals int, feasts int, sleeptime int, cal_burned int, goal_cal int, primary key (p_id))''' % (table_name)
    print(cursor.execute(sql))

#Log table:
#p_id fk
#l_id pk
#l_date
#sleep_start
#sleep_end
#c_burned
#c_intake

#Activity table:
#l_id fk
#activity_id pk
#activity_name
#activity_start_time
#activity_end_time 
#activity_c_burned
#activity_intensity

#Food table:
#l_id fk
#food_id pk
#food_name
#food_time
#food_c_intake

def create_table_Logs():
    sql = '''create table Logs (l_id int not null auto_increment, p_id int not null, l_date text, sleep_start text, sleep_end text, sleep_total int, c_burned int, c_intake int, primary key (l_id), FOREIGN KEY (p_id) REFERENCES Users(p_id))'''
    print(cursor.execute(sql))

def create_table_Activities():
    sql = '''create table Activities (activity_id int not null auto_increment, l_id int not null, activity_name text, activity_start_time text, activity_end_time text, sleep_total int, activity_c_burned int, activity_intensity int, primary key (activity_id), FOREIGN KEY (l_id) REFERENCES Logs(l_id))'''
    print(cursor.execute(sql))

def create_table_Foods():
    sql = '''create table Foods (food_id int not null auto_increment, l_id int not null, food_name text, food_time text, food_c_intake int, primary key (food_id), FOREIGN KEY (l_id) REFERENCES Logs(l_id))'''
    print(cursor.execute(sql))
def create_table_Models():
    sql = '''create table Models (model_id int not null, breakfast_avg text, b_cal int, lunch_avg text, l_cal int, dinner_avg text, d_cal int, primary key (model_id))'''
    print(cursor.execute(sql))

def delete_table(table_name):
    sql = '''SET FOREIGN_KEY_CHECKS=OFF'''
    print(cursor.execute(sql))
    sql = '''drop table %s ''' % (table_name)
    print(cursor.execute(sql))
    sql = '''SET FOREIGN_KEY_CHECKS=On'''
    print(cursor.execute(sql))
    db.commit()

def remove_data(table_name):
    sql = '''SET FOREIGN_KEY_CHECKS=OFF'''
    print(cursor.execute(sql))
    sql = '''delete from %s ''' % (table_name)
    print(cursor.execute(sql))
    sql = '''SET FOREIGN_KEY_CHECKS=On'''
    print(cursor.execute(sql))
    db.commit()

def show_all():
    sql = '''show tables'''
    print(cursor.execute(sql))
    print(cursor.fetchall())


#def insert_to_table(table_name, id, fn, ln, age, weight, height):
#    sql = '''insert into %s (p_id, fname, lname, age, weight, height) values('%d', '%s', '%s', %d, %.1f, %d)''' % (table_name, id, fn, ln, age, weight, height)
#    print(cursor.execute(sql))
#    db.commit()

def get_from_table(table_name):
    sql = '''select * from %s''' % (table_name)
    print(cursor.execute(sql))
    print(cursor.fetchall())

def get_columns(table_name):
    sql = '''SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '%s' ''' % (table_name)
    print(cursor.execute(sql))
    print(cursor.fetchall())

# curr_date = date.today().strftime("%m/%d/%y")
# print(curr_date)
database = "testdata"
use_db(database)
curr_date = date.today().strftime("%m-%d-%y")
print(curr_date)
# sql = '''SET FOREIGN_KEY_CHECKS=OFF'''
# print(cursor.execute(sql))
# sql = '''DELETE FROM Logs WHERE l_id = 36 ''' 
# print(cursor.execute(sql))
# db.commit()
# sql = '''DELETE FROM Foods WHERE l_id = 36 '''
# print(cursor.execute(sql))
# db.commit()
# sql = '''SET FOREIGN_KEY_CHECKS=On'''
# print(cursor.execute(sql))
# db.commit()

#delete_table("Models")
#delete_table("Logs")
#delete_table("Foods")
#delete_table("Activities")
#create_table("Users")
#create_table_Logs()
#create_table_Activities()
#create_table_Foods()
#get_from_table("Users")
#remove_data("Users")
#remove_data("Logs")
#remove_data("Activities")
#remove_data("Foods")

#create_table_Models()
#get_from_table("Users")
#get_from_table("Logs")
get_from_table("Models")
#create_table_Models()
#get_from_table("Activities")
#get_columns("Users")
show_all()


'''
User Comparison: time of establishing membership (know how long we've had training data on them - how reliable), eating goal type, age, height, weight, average daily number of hours of sleep, avg daily # of snacks, avg daily # of meals, avg daily # of feasts

Sleep Model: [past data for validation] number of hours awake in the day, number of hours slept on the previous night, time user woke up today, today's day of the week -> predicts number of hours awake in the day

Eating Model: [past data for validation] timestamps of meals, [past data for validation] sizes of meals at those timestamps, today's day of the week, total amount of steps in the previous day, [predicted] hours awake in the day, eating goal type

Adaptive Eating Model (after one or more meals have been had): output schedule from above, size and time of meals had today, today's day of the week, total amount of steps today, eating goal type

(('p_id',), ('fname',), ('lname',), ('username',), ('email',), ('age',), ('weight',), ('height',))
7
(('l_id',), ('activity_id',), ('activity_name',), ('activity_start_time',), ('activity_end_time',), ('activity_c_burned',), ('activity_intensity',))
7
(('p_id',), ('l_id',), ('sleep_start',), ('sleep_end',), ('l_date',), ('c_burned',), ('c_intake',))
5
(('l_id',), ('food_id',), ('food_name',), ('food_time',), ('food_c_intake',))

'''