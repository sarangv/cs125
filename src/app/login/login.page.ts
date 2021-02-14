import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
//import { RegisterPage } from '../register/register.page';
//import { TabsPage } from '../tabs/tabs.page';
import { NgForm } from '@angular/forms';
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
    private alertService: AlertService) { }

  ngOnInit() {
    console.log("HI");
  }

  login(form: NgForm) {
    console.log(form.value.email, form.value.password)
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
