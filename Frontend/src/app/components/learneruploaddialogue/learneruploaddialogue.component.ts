import { Component, OnInit } from '@angular/core';
import { MatDialogRef} from "@angular/material/dialog";
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learneruploaddialogue',
  templateUrl: './learneruploaddialogue.component.html',
  styleUrls: ['./learneruploaddialogue.component.css']
})
export class LearneruploaddialogueComponent implements OnInit {

  userrole = localStorage.getItem('userrole');  
  isTH:boolean = false;
  selectedFile!: File;
  isDisabled:boolean = true;

  constructor(private router : Router,
    private dialogRef : MatDialogRef<LearneruploaddialogueComponent>) { }

  ngOnInit(): void {
    if(this.userrole === "Training Head"){
      this.isTH = true;
    }
    else {
      alert('Unauthorized access');
      this.logout();
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

  // getting selected file and check whether csv or not
  onSelectedFile(event: any){
     this.selectedFile = <File>event.target.files[0];
     if(this.selectedFile.name.endsWith(".csv")){
       this.isDisabled = false;
     }else{
       this.isDisabled = true;
     }     
  }

  // upload csv
  uploadCSV(){
    const formData = new FormData();
    formData.append('csv', this.selectedFile, this.selectedFile.name);
    this.dialogRef.close(formData);    
  }

  //close dialogue form
  close() {
    this.dialogRef.close();    
  }

}
