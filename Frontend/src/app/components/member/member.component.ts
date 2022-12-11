import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddNewMemberComponent } from '../add-new-member/add-new-member.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  public members = new MatTableDataSource<MemberData>();

  constructor(private router: Router, private api: ApiService, private dialog: MatDialog, private toastr : ToastrService) { }

  userrole = localStorage.getItem('userrole');  
  isAdmin:boolean = false;
  isTH:boolean = false;
  isPO:boolean = false;

  id: any;
  displayedColumns: string[] = ['no', 'name', 'email', 'role', 'update', 'delete'];

  ngOnInit(): void {
    if(this.userrole) {
      if(this.userrole === "Admin"){
        this.isAdmin = true;
        this.getData();
      }
      else {
        this.logout();
      }          
    }
    else {
      this.logout();
    }   
  }

  logout(){
    localStorage.clear();
    this.router.navigate([''])
    .then(() => {
      window.location.reload();
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.members.filter = filterValue;
  }

  ngAfterViewInit(): void {
    this.members.sort = this.sort;
    this.members.paginator = this.paginator;
  }

  getData() {
    this.api.getMemberList().subscribe(res => {
      this.members.data = res as MemberData[];
    })
  }

  updateData(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";

    dialogConfig.data = {
      titlemode: 'Edit Staff Details',
      id: id
    };

    const dialogRef = this.dialog.open(AddNewMemberComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.api.updateMemberDetails(data).subscribe(res => {
            this.toastr.success('Staff updated successfully','',{timeOut:2000});
            this.getData();
          })
        }        
        else {
          console.log("close without validation on edit member");
        } 
      }
    )
  }

  addnew() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "500px";

    dialogConfig.data = {
      titlemode: 'Add Staff Details',
      id: ''
    };

    const dialogRef = this.dialog.open(AddNewMemberComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if(data){
          this.api.addNewMember(data).subscribe(res => {
            this.toastr.success('Staff added successfully','',{timeOut:2000});
            //this.getData();
            location.reload();  
          })
        }
        else {
          console.log("close without validation on add member");
        }        
      });
  }

  deleteData(id: any) {
    this.api.deleteMemberDetails(id).subscribe(res => {
      this.toastr.success('Staff deleted successfully','',{timeOut:2000});
      this.getData();
    });
  }

}

export interface MemberData {
  _id: any;
  name: String;
  email: String;
  password: String;
  role: String;
}



