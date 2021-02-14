import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  token : any;

  constructor(private http: HttpClient, private storage: NativeStorage, private env: EnvService,) { }

  login(user : string, password : string) {
    //this.http.post()
    this.isLoggedIn = true;
  }

  logout () {
    this.isLoggedIn = false;
  }

  
}
