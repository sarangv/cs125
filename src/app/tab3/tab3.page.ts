import { Component, OnInit } from '@angular/core';
import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit/ngx';
import {UserService} from '../api/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})

export class Tab3Page {
  bf_time: any;
  bf_food: any;
  l_time: any;
  l_food: any;
  d_time: any;
  d_food: any;

  
  constructor(private healthKit: HealthKit, private plt: Platform, public userService:UserService, 
    private formBuilder: FormBuilder, private navCtrl : NavController) {
      this.ionViewWillEnter();
     
  }

  loadRecommendation() {
    var dataToSend = {
      data: "Sending"};
    this.userService.getRecommendation(dataToSend).subscribe((response) => {
      console.log(response);
      if (response['valid'] == 'true') {
        console.log("Recommendation found");
        this.bf_time = response['b_time'];
        this.bf_food = response['b_food'];
        this.l_time = response['l_time'];
        this.l_food = response['l_food'];
        this.d_time = response['d_time'];
        this.d_food = response['d_food'];
      }
    });
  }

  ionViewWillEnter() {
    this.loadRecommendation();
  }

}