import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserRequestService } from 'src/app/services/userRequest.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-requests-user',
  templateUrl: './requests-user.component.html',
  styleUrls: ['./requests-user.component.css']
})
export class RequestsUserComponent implements OnInit {

  constructor(private userService: UserService, private userRequestService: UserRequestService) { }

  userProfile: User = new User();

  reqTypes: string[] = ['Employee certificate', 'Change personal data', 'Custom request'];
  selectedReqType: string = '';

  changableData = ['name', 'email'];
  selectedDataToChange = '';

  errorMessage: string = '';
  errorSource: string = '';

  submitRequestSubscription: Subscription = new Subscription();

  ngOnInit() {
    const id = 2; // o sa luam id-ul sau e-mail-ul din token, dar momentan il hardcodam
    this.getUser(id); // obtinem datele utilizatorului logat
  }

  // response is the data that we require 
  getUser(id: number) {
    this.userService.getUserById(id).subscribe((responseUserProfile) => {
      this.userProfile = responseUserProfile;
      // console.log(responseUserProfile);
    });
  }

  employeeCertificateForm = new FormGroup({
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

  // Urmareste valoarea campului request type(care este un dropdown cu mai multe optiuni)
  onReqTypeChange() {
    this.selectedReqType = (<HTMLSelectElement>document.getElementById('reqType')).value;
    console.log('Selected req type:', this.selectedReqType);
  }

  // Urmareste valoarea campului data to change(care este un dropdown cu mai multe optiuni)
  onDataToChangeChange() {
    this.selectedDataToChange = this.userReqForm.value.dataToChange || "";
    console.log('Selected req type:', this.selectedDataToChange);
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
        country: this.employeeCertificateForm.value.country,
        county: this.employeeCertificateForm.value.county,
        city: this.employeeCertificateForm.value.city,
        addressLine: this.employeeCertificateForm.value.addressLine,
        CNP: this.employeeCertificateForm.value.CNP,
        series: this.employeeCertificateForm.value.series,
        idNumber: this.employeeCertificateForm.value.idNumber,
        issuingAuthority: this.employeeCertificateForm.value.issuingAuthority,
        idReleaseDate: this.employeeCertificateForm.value.idReleaseDate,
        joinDate: new Date(), // to modify
        jobTitle: this.employeeCertificateForm.value.jobTitle,
        reason: this.employeeCertificateForm.value.reason,

        requestDate: new Date(),
        finishDate: undefined,
        status: 'pending',
        responderID: 0
      }

      console.log('submit request for employee certificate working');
      // console.log(employeeCertificateRequest.name + " " + employeeCertificateRequest.city)

      // Apelam functia de submitRequest si ii pasam ca parametru obiectul de tip User creat anterior
      // this.submitRequestSubscription = this.userRequestService.addUserRequest(employeeCertificateRequest).subscribe(() => {
      //   // this.newGetUsersEvent.emit();
        
      //   // Dupa ce utilizatorul este adaugat,add-user-modal va emite un eveniment pe nume newGetUsersEvent ce va fi receptionat de catre componenta parinte (admin-home-page), iar lista de utilizatori de pe ecran isi va da refresh, astfel afisand inclusiv ultimul utilizator adaugat.
      //   // De asemenea functia closeModal() va emite un eveniment pe nume newCloseModalEvent ce va fi receptionat de catre componenta parinte (admin-home-page) si va inchide modala
      // })

    }



    // Apelam functia de addUser si ii pasam ca parametru obiectul de tip User creat anterior
    // this.addUserSubscription = this.userService.addUser(user).subscribe(() => {
    //   this.newGetUsersEvent.emit();
    //   this.closeModal();
    // Dupa ce utilizatorul este adaugat,add-user-modal va emite un eveniment pe nume newGetUsersEvent ce va fi receptionat de catre componenta parinte (admin-home-page), iar lista de utilizatori de pe ecran isi va da refresh, astfel afisand inclusiv ultimul utilizator adaugat.
    // De asemenea functia closeModal() va emite un eveniment pe nume newCloseModalEvent ce va fi receptionat de catre componenta parinte (admin-home-page) si va inchide modala
    // })
  }
}
