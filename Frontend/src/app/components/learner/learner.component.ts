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

  id: any;  
  displayedColumns: string[] = ['no','learnerid', 'name', 'course', 'project', 'batch', 'update', 'delete'];
  
  ngOnInit(): void {
    this.getData();
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
          this.api.updateLearnerDetails(data).subscribe(res =>{
            console.log('Learner updated successfully');
            this.getData();
          })
        }
      );    
  }

  // delete learner
  deleteData(id:any){
    this.api.deleteLearnerDetails(id).subscribe(res =>{
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
    
    dialogRef.afterClosed().subscribe(
      data => {
        this.api.addNewLearner(data).subscribe(res =>{
          console.log('Learner added successfully');
          this.getData();
        })
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
