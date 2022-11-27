import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  constructor(private router:Router,private api:ApiService) { }
  members:any=[]
  ngOnInit(): void {
   this.getData();
    

      }

  
      getData(){
        this.api.getMemberList().subscribe(res=>{
          this.members=res;
          console.log(res);
        })  
      }
  

  addnew(){
    console.log("addnewmember")
  this.router.navigate(["/addnewmember"])
  }


}
