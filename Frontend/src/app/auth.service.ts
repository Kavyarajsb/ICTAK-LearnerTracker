import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  loginToBackend(data:any){

    return this.http.post<any>('http://localhost:3000/staff/login',data);
  }
  loggedIn(){
    return !! localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token');
  }
}
