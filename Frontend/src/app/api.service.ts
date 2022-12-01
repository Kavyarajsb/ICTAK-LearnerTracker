import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  apiUrl: String = "http://localhost:3000";

  getMemberList(){   
    return this.http.get(`${this.apiUrl}/api/stafflist`);  
  }

  addNewMember(data:any){
    return this.http.post(`${this.apiUrl}/api/staff`, data);  
  }

  getLearnersList(){
    return this.http.get(`${this.apiUrl}/api/learnerlist`);
  }

  addNewLearner(data:any){
    return this.http.post(`${this.apiUrl}/api/learner`,data);
  }

  getLearnerDetails(id:any){
    return this.http.get(`${this.apiUrl}/api/learner/${id}`);
  }

  deleteLearnerDetails(id:any){
    return this.http.delete(`${this.apiUrl}/api/learner/${id}`)
  }

  updateLearnerDetails(data:any){
    return this.http.put(`${this.apiUrl}/api/learner`,data);
  }

}
