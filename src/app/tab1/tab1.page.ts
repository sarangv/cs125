import { Component } from '@angular/core';
import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit/ngx';
import { NavController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  height: number;
  currentHeight = 'No Data';
  stepcount = 'No Data';
  workouts = [];
 
  constructor(private healthKit: HealthKit, private plt: Platform) {
    if (this.healthKit.available()) { console.log("HI"); } 
  }




}
