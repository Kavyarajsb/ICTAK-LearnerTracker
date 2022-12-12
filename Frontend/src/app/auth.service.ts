import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  apiUrl :String = 'http://localhost:3000/api';

  loginToBackend(data:any){

    return this.http.post<any>(`${this.apiUrl}/login`,data);
  }
  loggedIn(){
    return !! localStorage.getItem('token')
  }
  getToken(){
    return localStorage.getItem('token');
  }
}
