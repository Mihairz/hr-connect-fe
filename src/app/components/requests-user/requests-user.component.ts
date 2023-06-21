import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-requests-user',
  templateUrl: './requests-user.component.html',
  styleUrls: ['./requests-user.component.css']
})
export class RequestsUserComponent implements OnInit{

  constructor(private userService: UserService){}

  userProfile: User = new User(); 

  reqTypes: string[] = ['Employee certificate', 'Change personal data', 'Custom request'];
  selectedReqType: string = '';

  changableData = ['name','email'];
  selectedDataToChange = '';

  errorMessage: string = '';
  errorSource: string = '';

  ngOnInit() {
    const id = 2; // o sa luam id-ul sau e-mail-ul din token, dar momentan il hardcodam
    this.getUser(id); 
  }

  // response is the data that we require 
  getUser(id: number) {
    this.userService.getUserById(id).subscribe((responseUserProfile) => {
      this.userProfile = responseUserProfile;
      // console.log(responseUserProfile);
    }); 
  } 

  

  userReqForm = new FormGroup({

    reqType: new FormControl('', [
      Validators.required,
    ]),

    country: new FormControl('', [
      Validators.required,
    ]),

    county: new FormControl('', [
      Validators.required,
    ]),

    city: new FormControl('', [
      Validators.required,
    ]),

    addressLine: new FormControl('', [
      Validators.required,
    ]),

    CNP: new FormControl('', [
      Validators.required,
    ]),

    series: new FormControl('', [
      Validators.required,
    ]),

    idNumber: new FormControl('', [
      Validators.required,
    ]),

    issuingAuthority: new FormControl('', [
      Validators.required,
    ]),

    idReleaseDate: new FormControl('', [
      Validators.required,
    ]),

    jobTitle: new FormControl('', [
      Validators.required,
    ]),

    reason: new FormControl('', [
      Validators.required,
    ]),

    dataToChange: new FormControl('', [
      Validators.required,
    ]),

    newName: new FormControl('', [
      Validators.required,
    ]),

    newEmail: new FormControl('', [
      Validators.required,
    ]),

  })

  // Urmareste valoarea campului request type(care este un dropdown cu mai multe optiuni)
  onReqTypeChange() {
    this.selectedReqType = this.userReqForm.value.reqType || "";
    console.log('Selected req type:', this.selectedReqType);
  }

  // Urmareste valoarea campului data to change(care este un dropdown cu mai multe optiuni)
  onDataToChangeChange() {
    this.selectedDataToChange = this.userReqForm.value.dataToChange || "";
    console.log('Selected req type:', this.selectedDataToChange);
  }

 
  

  submitRequest(){}
}
