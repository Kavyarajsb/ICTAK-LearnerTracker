import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-add-new-member',
  templateUrl: './add-new-member.component.html',
  styleUrls: ['./add-new-member.component.css']
})
export class AddNewMemberComponent implements OnInit {

  constructor(private formBuilder:FormBuilder,private api:ApiService,private router:Router) { }

  ngOnInit(): void {
  }

newMemberForm=this.formBuilder.group({
  name:[''],
  email:[''],
  password:[''],
  role:['']
  
})
 
saveForm(){
  console.log('Form data is ', this.newMemberForm.value);
  this.api.addNewMember(this.newMemberForm.value).subscribe({
    complete:()=>{
  alert('New Member Added Successfully')
  this.router.navigate(["/member"]);
    }
  })

}

}
