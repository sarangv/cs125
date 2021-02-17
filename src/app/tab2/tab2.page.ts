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
 
  constructor(private healthKit: HealthKit, private plt: Platform, public userService:UserService, private formBuilder: FormBuilder, private navCtrl : NavController) {
    if (this.healthKit.available()) { console.log("HI"); } 
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

}
