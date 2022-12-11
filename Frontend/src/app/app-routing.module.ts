import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewMemberComponent } from './components/add-new-member/add-new-member.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LearnerComponent } from './components/learner/learner.component';
import { LoginComponent } from './components/login/login.component';
import { MemberComponent } from './components/member/member.component';
import {AuthGuard} from './auth.guard'

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',canActivate:[AuthGuard], component: HomeComponent,
  children:[
    {path:'dashboard', canActivate:[AuthGuard], component: DashboardComponent},
    {path:'member', canActivate:[AuthGuard], component: MemberComponent},
    {path:'learner',canActivate:[AuthGuard], component:LearnerComponent}
  ]},
  {path:'addnewmember',canActivate:[AuthGuard], component:AddNewMemberComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
