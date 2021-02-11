import { Component } from '@angular/core';
import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit/ngx';
import { NavController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';



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
 
  constructor(private healthKit: HealthKit, private plt: Platform, http : HttpClient) {
    if (this.healthKit.available()) { console.log("HI"); } 
    let first_name = 'Rohit';
    let last_name = 'Sudhir';
    let height = 71;
    let weight = 160;
    let user = 'rohits1';
    let email = 'wertyui@uci.edu';
    let age = 21;
    let payload = {
      username: user,
      email: email,
      first_name: first_name,
      last_name: last_name,
      height: height,
      weight: weight,
      age: age,
    };
    let headers = {
      'Content-Type' : 'application/json'
    };
    let response = http.post('http://127.0.0.1:5000/json-example', JSON.stringify(payload), {headers: headers});
    console.log("DONE");
  }




}
