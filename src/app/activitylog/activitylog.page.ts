import { Component, OnInit } from '@angular/core';
import { HealthKit, HealthKitOptions } from '@ionic-native/health-kit/ngx';
import { UserService } from '../api/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-activitylog',
  templateUrl: './activitylog.page.html',
  styleUrls: ['./activitylog.page.scss'],
})
  export class ActivitylogPage implements OnInit {
    get name() {
      return this.activityForm.get("name");
    }
    get start_time() {
      return this.activityForm.get("start_time");
    }
    get end_time() {
      return this.activityForm.get("end_time");
    }
    get intensity() {
      return this.activityForm.get('intensity');
    }
    get calories_b() {
      return this.activityForm.get('calories_b');
    }
  
    public errorMessages = {
      name: [
        { type: 'required', message: 'Activity name is required' },
        { type: 'maxlength', message: 'Activity name cant be longer than 100 characters' }
      ],
      start_time: [
        { type: 'required', message: 'Start time is required' },
        { type: 'pattern', message: 'Please enter a valid Start time' }
      ],
      end_time: [
        { type: 'required', message: 'End time is required' },
        { type: 'pattern', message: 'Please enter a valid End time' }
      ],
      intensity: [
        { type: 'required', message: 'Intensity is required' },
        { type: 'pattern', message: 'Please enter a valid intensity' }
      ],
      calories_b: [
        { type: 'required', message: 'Calories burned is required' },
        { type: 'pattern',message: 'Please enter a calorie count' } 
      ]
    };
  
    dataFromService:any="";
    activityForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      start_time: [
        '',
        [
          Validators.required,
          Validators.pattern('^((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))$')
        ]
      ],
      end_time: [
        '',
        [
          Validators.required,
          Validators.pattern('^((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))$')
        ]
      ],
      intensity: [
        '',
        [
          Validators.required,
          Validators.pattern('^[1-5]$')
        ]
      ],
      calories_b: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{1,4}$')
        ]
      ]
    });
   
    constructor(private healthKit: HealthKit, private plt: Platform, public userService:UserService, private formBuilder: FormBuilder, private navCtrl : NavController) {
      if (this.healthKit.available()) { console.log("HI"); } 
    }

    ngOnInit() {
      console.log("HI");
    }
  
    dismissRegistration() {
      this.navCtrl.navigateBack('/tabs/tab2');
    }
    
    public submit() {
      console.log(this.activityForm.value);
    }
    
    SaveActivity()
    {
      let name = this.activityForm.get("name").value;
      let start_time = this.activityForm.get("start_time").value;
      let end_time = this.activityForm.get("end_time").value;
      let intensity = this.activityForm.get("intensity").value;
      let calories_b = this.activityForm.get("calories_b").value;
      var dataToSend = {
        activity_name: name, 
        start_time: start_time, 
        end_time: end_time, 
        intensity: intensity,
        calories_b: calories_b};
      this.userService.Saveactivity(dataToSend).subscribe(
        (dataReturnFromService)=>{
          this.dataFromService = JSON.stringify(dataReturnFromService);
        })
  
      this.navCtrl.navigateForward('/tabs/tab2');
    }
  
  }
