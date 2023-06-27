import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';

import { UserService } from 'src/app/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-requests-user',
  templateUrl: './requests-user.component.html',
  styleUrls: ['./requests-user.component.css']
}) 
export class RequestsUserComponent implements OnInit {

  constructor(private userService: UserService, private sanitizer: DomSanitizer) { }

  userProfile: User = new User();

  reqTypes: string[] = ['Employee certificate', 'Change personal data', 'Custom request'];
  selectedReqType: string = '';
  // Urmareste valoarea campului request type(care este un dropdown cu mai multe optiuni)
  onReqTypeChange() {
    this.selectedReqType = (<HTMLSelectElement>document.getElementById('reqType')).value;
    console.log('Selected req type:', this.selectedReqType);
  }

  changableData = ['name', 'email'];
  selectedDataToChange = '';
  // Urmareste valoarea campului data to change(care este un dropdown cu mai multe optiuni)
  onDataToChangeChange() {
    this.selectedDataToChange = this.userReqForm.value.dataToChange || "";
    console.log('Selected req type:', this.selectedDataToChange);
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
      console.log(responseUserProfile);
    });
  }

  employeeCertificateForm = new FormGroup({
    reason: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(250),
    ])
  })

  userReqForm = new FormGroup({

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




  sanitizeInput(input: string): string {
    // Sanitize the input to prevent XSS
    const sanitizedInput = this.sanitizer.sanitize(SecurityContext.HTML, input);
    // Return the sanitized input
    return sanitizedInput || '';
  }
  

submitRequest() {

  // Verificam formularul
  // if (this.userForm.invalid) {
  //   this.handleUserFormError();
  //   return;
  // }

  // Creem obiectul request ce urmeaza a fi introdus in baza de date. Daca una dintre valori a ajuns necompletata in backend aceasta va fi setata ca empty string

  if (this.selectedReqType === 'Employee certificate') {

    const employeeCertificateRequest = {
      requesterId: this.userProfile.id,
      type: this.selectedReqType,

      firstName: this.userProfile.firstName,
      lastName: this.userProfile.lastName,

      country: this.userProfile.address?.country,
      county: this.userProfile.address?.county,
      city: this.userProfile.address?.city,
      street: this.userProfile.address?.street,
      streetNumber: this.userProfile.address?.streetNumber,
      flatNumber: this.userProfile.address?.flatNumber,

      CNP: this.userProfile.identityCard?.cnp,
      series: this.userProfile.identityCard?.series,
      number: this.userProfile.identityCard?.number,
      issuer: this.userProfile.identityCard?.issuer,
      issuingDate: this.userProfile.identityCard?.issuingDate,

      joinDate: this.userProfile.joinDate,
      position: this.userProfile.position,

      reason: this.sanitizeInput(this.employeeCertificateForm.value.reason || 'somethingWentWrong'),

      requestDate: new Date(),
      finishDate: undefined,
      status: 'pending',
      responderID: 0
    }

    console.log('submit request for employee certificate working');


  }

  // DE STABILIT CU BE SUB CE FORMA TREBUIE TRIMISE
  // DUPA ASTA O SA MA GANDESC SI CE SE INTAMPLA DUPA CE SA DE SUBMIT (ex refresh pagina de request/ mesaj de confirmare/etc)

  //Apelam functia de submitRequest si ii pasam ca parametru obiectul de tip request creat anterior
  // this.submitRequestSubscription = this.userRequestService.addUserRequest(issuingDate).subscribe(() => {
  // this.newGetUsersEvent.emit();

  // Dupa ce utilizatorul este adaugat,add-user-modal va emite un eveniment pe nume newGetUsersEvent ce va fi receptionat de catre componenta parinte (admin-home-page), iar lista de utilizatori de pe ecran isi va da refresh, astfel afisand inclusiv ultimul utilizator adaugat.
  // De asemenea functia closeModal() va emite un eveniment pe nume newCloseModalEvent ce va fi receptionat de catre componenta parinte (admin-home-page) si va inchide modala
  // })
}




}

