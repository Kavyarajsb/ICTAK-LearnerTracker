import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit,AfterViewInit {

  @ViewChild(MatSort) sort:any = MatSort;
  @ViewChild(MatPaginator) paginator:any = MatPaginator;
  public members = new MatTableDataSource<MemberData>();
  
  
  constructor(private router:Router,private api:ApiService,private dialog:MatDialog) { }
  //members:any=[]
  id: any;  
  displayedColumns: string[] = ['name','email', 'role','update', 'delete'];
  


  ngOnInit(): void {
   this.getData();
    

      }
       // for filtering the list based on entered value from keyup
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.members.filter = filterValue;
  }
//used for sort
ngAfterViewInit(): void {
  this.members.sort = this.sort;
  this.members.paginator = this.paginator;
}

  
      getData(){
        this.api.getMemberList().subscribe(res=>{
          this.members.data=res as MemberData[];
          console.log(res);
        })  ;
      }
  

  addnew(){
    console.log("addnewmember")
  this.router.navigate(["/addnewmember"])
  }
  // delete member
  deleteData(id:any){
    this.api.deleteMemberDetails(id).subscribe(res =>{
      this.getData();
    });
  }

}
// This is used for filter and sort 
export interface MemberData {
  _id: any;
  name: String;
  email: String;
  role: String;  
}