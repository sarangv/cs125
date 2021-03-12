import { Component, OnInit } from '@angular/core';
import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit/ngx';
import {UserService} from '../api/user.service';
import {FormBuilder, Validators} from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-usergoals',
  templateUrl: './usergoals.page.html',
  styleUrls: ['./usergoals.page.scss'],
})

/*
Avg number of snacks
Avg number of meals
Avg number of feasts (week)
Avg sleeptime
Avg cal_burned per day
Eating Goal Cal?
*/
export class UsergoalsPage {
    get snacks() {
      return this.usergoalForm.get("snacks");
    }
    get meals() {
      return this.usergoalForm.get("meals");
    }
    get feasts() {
      return this.usergoalForm.get('feasts');
    }
    get sleeptime() {
      return this.usergoalForm.get('sleeptime');
    }
    get cal_burned() {
      return this.usergoalForm.get('cal_burned');
    }
    get goal_cal() {
      return this.usergoalForm.get('goal_cal');
    }
  
    public errorMessages = {
      snacks: [
        { type: 'required', message: 'Snack count is required' },
        { type: 'pattern',message: 'Please enter a valid snack count'}
      ],
      meals: [
        { type: 'required', message: 'Meal count is required' },
        { type: 'pattern',message: 'Please enter a valid meal count'}
      ],
      feasts: [
        { type: 'required', message: 'Feast count is required' },
        { type: 'pattern',message: 'Please enter a valid feast count'}
      ],
      sleeptime: [
        { type: 'required', message: 'Sleep time is required' },
        { type: 'pattern',message: 'Please enter a valid sleep time'}
      ],
      cal_burned: [
        { type: 'required', message: 'Calorie count is required' },
        { type: 'pattern',message: 'Please enter a valid calorie count'}
      ],
      goal_cal: [
        { type: 'required', message: 'Calorie count is required' },
        { type: 'pattern',message: 'Please enter a valid calorie count'}
      ]
    };
  
    dataFromService:any="";
    usergoalForm = this.formBuilder.group({
      snacks: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{1,2}$')
        ]
      ],
      meals: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{1,2}$')
        ]
      ],
      feasts: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{1,2}$')
        ]
      ],
      sleeptime: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{1,2}$')
        ]
      ],
      cal_burned: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{1,4}$')
        ]
      ],
      goal_cal: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{1,4}$')
        ]
      ]
    });
   
    constructor(private healthKit: HealthKit, private plt: Platform, public userService:UserService, private formBuilder: FormBuilder, private navCtrl : NavController) {
      if (this.healthKit.available()) { console.log("Healthkit available"); } 
    }
  
    dismissGoals() {
      this.navCtrl.navigateBack('/login');
    }
    
    public submit() {
      console.log(this.usergoalForm.value);
    }
    SaveGoals()
    {
      let snacks = this.usergoalForm.get("snacks").value;
      let meals = this.usergoalForm.get("meals").value;
      let feasts = this.usergoalForm.get("feasts").value;
      let sleeptime = this.usergoalForm.get("sleeptime").value;
      let cal_burned = this.usergoalForm.get("cal_burned").value;
      let goal_cal = this.usergoalForm.get("goal_cal").value;
      var dataToSend = {
        snacks: snacks, 
        meals: meals, 
        feasts: feasts, 
        sleeptime: sleeptime, 
        cal_burned: cal_burned, 
        goal_cal: goal_cal};
        this.userService.Savegoals(dataToSend).subscribe((response) => {
          console.log(response);
          this.navCtrl.navigateForward('/tabs');
        });
    }
  }
