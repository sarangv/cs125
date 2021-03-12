import { Component, OnInit } from '@angular/core';
import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit/ngx';
import {UserService} from '../api/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { finalize } from 'rxjs/operators';



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
  bf_img: any;
  l_img: any;
  d_img: any;
  loading: any;

  
  constructor(private healthKit: HealthKit, private plt: Platform, public userService:UserService, 
    private formBuilder: FormBuilder, private navCtrl : NavController, public loadingController: LoadingController) {
      //this.ionViewWillEnter();
     
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  loadRecommendation() {
    var dataToSend = {
      data: "Sending"};
    this.userService.getRecommendation(dataToSend).subscribe((response) => {
      console.log(response);
      console.log("Recommendation found");
      this.bf_time = response['b_time'];
      this.bf_food = response['b_food'];
      this.l_time = response['l_time'];
      this.l_food = response['l_food'];
      this.d_time = response['d_time'];
      this.d_food = response['d_food'];
    });
  }

  getImages() {
    this.setBFImage();
    this.setLImage();
    this.setDImage();
    console.log(this.bf_img, this.l_img, this.d_img);
  }

  setBFImage() {
    var dataToSend = {
      'foodItem' : this.bf_food
    }
    console.log(dataToSend);
    this.userService.LoadImage(dataToSend).subscribe(response => {
      
      this.bf_img = response['items'][0]['link'];
    });
    return "done";
  }

  setLImage() {
    var dataToSend = {
      'foodItem' : this.l_food
    }
    this.userService.LoadImage(dataToSend).subscribe(response => {
      console.log("DATATOSEND:", dataToSend);
      console.log("RESPONSE:", response);
      this.l_img = response['items'][0]['link'];
      //console.log(this.l_img);
    });
    return "done";
  }

  setDImage() {
    var dataToSend = {
      'foodItem' : this.d_food
    }
    this.userService.LoadImage(dataToSend).subscribe(response => {
      this.d_img = response['items'][0]['link'];
    });
    console.log(this.d_img);
    return "done";
  }

  async ionViewWillEnter() {
    await this.presentLoading();
    this.loadRecommendation();
    this.getImages();
    await this.loadingController.dismiss();
  }

}