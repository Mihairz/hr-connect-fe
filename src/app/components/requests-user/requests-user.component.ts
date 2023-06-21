import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-requests-user',
  templateUrl: './requests-user.component.html',
  styleUrls: ['./requests-user.component.css']
})
export class RequestsUserComponent {

  reqTypes: string[] = ['Adeverinta angajat', 'Cerere modificare date personale', 'Custom request'];
  selectedReqType: string = '';
  errorMessage: string = '';
  errorSource: string = '';

  

  userReqForm = new FormGroup({

    reqType: new FormControl('', [
      Validators.required,
    ]),

  })

  // Urmareste valoarea campului request type(care este un dropdown cu mai multe optiuni)
  onReqTypeChange() {
    this.selectedReqType = this.userReqForm.value.reqType || "";
    console.log('Selected req type:', this.selectedReqType);
  }


  submitRequest(){}
}
