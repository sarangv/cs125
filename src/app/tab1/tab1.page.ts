import { Component } from '@angular/core';
import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit/ngx';
import {UserService} from '../api/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  username:string;
  name:string; 
  email:string;
  age:string;
  height:string;
  weight:string;
  calories_b:string;
  calories_i:string;
  activity_name:string;
  activity_intensity:string;
  food_name:string;
  constructor(private healthKit: HealthKit, private plt: Platform, public userService:UserService, private navCtrl : NavController) {
    console.log("Excuting POST");
    var dataToSend = {
      load: "Required"};
    this.userService.LoadPage(dataToSend).subscribe((response) => {
      this.name = response['name'];
      this.username = response['username'];
      this.email = response['email'];
      this.username = response['username'];
      this.age = response['age'];
      this.height = response['height'];
      this.weight = response['weight'];
      this.calories_b = response['calories_b'];
      this.calories_i = response['calories_i'];
      if(response.hasOwnProperty('activity_name')) {
        this.activity_name = response['activity_name'];
        this.activity_intensity = response['activity_intensity']
      }
      if(response.hasOwnProperty('food_name')) { this.food_name = response['food_name']; }
      console.log(response);
    });
  }

  logout() {
    this.navCtrl.navigateBack('/login');
  }
}