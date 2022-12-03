import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-learnerdialogue',
  templateUrl: './learnerdialogue.component.html',
  styleUrls: ['./learnerdialogue.component.css']
})
export class LearnerdialogueComponent implements OnInit {

  userrole = localStorage.getItem('userrole');  
  isTH:boolean = false;
  isPO:boolean = false;

  learnerForm = new FormGroup({
    'learnerid': new FormControl('', [Validators.required]),
    'name' : new FormControl('',[Validators.required]),
    'course': new FormControl('',[Validators.required]),
    'project': new FormControl('',[Validators.required]),
    'batch': new FormControl('',[Validators.required]),
    'coursestatus': new FormControl(''),
    'placementstatus': new FormControl(''),
    '_id': new FormControl('')
  });

  titlemode:String ="";
  id:any;

  constructor(private api:ApiService, private router : Router,
    private dialogRef : MatDialogRef<LearnerdialogueComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {
      this.titlemode = data.titlemode;
      this.id = data.id ;      
    }

  ngOnInit(): void {
    if(this.userrole) {
      if(this.userrole === "Training Head"){
        this.isTH = true; 
        this.learnerForm.get('learnerid')?.enable(); 
        this.learnerForm.get('name')?.enable(); 
        this.learnerForm.get('course')?.enable(); 
        this.learnerForm.get('project')?.enable();  
        this.learnerForm.get('batch')?.enable();  
        this.learnerForm.get('coursestatus')?.enable();          
      }
      else if(this.userrole === "Placement Officer"){
        this.isPO = true;
        this.learnerForm.get('learnerid')?.disable(); 
        this.learnerForm.get('name')?.disable(); 
        this.learnerForm.get('course')?.disable(); 
        this.learnerForm.get('project')?.disable();  
        this.learnerForm.get('batch')?.disable();  
        this.learnerForm.get('coursestatus')?.disable(); 
      }          
    }   
    else{
      this.logout();
    }    
  
    if(this.id){
      console.log(this.id);
      this.api.getLearnerDetails(this.id).subscribe(res => {
        this.learnerForm.patchValue(res);      
      })
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate([''])
    .then(() => {
      window.location.reload();
    });
  }

  save() {
    this.dialogRef.close(this.learnerForm.value);
  }

  close() {
    this.dialogRef.close();
    // if (!this.learnerForm.touched && !this.learnerForm.dirty) {
    //   console.log("hi, inside close");
    //   this.learnerForm.controls["learnerid"].setErrors(null);
    //   this.learnerForm.controls["learnerid"].clearValidators();
    //   this.learnerForm.controls["learnerid"].updateValueAndValidity({onlySelf : true});
    //   this.learnerForm.controls["name"].setErrors(null);
    //   this.learnerForm.controls["name"].clearValidators();
    //   this.learnerForm.controls["name"].updateValueAndValidity({onlySelf : true});
    //   this.learnerForm.controls["course"].setErrors(null);
    //   this.learnerForm.controls["course"].clearValidators();
    //   this.learnerForm.controls["course"].updateValueAndValidity({onlySelf : true});
    //   this.learnerForm.controls["project"].setErrors(null);
    //   this.learnerForm.controls["project"].clearValidators();
    //   this.learnerForm.controls["project"].updateValueAndValidity({onlySelf : true});
    //   this.learnerForm.controls["batch"].setErrors(null);
    //   this.learnerForm.controls["batch"].clearValidators();
    //   this.learnerForm.controls["batch"].updateValueAndValidity({onlySelf : true});
    //   this.dialogRef.close();
    // }    
  }
}
