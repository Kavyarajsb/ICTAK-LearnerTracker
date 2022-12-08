import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  apiUrl: String = "http://localhost:3000/api";

  getMemberList(){   
    return this.http.get(`${this.apiUrl}/stafflist`);  
  }

  addNewMember(data:any){
    return this.http.post(`${this.apiUrl}/staff`, data);  
  }

  getMemberDetails(id:any){
    return this.http.get(`${this.apiUrl}/staff/${id}`);
  }

  updateMemberDetails(data:any){
    return this.http.put(`${this.apiUrl}/staff`,data);
  }

  deleteMemberDetails(id:any){
    return this.http.delete(`${this.apiUrl}/staff/${id}`)
  }

  getLearnersList(){
    return this.http.get(`${this.apiUrl}/learnerlist`);
  }

  addNewLearner(data:any){
    return this.http.post(`${this.apiUrl}/learner`,data);
  }

  getLearnerDetails(id:any){
    return this.http.get(`${this.apiUrl}/learner/${id}`);
  }

  deleteLearnerDetails(id:any){
    return this.http.delete(`${this.apiUrl}/learner/${id}`)
  }

  updateLearnerDetails(data:any){
    return this.http.put(`${this.apiUrl}/learner`,data);
  }

  // upload csv 
  uploadCSV(file:any) {
    return this.http.post(`${this.apiUrl}/uploadlearners`, file)
  }

}
