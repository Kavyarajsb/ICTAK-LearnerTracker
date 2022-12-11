import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  userrole = localStorage.getItem('userrole');
  isAdmin:boolean = false;

  lcount:any;
  thcount:any;
  pocount:any;
  chart:any;
  piechart:any;

  fsdCount:any;
  dsaCount:any;
  ml_alCount:any;
  rpaCount:any;
  stCount:any;
  csaCount:any;

  placedcount:any;
  jobseekingcount:any;
  notinterestedcount:any;


  constructor(private api:ApiService) { }


  ngOnInit(): void {

    if(this.userrole) {
      if(this.userrole === "Admin"){
        this.isAdmin = true;
        //this.bgprofile='#fe667b';
      }}

    
    
    this.trainingHeadCount();
    this.placementOfficerCount();
    this.learnerCount();

    this.learnerCSA();
    this.learnerDSA();
     this.learnerFSD();
    this.learnerRPA();
    this.learnerMLAI();
    this.learnerST();
    this.createChart();

    this.pieChart();
    this.placedCount();
    this.jobseekingCount();
    this.notinterestedCount();

  }
  //function to count the number of Training Heads
trainingHeadCount(){

  this.api.getTHCount().subscribe((res)=>{
   
    this.thcount=res;
     
    console.log("thcount in frontend>>>",this.thcount)
  
  });}
  
    //function to count the number of Placement Officers
  
  placementOfficerCount(){
    
    this.api.getPOCount().subscribe((res)=>{
     
      this.pocount=res;
       
      console.log("po_count in frontend>>>",this.pocount)
    
    });
  }
  //function to count the number of Learners
  
  learnerCount(){
    
    this.api.getLearnerCount().subscribe((res)=>{
     
      this.lcount=res;
       
      console.log("learner_count in frontend>>>",this.lcount)
    
    });
  }

  //function to get number of learners doing course "FSD"
learnerFSD(){
  
  this.api.getLearnerFSD().subscribe((res:any)=>{
   
    this.fsdCount=res
       
    console.log("learner_FSDcount in frontend>>>",this.fsdCount)
  
  });
}

//function to get number of learners doing course "DSA"

learnerDSA(){
  
  this.api.getLearnerDSA().subscribe((res)=>{
   
    this.dsaCount=res;
     
    console.log("learner_DSAcount in frontend>>>",this.dsaCount)
  
  });
}

//function to get number of learners doing course "RSA"

  learnerRPA(){
  
    this.api.getLearnerRPA().subscribe((res)=>{
     
      this.rpaCount=res;
       
      console.log("learner_RPAcount in frontend>>>",this.rpaCount)
    
    });
  }

  //function to get number of learners doing course "ST"

  learnerST(){
  
    this.api.getLearnerST().subscribe((res)=>{
     
      this.stCount=res;
       
      console.log("learner_STcount in frontend>>>",this.stCount)
    
    });
  }

  //function to get number of learners doing course "ML-AI"

  learnerMLAI(){
  
    this.api.getLearnerMLAI().subscribe((res)=>{
     
      this.ml_alCount=res;
       
      console.log("learner_ML-AI count in frontend>>>",this.ml_alCount)
    
    });
  }

  //function to get number of learners doing course "CSA"

  learnerCSA(){
  
    this.api.getLearnerCSA().subscribe((res)=>{
     
      this.csaCount=res;
       
      console.log("learner_CSAcount in frontend>>>",this.csaCount)
    
    });
  }

  delay() {
    // `delay` returns a promise
    return new Promise(function(resolve, reject) {
      // Only `delay` is able to resolve or reject the promise
      setTimeout(function() {
        resolve(42); // After 1 seconds, resolve the promise with value 42
      }, 1000);
    });
  }


  // creating Bar chart that shows number of learners in each course
  async createChart(){

    await this.learnerCSA();
      await this.learnerDSA();
      await this.learnerFSD();
      await  this.learnerRPA();
      await  this.learnerMLAI();
      await this.learnerST();
      await this.delay();

    
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      

      data: {// values on X-Axis
        labels: ['FSD', 'DSA', 'ML-AI','RPA',
                 'ST', 'CSA', , ], 
         datasets: [
          {
            
           
            label: "Learner Count",
            data: [this.fsdCount,this.dsaCount,this.ml_alCount,this.rpaCount,this.stCount,this.csaCount],
            backgroundColor: 'rgb(59, 138, 152)'
          }
        
        ]
      },
      options: {
        aspectRatio:2.3
      }
      
    });
  }

  
  //function to count the number of placed learners

  placedCount(){
    
    this.api.getPlacedCount().subscribe((res)=>{
     
      this.placedcount=res;
       
      console.log("placed_count in frontend>>>",this.placedcount)
    
    });
  }

   //function to count the number of Job seeking learners

  jobseekingCount(){
    
    this.api.getJobseekingCount().subscribe((res)=>{
     
      this.jobseekingcount=res;
       
      console.log("jobseeking_count in frontend>>>",this.jobseekingcount)
    
    });
  }

   //function to count the number of Not interested learners

  notinterestedCount(){
    
    this.api.getNotinterestedCount().subscribe((res)=>{
     
      this.notinterestedcount=res;
       
      console.log("notintereted_count in frontend>>>",this.notinterestedcount)
    
    });
  }


  async pieChart(){

    await this.placedCount();
    await this.jobseekingCount();
    await this.notinterestedCount();
    await this.delay();

    this.piechart = new Chart("PieChart", {
      type: 'pie', //this denotes tha type of chart

    

      data: {

        labels:['Placed','Job Seeking','NOT interested'],
    
         datasets: [
          {
            data: [this.placedcount,this.jobseekingcount,this.notinterestedcount]
          }
        ],
       
      },
      options: {
        aspectRatio:2.3
      }
      
    });
  }



 }
