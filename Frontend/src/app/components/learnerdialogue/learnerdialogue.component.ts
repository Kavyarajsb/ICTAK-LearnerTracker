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
      // add form - enable controls for Training head
      if(this.userrole === "Training Head"){
        this.isTH = true; 
        this.learnerForm.get('learnerid')?.enable(); 
        this.learnerForm.get('name')?.enable(); 
        this.learnerForm.get('course')?.enable(); 
        this.learnerForm.get('project')?.enable();  
        this.learnerForm.get('batch')?.enable();  
        this.learnerForm.get('coursestatus')?.enable();          
      }
      else if(this.userrole === "Placement Officer"){ // disable controls for Placement Officer
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
    // get the learner details for edit 
    if(this.id){
      console.log(this.id);
      this.api.getLearnerDetails(this.id).subscribe(res => {
        this.learnerForm.patchValue(res); 
        this.learnerForm.get('learnerid')?.disable();     
      })
    }
  }
  
  // logout
  logout(){
    localStorage.clear();
    this.router.navigate([''])
    .then(() => {
      window.location.reload();
    });
  }

  // pass the dialogue form values to parent where this popup is called
  save() {
    this.dialogRef.close(this.learnerForm.value);
  }

  //close dialogue form
  close() {
    this.dialogRef.close();    
  }
}
