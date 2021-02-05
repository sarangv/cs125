from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from .forms import RegisterForm
import pymysql

db = pymysql.connect(host = 'database-1.cl6ppnv90bp5.us-east-2.rds.amazonaws.com', user = 'admin', password = '12345678')
cursor = db.cursor()
print("Version:", cursor.execute("select version()"))
sql = '''use testdata'''
print(cursor.execute(sql))

# Create your views here.
def register(response):
    if response.method == "POST":
        form = RegisterForm(response.POST)
        #if form.is_valid():
            
            #form.save()
        print(form['username'].value())
        print(form['email'].value())
        print(form['password1'].value())
        print(form['first_name'].value())
        print(form['last_name'].value())
        print(form['age'].value())
        print(form['height'].value())
        print(form['weight'].value())
        sql = '''insert into Users (fname, lname, username, email, age, weight, height) values('%s', '%s', '%s', '%s', %d, %d, %d)''' % (form['first_name'].value(), form['last_name'].value(), form['username'].value(), form['email'].value(), int(form['age'].value()), int(form['height'].value()), int(form['weight'].value()))
        print(cursor.execute(sql))
        db.commit()
        sql = '''select * from Users''' 
        print(cursor.execute(sql))
        print(cursor.fetchall())
        return redirect("/home")
    else:
        form = RegisterForm()
    return render(response, "register/register.html", {'title': 'Register', "form":form})

def home(response):
    return render(response, "register/home.html", {'title': 'About'})