import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewMemberComponent } from './components/add-new-member/add-new-member.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MemberComponent } from './components/member/member.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home', component: HomeComponent,
  children:[{path:'dashboard', component: DashboardComponent},
  {path:'member', component: MemberComponent}]},
  {path:'addnewmember',component:AddNewMemberComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
