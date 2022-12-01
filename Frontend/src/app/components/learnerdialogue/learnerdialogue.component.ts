import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { ApiService } from 'src/app/api.service';


@Component({
  selector: 'app-learnerdialogue',
  templateUrl: './learnerdialogue.component.html',
  styleUrls: ['./learnerdialogue.component.css']
})
export class LearnerdialogueComponent implements OnInit {

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
  id:String="";

  constructor(private api:ApiService, 
    private dialogRef : MatDialogRef<LearnerdialogueComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) {
      this.titlemode = data.titlemode;
      this.id = data.id ;      
    }

  ngOnInit(): void {
    if(this.id != ""){
      this.api.getLearnerDetails(this.id).subscribe(res => {
        this.learnerForm.patchValue(res);      
      })
    }
  }

  save() {
    this.dialogRef.close(this.learnerForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}
