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

  getMemberDetails(id:any){
    return this.http.get(`${this.apiUrl}/api/staff/${id}`);
  }

  updateMemberDetails(data:any){
    return this.http.put(`${this.apiUrl}/api/staff`,data);
  }

  deleteMemberDetails(id:any){
    return this.http.delete(`${this.apiUrl}/api/staff/${id}`)
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

  getTHCount(){
    return this.http.get(`${this.apiUrl}/api/staffthcount`);
  }
  
  getPOCount(){
    return this.http.get(`${this.apiUrl}/api/staffpocount`);
  }
  
  
  getLearnerCount(){
     return this.http.get(`${this.apiUrl}/api/learnercount`);
  }

  getLearnerFSD(){
    return this.http.get(`${this.apiUrl}/api/learnerFSD`);
  }

  getLearnerDSA(){
    return this.http.get(`${this.apiUrl}/api/learnerDSA`);
  }

  getLearnerMLAI(){
    return this.http.get(`${this.apiUrl}/api/learnerMLAI`);
  }

  getLearnerRPA(){
    return this.http.get(`${this.apiUrl}/api/learnerRPA`);
  }

  getLearnerCSA(){
    return this.http.get(`${this.apiUrl}/api/learnerCSA`);
  }

  getLearnerST(){
    return this.http.get(`${this.apiUrl}/api/learnerST`);
  }
  
  getPlacedCount(){
     return this.http.get(`${this.apiUrl}/api/placedcount`);
  }
  getJobseekingCount(){
     return this.http.get(`${this.apiUrl}/api/jobseekingcount`);
  }
  getNotinterestedCount(){
     return this.http.get(`${this.apiUrl}/api/notinterestedcount`);
  }

}
