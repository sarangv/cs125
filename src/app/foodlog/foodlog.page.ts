import { Component, OnInit, Input } from '@angular/core';
import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit/ngx';
import {UserService} from '../api/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import { ModalController, NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-foodlog',
  templateUrl: './foodlog.page.html',
  styleUrls: ['./foodlog.page.scss'],
})
  export class FoodlogPage implements OnInit {
    get name() {
      return this.foodForm.get("name");
    }
    get time() {
      return this.foodForm.get("time");
    }
    get calories_i() {
      return this.foodForm.get('calories_i');
    }
  
    public errorMessages = {
      name: [
        { type: 'required', message: 'Food name is required' },
        { type: 'maxlength', message: 'Food name cant be longer than 100 characters' }
      ],
      time: [
        { type: 'required', message: 'Time is required' },
        { type: 'pattern', message: 'Please enter a valid time' }
      ],
      calories_i: [
        { type: 'required', message: 'Caloric intake is required' },
        { type: 'pattern',message: 'Please enter a calorie count' } 
      ]
    };
  
    dataFromService:any="";
    foodForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      time: [
        '',
        [
          Validators.required,
          Validators.pattern('^((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))$')
        ]
      ],
      calories_i: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{1,4}$')
        ]
      ]
    });
  
    //ionic generate page x
   
    constructor(private healthKit: HealthKit, private plt: Platform, public userService:UserService, 
      private formBuilder: FormBuilder, private navCtrl : NavController, private modalController: ModalController) {
      if (this.healthKit.available()) { console.log("Healthkit available"); } 
    }

    dismissModal() {
      this.modalController.dismiss({
        'dismissed': true
      });
    }
  
    dismissRegistration() {
      this.navCtrl.navigateBack('/tabs/tab2');
    }
    
    public submit() {
      console.log(this.foodForm.value);
    }
    
    SaveFood()
    {
      let name = this.foodForm.get("name").value;
      let time = this.foodForm.get("time").value;
      let calories_i = this.foodForm.get("calories_i").value;
      var dataToSend = {
        food_name: name, 
        time: time, 
        calories_i: calories_i};
      this.userService.Savefood(dataToSend).subscribe(
        (dataReturnFromService)=>{
          this.dataFromService = JSON.stringify(dataReturnFromService);
          console.log(dataReturnFromService);
          //this.navCtrl.navigateBack('/tabs/tab2');
          this.dismissModal();
        })
  
      //this.navCtrl.navigateForward('/tabs');
    }

    ngOnInit() {
    }
  
  }
