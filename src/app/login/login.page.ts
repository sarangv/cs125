import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
//import { RegisterPage } from '../register/register.page';
//import { TabsPage } from '../tabs/tabs.page';
import { NgForm } from '@angular/forms';
import {UserService} from '../api/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  dataFromService:any="";
  constructor( private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    public userService:UserService
    ) { }

  ngOnInit() {
    console.log("HI");
  }

  login(form: NgForm) {
    console.log(form.value.email, form.value.password)
    var dataToSend = {
      username: form.value.email, 
      password: form.value.password};
      console.log("Hello");
    this.userService.Savelogin(dataToSend).subscribe(
      (dataReturnFromService)=>{
        this.dataFromService = JSON.stringify(dataReturnFromService);
      })
    this.navCtrl.navigateForward('/tabs');
    /*this.authService.login(form.value.email, form.value.password).subscribe(
      data => {
        this.navCtrl.navigateRoot('/tabs');
        //this.alertService.presentToast("Logged In");
      },
      error => {
        console.log(error);
      }
    );*/
  }

  register() {
    this.navCtrl.navigateForward('/registration');
  }

}
