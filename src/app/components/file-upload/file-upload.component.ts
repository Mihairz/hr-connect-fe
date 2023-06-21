import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent  {
  constructor(
    private http:HttpClient
  ){}
 name: string ='';
 file: any;

 getFile(event:any){
  this.file =event.target.files[0];
  console.log('file',this.file);

 }
 submitData(){
  // create formData object
  let formData = new FormData();
  formData.set ("name", this.name)
  formData.set("file",this.file)
  //submit this data in API - this is just a placeholder
  this.http.post('http://localhost:3001/upload/uploadFiles',formData).subscribe(
    (response) => {});
  
 }
}
