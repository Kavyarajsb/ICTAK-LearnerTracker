import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user={email:'',password:''};
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  login(form: any){

    console.log('........',this.user);
   
  
    this.auth.loginToBackend(this.user).subscribe(res=>{
   
      console.log('data from backend',res);
  
      localStorage.setItem('token',res.token)
    this.router.navigateByUrl('home');
  })
    }
}