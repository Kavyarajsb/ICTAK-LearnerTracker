import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-new-member',
  templateUrl: './add-new-member.component.html',
  styleUrls: ['./add-new-member.component.css']
})
export class AddNewMemberComponent implements OnInit {

  newMemberForm:any;
  titlemode:String ="";
  id:String="";
  

  constructor(private formBuilder:FormBuilder,private api:ApiService,private router:Router,
    private dialogRef : MatDialogRef<AddNewMemberComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {
      this.titlemode = data.titlemode;
      this.id = data.id;
    }


  ngOnInit(): void {
    const passwordValidators = [Validators.minLength(6)];
    if (this.id == "") {
        passwordValidators.push(Validators.required);
    }
    this.newMemberForm = new FormGroup({
      'name': new FormControl('', [Validators.required]),
      'email' : new FormControl('',[Validators.required]),
      'password': new FormControl('',passwordValidators),
      'role': new FormControl('',[Validators.required]),
      '_id': new FormControl('')
    });
  

    if(this.id != ""){
      this.api.getMemberDetails(this.id).subscribe(res => {
        this.newMemberForm.patchValue(res); 
        this.newMemberForm.controls.password.setValue(''); 
        this.newMemberForm.get('email')?.disable();    
      })
    }
    }
    
    saveForm() {
    this.dialogRef.close(this.newMemberForm.value);
    }
    
    close() {
      this.dialogRef.close();
    }
  }




 





