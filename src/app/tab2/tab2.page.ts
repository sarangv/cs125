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
    return await modal.present();
  }

  async presentFoodModal() {
    const modal = await this.modalController.create({
      component: FoodlogPage,
      cssClass: 'my-custom-class',
      componentProps: {
        modal : this.modalController
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
        this.calories_b = response['calories_b'];
        this.intensity = response['intensity']};
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
