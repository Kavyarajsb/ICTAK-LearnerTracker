import { Component, ViewChild, OnInit } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {BreakpointObserver} from '@angular/cdk/layout';
import {MatMenuTrigger} from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  @ViewChild(MatMenuTrigger)
  trigger!: MatMenuTrigger;

  someMethod() {
    this.trigger.openMenu();
  }

  userrole = localStorage.getItem('userrole');
  username = localStorage.getItem('username');
  isAdmin:boolean = false;
  isTH:boolean = false;
  isPO:boolean = false;
  

  constructor(private observer: BreakpointObserver,
    private router : Router) { }

  ngOnInit(){
    if(this.userrole) {
      if(this.userrole === "Admin"){
        this.isAdmin = true;
      }
      else if(this.userrole === "Training Head"){
        this.isTH = true;
      }
      else if(this.userrole === "Placement Officer"){
        this.isPO = true;
      }      
    }
    else {
      this.router.navigate(['']);
    }    
  }

  ngAfterViewInit(){
    this.observer.observe(['(max-width: 800px)']).subscribe((res)=>{
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else{
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['']);  
  }

}
