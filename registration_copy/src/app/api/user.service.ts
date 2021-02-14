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
    headers.append('Access-Control-Allow-Origin', 'http://localhost:3000/json-example');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT');
    headers.append('Access-Control-Allow-Credentials', 'true');
    var url = "http://127.0.0.1:3000/json-example";

    return this.http.post(url, dataToSend, {headers: headers});
  }
}
