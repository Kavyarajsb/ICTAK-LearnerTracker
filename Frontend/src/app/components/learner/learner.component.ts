import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LearnerdialogueComponent } from '../learnerdialogue/learnerdialogue.component';


@Component({
  selector: 'app-learner',
  templateUrl: './learner.component.html',
  styleUrls: ['./learner.component.css']
})
export class LearnerComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort:any = MatSort;
  @ViewChild(MatPaginator) paginator:any = MatPaginator;
  public learners = new MatTableDataSource<LearnerData>();

  constructor(private router: Router, 
    private api : ApiService, 
    private dialog: MatDialog) { }

  userrole = localStorage.getItem('userrole');  
  isAdmin:boolean = false;
  isTH:boolean = false;
  isPO:boolean = false;
  id: any;  
  displayedColumns: string[] = ['no','learnerid', 'name', 'course', 'project', 'batch','update', 'delete'];

  ngOnInit(): void {
    //user role checking
    if(this.userrole) {
      if(this.userrole === "Admin"){
        this.isAdmin = true;
        alert('Unauthorized access to learner');
        this.logout();
      }
      else if(this.userrole === "Training Head"){
        this.isTH = true;
        this.getData();         
      }
      else if(this.userrole === "Placement Officer"){
        this.isPO = true;
        this.displayedColumns = ['no','learnerid', 'name', 'course', 'project', 'placementstatus', 'update'];
        this.getData(); 
      }          
    }
    else {
      this.logout();
    }    
  }

  //logout
  logout(){
    localStorage.clear();
    alert('You have logged out successfully');
    this.router.navigate([''])
    .then(() => {      
      window.location.reload();
    });
  }

  // used for sort
  ngAfterViewInit(): void {
    this.learners.sort = this.sort;
    this.learners.paginator = this.paginator;
  }

  // get learners list 
  getData(){
    this.api.getLearnersList().subscribe(res =>{
      this.learners.data = res as LearnerData[];     
    });
  }

  // for filtering the list based on entered value from keyup
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.learners.filter = filterValue;
  }

  // configure dialog popup and show details of learner which is passed as data
  updateData(id:any){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "500px";

      dialogConfig.data = {
        titlemode: 'Edit Learner Details',
        id: id
      };

      const dialogRef = this.dialog.open(LearnerdialogueComponent, dialogConfig);
    
      // save data to db after clicking SAVE from dialog popup
      dialogRef.afterClosed().subscribe(
        data => {
          if(data){ // if save button clicked
            this.api.updateLearnerDetails(data).subscribe(res =>{
              alert('Learner updated successfully');
              this.getData();
            })
          }
          else {  // if close button clicked
            console.log("close without validation on edit learner");
          }          
        }
      );    
  }

  // delete learner
  deleteData(id:any){
    this.api.deleteLearnerDetails(id).subscribe(res =>{
      alert('Learner deleted successfully');
      this.getData();
    })
  }

  // show popup while clicking on Add learner
  showAddLearner(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";

    dialogConfig.data = {
      titlemode: 'Add Learner Details',
      id:''
    };
  
    const dialogRef = this.dialog.open(LearnerdialogueComponent, dialogConfig);
    
    // call below event once the dialog popup closed
    dialogRef.afterClosed().subscribe(
      data => {
        // if save clicked
        if(data){
          this.api.addNewLearner(data).subscribe(res =>{
            alert('Learner added successfully');
            this.getData();
          })
        }
        else { // if close button clicked
          console.log("close without validation on add learner");
        }        
      }
    ); 
  }

}

// This is used for filter and sort 
export interface LearnerData {
  _id: any;
  learnerid: String;
  name: String;
  course: String;
  project: String;
  batch: String;
}
