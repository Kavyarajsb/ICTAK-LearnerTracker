import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddNewMemberComponent } from '../add-new-member/add-new-member.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: any = MatSort;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  public members = new MatTableDataSource<MemberData>();
  

  constructor(private router: Router, private api: ApiService, private dialog: MatDialog) { }

  id: any;
  displayedColumns: string[] = ['no', 'name', 'email', 'role', 'update', 'delete'];

  ngOnInit(): void {
    this.getData();
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
        this.api.updateMemberDetails(data).subscribe(res => {
          console.log('Member updated successfully');
          this.getData();
        })
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
        this.api.addNewMember(data).subscribe(res => {
          console.log('Member added successfully');
          this.getData();
        })
      }
    );
  }

  deleteData(id: any) {
    this.api.deleteMemberDetails(id).subscribe(res => {
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



