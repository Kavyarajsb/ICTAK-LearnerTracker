import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user={email:'',password:''};
  constructor(private auth:AuthService,private router:Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    let loginClick = document.querySelector('.loginClick')
    let desc = document.querySelector('.desc')
    let logoSpan = document.querySelectorAll('.logo')
    window.addEventListener('DOMContentLoaded',()=>{
      setTimeout(()=>{
        logoSpan.forEach((span,idx) => {
          setTimeout(()=>{
            span.classList.add('active')
        }, (idx+1)*400);
      })
      setTimeout(()=>{
        loginClick!.classList.add('active')
    },1500)
      setTimeout(()=>{
        desc!.classList.add('active')
    },1500)
      // setTimeout(()=>{
      //   logoSpan.forEach((span,idx)=>{
      //     setTimeout(()=>{
      //       span.classList.remove('active');
      //       span.classList.add('fade');
      //     }, (idx+1)*50)
      //   })
      // },4000)
      // setTimeout(() => {
      //   intro!.style.top= '-100vh'
      // },2300);
    })
  })
  }

  login(form: any){
    console.log('........',this.user);
    
    this.auth.loginToBackend(this.user).subscribe({
      next: (res)=>{console.log('data from backend',res);
          localStorage.setItem('token',res.token);
          localStorage.setItem('userrole',res.userrole);
          localStorage.setItem('username', res.username);},
      error: (e) =>this.toastr.error("Invalid username or password","Validation Error:",{timeOut: 2000}),
      complete: () => this.router.navigateByUrl('home/dashboard') 
  })
    }


    slideUp(){
      console.log('sliding up')
      let intro = document.querySelector<HTMLElement>('.intros')
      intro!.style.top= '-100vh'
    }
}