import { Component, OnInit } from '@angular/core';
import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit/ngx';
import {UserService} from '../api/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { ActivitylogPage } from '../activitylog/activitylog.page';
import { FoodlogPage } from '../foodlog/foodlog.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  activity_name:any;
  calories_b:any;
  food_name:any; 
  calories_i:any;
  intensity:any;
  last_activity:any;
  last_food:any;
  activity_details:any;
  food_details:any;
  num_activities:any;
  num_foods:any;

  constructor(private healthKit: HealthKit, private plt: Platform, public userService:UserService, private formBuilder: FormBuilder, 
    private navCtrl : NavController, private modalController: ModalController) {
    if (this.healthKit.available()) { console.log("Healthkit available"); } 
    this.loadActivity();
    this.loadFood();
  }

  ionViewWillEnter() {
    this.reloadAll();
  }

  reloadAll(){
    this.loadActivity();
    this.loadFood();
  }

  async presentActivityModal() {
    const modal = await this.modalController.create({
      component: ActivitylogPage,
      cssClass: 'my-custom-class'
    });
    modal.onDidDismiss().then((response) => {
      if (response != null) {
        this.reloadAll();
      }
    });
    return await modal.present();
  }

  async presentFoodModal() {
    const modal = await this.modalController.create({
      component: FoodlogPage,
      cssClass: 'my-custom-class',
    });
    modal.onDidDismiss().then((response) => {
      if (response != null) {
        this.reloadAll();
      }
    });
    return await modal.present();
  }

  dismissRegistration() {
    this.navCtrl.navigateBack('/login');
  }

  sendtoActivity() {
    this.presentActivityModal();
    //this.navCtrl.navigateBack('/activitylog');
  }

  sendtoFood() {
    this.presentFoodModal();
    //this.navCtrl.navigateBack('/foodlog');
  }

  loadActivity() {
    var dataToSend = {
      data: "Sending"};
    this.userService.LoadActivity(dataToSend).subscribe((response) => {
      console.log(response);
      if (response['valid'] == 'true') {
        console.log("Activity data present");
        this.activity_name = response['activity_name'] 
        this.activity_details = [];
        if (typeof(this.activity_name) == 'string') {
          this.num_activities = 1;
          var info = String(this.activity_name);
          info += ';' + String(calories);
          this.activity_details.push(info);
          this.last_activity = response['activity_name'];
          this.calories_b = response['calories_b'];
          this.intensity = response['intensity'];
          //console.log("HELLO THERE THIS IS A STRING");
        }
        else {
          console.log("ENTERED ELSE");
          this.last_activity = response['activity_name'].slice(-1)[0];
          this.calories_b = response['calories_b'].slice(-1)[0];
          this.intensity = response['intensity'].slice(-1)[0];
          for (var i = 0; i < this.activity_name.length; i++) {
            var activity : string = this.activity_name[i];
            var calories = response['calories_b'][i];
            var info = String(activity);
            info += ';' + String(calories);
            this.activity_details.push(info);
            console.log(this.activity_details);
          }
          this.num_activities = this.activity_name.length;
        }
      }
      else {
        this.activity_name = [];
        this.num_activities = this.activity_name.length;
        
      }
    });
  }

  loadFood() {
    var dataToSend = {
      data: "Sending"};
    this.userService.LoadFood(dataToSend).subscribe((response) => {
      console.log(response);
      if (response['valid'] == 'true') {
        console.log("Food data present");
        this.food_details = [];
        this.food_name = response['food_name'];
        if (typeof(this.food_name) == 'string') {
          this.last_food = response['food_name'];
          this.calories_i = response['calories_i'];
          this.num_foods = 1;
          var info = String(this.food_name);
          info += ';' + String(calories);
          this.food_details.push(info);
          console.log(this.food_details);
        }
        else {
          this.calories_i = response['calories_i'].slice(-1)[0];
          this.last_food = response['food_name'].slice(-1)[0];
          this.num_foods = this.food_name.length;
          for (var i = 0; i < this.food_name.length; i++) {
            var food : string = this.food_name[i];
            var calories = response['calories_i'][i];
            var info = String(food);
            info += ';' + String(calories);
            this.food_details.push(info);
            console.log(this.food_details);
          }
        }
      }
      else {
        this.food_name = [];
        this.num_foods = 0;
      }
    });
  }

  saveLog() {
    console.log("Saving Data");
    var dataToSend = {
      data: "Sending"};
    this.userService.Savelog(dataToSend).subscribe((response) => {
      console.log(response);
    });
    //return await this.modalController.dismiss();
    this.navCtrl.navigateBack('/redirect');
  }

}
