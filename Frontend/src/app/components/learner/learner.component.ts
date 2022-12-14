import { Component, OnInit, ViewChild, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LearnerdialogueComponent } from '../learnerdialogue/learnerdialogue.component';
import { LearneruploaddialogueComponent } from '../learneruploaddialogue/learneruploaddialogue.component';
import { ToastrService } from 'ngx-toastr';

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
    private dialog: MatDialog,
    private toastr : ToastrService) { }

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
      dialogRef.afterClosed().subscribe({
        next:(data) => {
          if(data){ // if save button clicked
            this.api.updateLearnerDetails(data).subscribe(
              res =>{
              this.toastr.success('Learner updated successfully','',{timeOut:2000});
              this.getData();
            })
          }
          else {  // if close button clicked
            console.log("close without validation on edit learner");
          }          
        },
        error: (e) => {
          this.toastr.error("Error updating learner. Please try again","",{timeOut: 2000});
        }
      });    
  }

  // delete learner
  deleteData(id:any){
    this.api.deleteLearnerDetails(id).subscribe(res =>{
      this.toastr.success('Learner deleted successfully','',{timeOut:2000});
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
    dialogRef.afterClosed().subscribe({
      next: (data) => {
        // if save clicked
        if(data){
          this.api.addNewLearner(data).subscribe(res =>{
            this.toastr.success('Learner added successfully','',{timeOut:2000});
            this.getData();
          })
        }
        else { // if close button clicked
          console.log("close without validation on add learner");
        }
      },
      error:(e) => {
        this.toastr.error("Error adding learner. Please try again.","",{timeOut: 2000});
      }   
    }   
    ); 
  }

  showUploadCSV() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";

    const dialogRef = this.dialog.open(LearneruploaddialogueComponent, dialogConfig);
  
    // call below event once the dialog popup closed
    dialogRef.afterClosed().subscribe({
      next:(data) => {
          // if save clicked
          if(data){
            //this.api.uploadCSV(data).subscribe({
            this.api.upload(data).subscribe({
              next:(res)=>{
                this.toastr.success('Learner updated successfully','',{timeOut:2000});
                this.getData();
              },
              error:(e)=>{
                this.toastr.error(e.error,"",{timeOut: 2000});
              }
            }            
            );          
          }
          else { // if close button clicked
            console.log("close without validation on add learner");
           // this.toastr.error("Upload Error. Please check mandatory fields and duplicates","",{timeOut: 2000});
          }        
      },
      error:(e)=>{
        console.log(e);
        //this.toastr.error("Upload Error. Please check mandatory fields and duplicates","",{timeOut: 2000});
      },
      complete:() => console.log("Upload popup closed")
    }); 

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
