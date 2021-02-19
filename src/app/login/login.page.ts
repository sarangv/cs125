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
  constructor( private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService,
    public userService:UserService
    ) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    console.log("Email:" + form.value.email)
    var dataToSend = {
      username: form.value.email, 
      password: form.value.password};
    this.userService.Savelogin(dataToSend).subscribe((response) => {
      console.log(response);
      this.navCtrl.navigateForward('/tabs');
    }
      
      );
    
  }

  register() {
    this.navCtrl.navigateForward('/registration');
  }

}
