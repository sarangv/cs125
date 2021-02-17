import pymysql
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
    sql = '''create table %s (p_id int not null auto_increment, fname text, lname text, username text, email text, age int not null, weight int not null, height int not null, primary key (p_id))''' % (table_name)
    print(cursor.execute(sql))

#Log table:
#p_id fk
#l_id pk
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
#activity_intensity ??

#Food table:
#l_id fk
#food_id pk
#food_name
#food_time
#food_c_intake




def create_table(table_name):
    sql = '''create table %s (p_id int not null auto_increment, fname text, lname text, username text, email text, age int not null, weight int not null, height int not null, primary key (p_id))''' % (table_name)
    print(cursor.execute(sql))

def delete_table(table_name):
    sql = '''drop table %s ''' % (table_name)
    print(cursor.execute(sql))

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

database = "testdata"
use_db(database)
show_all()
get_columns("Foods")
#insert_to_table("Users", 1, "test", "data", 20, 180, 70)
#get_from_table("Users")