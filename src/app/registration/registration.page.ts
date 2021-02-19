import { Component, OnInit } from '@angular/core';
import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit/ngx';
import {UserService} from '../api/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage {

  get username() {
    return this.registrationForm.get("username");
  }
  get email() {
    return this.registrationForm.get("email");
  }
  get first_name() {
    return this.registrationForm.get('first_name');
  }
  get last_name() {
    return this.registrationForm.get('last_name');
  }
  get age() {
    return this.registrationForm.get('age');
  }
  get weight() {
    return this.registrationForm.get('weight');
  }
  get height() {
    return this.registrationForm.get('height');
  }

  public errorMessages = {
    username: [
      { type: 'required', message: 'Username is required' },
      { type: 'maxlength', message: 'Username cant be longer than 100 characters' }
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' }
    ],
    first_name: [
      { type: 'required', message: 'First Name is required' },
      { type: 'maxlength', message: 'First Name cant be longer than 100 characters' }
    ],
    last_name: [
      { type: 'required', message: 'Last Name is required' },
      { type: 'maxlength', message: 'Last Name cant be longer than 100 characters' }
    ],
    age: [
      { type: 'required', message: 'Age is required' },
      {type: 'pattern',message: 'Please enter a valid age'}
    ],
    height: [
      { type: 'required', message: 'Height is required' },
      {type: 'pattern',message: 'Please enter a valid height'}
    ],
    weight: [
      { type: 'required', message: 'Weight is required' },
      {type: 'pattern',message: 'Please enter a valid weight'}
    ],
  };

  dataFromService:any="";
  registrationForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.maxLength(100)]],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$')
      ]
    ],
    first_name: ['', [Validators.required, Validators.maxLength(100)]],
    last_name: ['', [Validators.required, Validators.maxLength(100)]],
    age: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{1,2}$')
      ]
    ],
    height: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{1,3}$')
      ]
    ],
    weight: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{1,3}$')
      ]
    ] 
  });
  //height: number;
  //currentHeight = 'No Data';
  //stepcount = 'No Data';
  //workouts = [];
 
  constructor(private healthKit: HealthKit, private plt: Platform, public userService:UserService, private formBuilder: FormBuilder, private navCtrl : NavController) {
    if (this.healthKit.available()) { console.log("Healthkit available"); } 
  }

  dismissRegistration() {
    this.navCtrl.navigateBack('/login');
  }
  
  public submit() {
    console.log(this.registrationForm.value);
  }
  SaveData()
  {
    let username = this.registrationForm.get("username").value;
    let email = this.registrationForm.get("email").value;
    let first_name = this.registrationForm.get("first_name").value;
    let last_name = this.registrationForm.get("last_name").value;
    let age = this.registrationForm.get("age").value;
    let weight = this.registrationForm.get("weight").value;
    let height = this.registrationForm.get("height").value;
    var dataToSend = {
      username: username, 
      email: email, 
      first_name: first_name, 
      last_name: last_name, 
      height: height, 
      weight: weight, 
      age: age};
      this.userService.Savedata(dataToSend).subscribe((response) => {
        console.log(response);
        this.navCtrl.navigateForward('/tabs');
      });
  }
}
