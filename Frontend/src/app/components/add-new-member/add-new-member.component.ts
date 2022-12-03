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


  newMemberForm = new FormGroup({
    'name': new FormControl('', [Validators.required]),
    'email' : new FormControl('',[Validators.required]),
    'password': new FormControl('',[Validators.required]),
    'role': new FormControl('',[Validators.required]),
    '_id': new FormControl('')
  });

  titlemode:String ="";
  id:String="";

  constructor(private formBuilder:FormBuilder,private api:ApiService,private router:Router,
    private dialogRef : MatDialogRef<AddNewMemberComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {
      this.titlemode = data.titlemode;
      this.id = data.id;
    }

  ngOnInit(): void {


    if(this.id != ""){
      this.api.getMemberDetails(this.id).subscribe(res => {
        this.newMemberForm.patchValue(res);      
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




 





