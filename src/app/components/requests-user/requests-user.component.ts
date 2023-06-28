import { Component, EventEmitter, OnInit, Output, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, map } from 'rxjs';
import { User } from 'src/app/models/user';

import { UserService } from 'src/app/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { RequestHrService } from 'src/app/services/request-hr.service';

@Component({
  selector: 'app-requests-user',
  templateUrl: './requests-user.component.html',
  styleUrls: ['./requests-user.component.css']
})
export class RequestsUserComponent implements OnInit {

  constructor(private userService: UserService, private sanitizer: DomSanitizer, private requestHrService: RequestHrService) { }

  @Output() getRequestsEvent = new EventEmitter<string>();

  userProfile: User = new User();

  reqTypes: string[] = ['Medical_leave', 'Paid_leave', 'Employed_status', 'Change_personal_data', 'Custom_request', 'Equipment_request', 'Resignation'];
  selectedReqType: string = '';
  // Urmareste valoarea campului request type(care este un dropdown cu mai multe optiuni)
  onReqTypeChange() {
    this.selectedReqType = (<HTMLSelectElement>document.getElementById('reqType')).value;
    console.log('Selected req type:', this.selectedReqType);
  }



  errorMessage: string = '';
  errorSource: string = '';

  submitRequestSubscription: Subscription = new Subscription();

  ngOnInit() {
    this.getUser(); // obtinem datele utilizatorului logat
  }

  // response is the data that we require 
  getUser() {
    this.userService.getUserSelf().subscribe((responseUserProfile) => {
      this.userProfile = responseUserProfile;
      console.log('NAME:' + responseUserProfile.lastName);
    });
  }



  requestForm = new FormGroup({
    details: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(250),
    ])
  })




  sanitizeInput(input?: string) {
    if (input == null) {
      return '';
    }
    // Sanitize the input to prevent XSS
    const sanitizedInput = this.sanitizer.sanitize(SecurityContext.HTML, input!);
    // Return the sanitized input
    return sanitizedInput || '';
  }


  submitRequest() {

    if (this.selectedReqType !== 'Resignation') {
      // Verificam formularul
      if (this.requestForm.invalid) {
        this.errorMessage = 'Something went wrong.' // to customize
        return;
      }
    }


    const sanitiziedDetails = this.requestForm.value.details
      ? this.sanitizer.sanitize(SecurityContext.HTML, this.requestForm.value.details) || ''
      : ''
      ;

    this.submitRequestSubscription = this.requestHrService.addRequest(this.selectedReqType, sanitiziedDetails).subscribe(() => {
      console.log('REQUEST SUBMITTED');
      this.getRequestsEvent.emit();

    })

  }



  // DE STABILIT CU BE SUB CE FORMA TREBUIE TRIMISE
  // DUPA ASTA O SA MA GANDESC SI CE SE INTAMPLA DUPA CE SA DE SUBMIT (ex refresh pagina de request/ mesaj de confirmare/etc)

  //Apelam functia de submitRequest si ii pasam ca parametru obiectul de tip request creat anterior
  // this.submitRequestSubscription = this.requestHrService.addRequest(this.selectedReqType,(this.requestForm.value.details ? this.sanitizer.sanitize(SecurityContext.HTML, this.requestForm.value.details) || '' : '')).subscribe(() => {
  // // this.newGetRequestsEvent.emit();
  // })

  // Dupa ce utilizatorul este adaugat,add-user-modal va emite un eveniment pe nume newGetUsersEvent ce va fi receptionat de catre componenta parinte (admin-home-page), iar lista de utilizatori de pe ecran isi va da refresh, astfel afisand inclusiv ultimul utilizator adaugat.
  // De asemenea functia closeModal() va emite un eveniment pe nume newCloseModalEvent ce va fi receptionat de catre componenta parinte (admin-home-page) si va inchide modala
  // })

}





