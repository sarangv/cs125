import { Component, OnInit } from '@angular/core';
import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit/ngx';
import {UserService} from '../api/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  activity_name:string;
  calories_b:string;
  food_name:string; 
  calories_i:string;
  constructor(private healthKit: HealthKit, private plt: Platform, public userService:UserService, private formBuilder: FormBuilder, private navCtrl : NavController) {
    if (this.healthKit.available()) { console.log("Healthkit available"); } 
    this.loadActivity();
    this.loadFood();
  }

  dismissRegistration() {
    this.navCtrl.navigateBack('/login');
  }

  sendtoActivity() {
    this.navCtrl.navigateBack('/activitylog');
  }

  sendtoFood() {
    this.navCtrl.navigateBack('/foodlog');
  }

  loadActivity() {
    var dataToSend = {
      data: "Sending"};
    this.userService.LoadActivity(dataToSend).subscribe((response) => {
      console.log(response);
      if (response['valid'] == 'true') {
        console.log("Activity data present");
        this.activity_name = response['activity_name']
        this.calories_b = response['calories_b']};

    });
  }

  loadFood() {
    var dataToSend = {
      data: "Sending"};
    this.userService.LoadFood(dataToSend).subscribe((response) => {
      console.log(response);
      if (response['valid'] == 'true') {
        console.log("Food data present");
        this.food_name = response['food_name']
        this.calories_i = response['calories_i']};
    
    });
  }

  saveLog() {
    console.log("Saving Data");
    var dataToSend = {
      data: "Sending"};
    this.userService.Savelog(dataToSend).subscribe((response) => {
      console.log(response);
    });
    this.navCtrl.navigateBack('/redirect');
  }

}
