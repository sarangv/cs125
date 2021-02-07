from django import forms
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class RegisterForm(UserCreationForm):
    email = forms.EmailField()
    password2 = None
    first_name = forms.CharField()
    last_name = forms.CharField()
    age = forms.CharField()
    height = forms.CharField()
    weight = forms.CharField()
    class Meta:
        model = User
        fields = ["username", "email", "password1", "first_name", "last_name", "age", "height", "weight"]

