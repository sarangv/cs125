import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http:HttpClient) { }

  Savedata(dataToSend)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000/registration');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.append('Access-Control-Allow-Credentials', 'true');
    var url = "http://127.0.0.1:3000/registration";

    return this.http.post(url, dataToSend, {headers: headers});
  }

  Savelogin(dataToSend)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000/login');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.append('Access-Control-Allow-Credentials', 'true');
    var url = "http://127.0.0.1:3000/login";

    return this.http.post(url, dataToSend, {headers: headers});
  }

  LoadPage(dataToSend)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000/loadprofile');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.append('Access-Control-Allow-Credentials', 'true');
    var url = "http://127.0.0.1:3000/loadprofile";

    return this.http.post(url, dataToSend, {headers: headers});
  }

  Saveactivity(dataToSend)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000/activity');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.append('Access-Control-Allow-Credentials', 'true');
    var url = "http://127.0.0.1:3000/activity";

    return this.http.post(url, dataToSend, {headers: headers});
  }

  Savefood(dataToSend)
  {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000/food');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.append('Access-Control-Allow-Credentials', 'true');
    var url = "http://127.0.0.1:3000/food";

    return this.http.post(url, dataToSend, {headers: headers});
  }
}
