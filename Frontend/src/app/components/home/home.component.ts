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
  bgimg:string = "url('../../../assets/bluebg.jpg')";
  bgcolor:string = '#012f63';
  shdwcolor:string = 'rgba(3, 118, 248, 1)';
  bgprofile:string='';
  styleex=""
  stylebg=""

  constructor(private observer: BreakpointObserver,
    private router : Router) { }

  ngOnInit(){

    if(this.userrole) {
      if(this.userrole === "Admin"){
        this.isAdmin = true;
        //this.bgprofile='#fe667b';
      }
      else if(this.userrole === "Training Head"){
        this.isTH = true;
         this.bgcolor ='#21b899';
         this.bgimg= "url('../../../assets/greenbg.jpg')";
         this.shdwcolor = 'rgba(46, 242, 202, 1)';
         // this.bgprofile='#d2cede';
      }
      else if(this.userrole === "Placement Officer"){
        this.isPO = true;
         this.bgcolor='#4b1782';
         this.bgimg= "url('../../../assets/purplebg.jpg')";
         this.shdwcolor = 'rgba(171, 109, 237, 1)';
         // this.bgprofile='#45ada8';
      }      
    }
    else {
      this.logout();
    }
    this.styleex = `color:${this.bgcolor};  text-shadow: -1px 3px 6px ${this.shdwcolor};`
    this.stylebg = `background-image: ${this.bgimg};`

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
    this.router.navigate([''])
    .then(() => {
      window.location.reload();
    });
  }

}
