import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SecurityContext } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnDestroy, OnInit {
  @Output() newCloseModalEvent = new EventEmitter<string>();
  @Output() newGetUsersEvent = new EventEmitter<string>();

  @Input() editedUser: User = new User();
  @Input() modalType: String = '';
  @Input() modalRole: String = '';

  particlesScriptElement: HTMLScriptElement;
  particlesSettingsScriptElement: HTMLScriptElement;
  particlesHostingElement: HTMLScriptElement;

  addUserSubscription: Subscription = new Subscription();
  updatedUserSubscription: Subscription = new Subscription();

  constructor(private userService: UserService, private sanitizer: DomSanitizer) {
    // Injectam serviciul user pentru a putea folosii metodele din acesta (put si post http requests in cazul nostru)

    // adaugam in mod dinamic fisierul ce contine logica pentru fundalul animat, particle.js (din folder-ul assets al angular) la HTML-ul componentei
    this.particlesScriptElement = document.createElement("script");
    this.particlesScriptElement.src = "assets/particles.js";
    document.body.appendChild(this.particlesScriptElement);

    // adaugam in mod dinamic fisierul ce contine setarile pentru fundalul animat, particle.js (din folder-ul assets al angular) la HTML-ul componentei
    this.particlesSettingsScriptElement = document.createElement("script");
    this.particlesSettingsScriptElement.src = "assets/particles-settings.js";
    document.body.appendChild(this.particlesSettingsScriptElement);

    // adaugam in mod dinamic elementul ce contine scriptul pentru hostingul? fundalului animat
    this.particlesHostingElement = document.createElement("script");
    this.particlesHostingElement.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
    document.body.appendChild(this.particlesHostingElement);
  }





  roles: string[] = ['employee', 'hr', 'admin'];
  selectedRole: string = '';
  // Urmareste valoarea campului role (care este un dropdown cu mai multe optiuni)
  onRoleChange() {
    this.selectedRole = this.userForm.value.role || "";
    console.log('Selected Role:', this.selectedRole);
  }

  departments: string[] = ["Customer_Support", "Operations", "Dev", "Finance", "Human_resources"];
  selectedDepartment: string = '';
  // Urmareste valoarea campului department (care este un dropdown cu mai multe optiuni)
  onDepartmentChange() {
    this.selectedDepartment = this.userForm.value.department || "",
      console.log('Selected department: ', this.selectedDepartment);
  }

  positions: string[] = ['Backend_Developer', 'Frontend_Developer', 'Fullstack_Developer', 'Project_Manager', 'Scrum_Mater', 'QA_Analyst', 'Business_Analyst', 'Vice_President', 'Director', 'CEO'];
  selectedPosition: string = '';
  // Urmareste valoarea campului position (care este un dropdown cu mai multe optiuni)
  onPositionChange() {
    this.selectedPosition = this.userForm.value.position || "",
      console.log('Selected position: ', this.selectedPosition);
  }


  // Creem formularul si campurile acestuia, cu restrictiile specifice
  userForm = new FormGroup({

    // USER DETAILS ==============================================================================================================================================
    role: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),

    department: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),

    position: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(60),
    ]),

    // CONTACT =======================================================================================================================================================
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(60),
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) // email format
    ]),

    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('^[0-9]+$') // only numeric
    ]),


    // PERSONAL INFORMATION ===========================================================================================================================================
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z]*$/) // only alphabetic
    ]),

    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z]*$/) // only alphabetic
    ]),

    cnp: new FormControl('', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13),
      Validators.pattern('^[0-9]+$') // only numeric 
    ]),

    series: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(3),
      Validators.pattern(/^[a-zA-Z]*$/) // only alphabetic
    ]),

    number: new FormControl(0, [
      Validators.required,
      Validators.min(100000), // ????????????????????????????????????????????????????
      Validators.max(999999),
      Validators.pattern('^[0-9]+$') // only numeric
    ]),

    issuer: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(15),
      Validators.pattern(/^[a-zA-Z0-9\s]*$/) // only alphanumeric with spaces
    ]),

    issuingDate: new FormControl(new Date(), [
      Validators.required,
      // this.isValidDate
    ]),



    country: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z\s]*$/) // only alphabetic with spaces
    ]),

    county: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z\s]*$/) // only alphabetic with spaces
    ]),

    city: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z\s]*$/) // only alphabetic with spaces
    ]),

    street: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z\s]*$/) // only alphabetic with spaces
    ]),

    streetNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(10),
      Validators.pattern(/^[a-zA-Z0-9]*$/) // only alphanumeric 
    ]),

    flatNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(10),
      Validators.pattern(/^[a-zA-Z0-9]*$/) // only alphanumeric 
    ]),
  })







  ngOnInit(): void {
    // Daca modala a fost apelata de pe butonul Edit, initializam formularul completat cu datele utilizatorului ce urmeaza a fi editat. 
    // Daca modala a fost apelata de pe butonul Add, initializam formularul cu campurile goale 
    console.log('modal type: ' + this.modalType);

    this.userForm.patchValue({
      role: this.editedUser.loginDetails?.role || "",
      department: this.editedUser.department,
      position: this.editedUser.position,
      password: this.editedUser.loginDetails?.password,

      email: this.editedUser.loginDetails?.email,
      phoneNumber: this.editedUser.phoneNumber,

      firstName: this.editedUser.firstName,
      lastName: this.editedUser.lastName,
      cnp: this.editedUser.identityCard?.cnp,
      number: this.editedUser.identityCard?.number,
      series: this.editedUser.identityCard?.series,
      issuer: this.editedUser.identityCard?.issuer,
      issuingDate: this.editedUser.identityCard?.issuingDate,

      country: this.editedUser.address?.country,
      county: this.editedUser.address?.county,
      city: this.editedUser.address?.city,
      street: this.editedUser.address?.street,
      streetNumber: this.editedUser.address?.streetNumber,
      flatNumber: this.editedUser.address?.flatNumber,
    })

    this.selectedRole = this.userForm.value.role || "";
    this.selectedDepartment = this.userForm.value.department || "";
    this.selectedPosition = this.userForm.value.position || "";
  }

  closeModal() {
    this.newCloseModalEvent.emit();
    // Functia closeModal() va emite un eveniment pe nume newCloseModalEvent ce va fi receptionat de catre componenta parinte si va inchide modala
  }

  







  errorMessage: string = '';
  errorSource: string = '';

  // Se apeleaza cand formularul produce o eroare. Verifica despre ce eroare este vorba si afiseaza un mesaj specific pentru aceasta.
  handleUserFormError() {
    // !! = obtine valoarea boolean a unui element

    switch (true) {

      // USER DETAILS ===============================================================================================================================================

      // Checking if errors come from role field
      case !!this.userForm.controls.role.errors:
        this.errorSource = 'role';
        if (!!this.userForm.controls.role.errors?.['required']) {
          this.errorMessage = 'Every user must have a role.'
        } else {
          this.errorMessage = 'Something went wrong.'
        }
        break;

      // Checking if errors come from department field
      case !!this.userForm.controls.department.errors:
        this.errorSource = 'department';
        if (!!this.userForm.controls.department.errors?.['required']) {
          this.errorMessage = 'Every user must be part of a department.';
        } else {
          this.errorMessage = 'Something went wrong.'
        }
        break;

      // Checking if errors come from function field
      case !!this.userForm.controls.position.errors:
        this.errorSource = 'position';
        if (!!this.userForm.controls.position.errors?.['required']) {
          this.errorMessage = 'Every user must have a position.';
        } else {
          this.errorMessage = 'Something went wrong.'
        }
        break;

      // Checking if errors come from password field
      case !!this.userForm.controls.password.errors:
        this.errorSource = 'password';
        switch (true) {
          case !!this.userForm.controls.password.errors?.['required']:
            this.errorMessage = 'Every user must have a password.';
            break;
          case !!this.userForm.controls.password.errors?.['minlength']:
            this.errorMessage = 'Password must contain at least 7 characters.';
            break;
          case !!this.userForm.controls.password.errors?.['maxlength']:
            this.errorMessage = 'Password can contain maximum 60 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;

      // CONTACT ===========================================================================================================================================================  

      // Checking if errors come from e-mail field
      case !!this.userForm.controls.email.errors:
        this.errorSource = 'email';
        switch (true) {
          case !!this.userForm.controls.email.errors?.['required']:
            this.errorMessage = 'Every user must have an e-mail.';
            break;
          case !!this.userForm.controls.email.errors?.['pattern']:
            this.errorMessage = 'Invalid e-mail format. Please enter a valid e-mail address.';
            break;
          case !!this.userForm.controls.email.errors?.['minlength']:
            this.errorMessage = 'E-mail must contain at least 7 characters.';
            break;
          case !!this.userForm.controls.email.errors?.['maxlength']:
            this.errorMessage = 'E-mail can contain maximum 60 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;


      // Checking if errors come from phone field
      case !!this.userForm.controls.phoneNumber.errors:
        this.errorSource = 'phone';
        switch (true) {
          case !!this.userForm.controls.phoneNumber.errors?.['required']:
            this.errorMessage = 'Every user must have a phone number.';
            break;
          case !!this.userForm.controls.phoneNumber.errors?.['pattern']:
            this.errorMessage = 'Phone number can contain only numeric characters.';
            break;
          case !!this.userForm.controls.phoneNumber.errors?.['minlength']:
            this.errorMessage = 'Phone number must contain at least 10 characters.';
            break;
          case !!this.userForm.controls.phoneNumber.errors?.['maxlength']:
            this.errorMessage = 'Phone number can contain maximum 10 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;

      // PERSONAL INFO =====================================================================================================================================================  

      // Checking if errors come from first name field
      case !!this.userForm.controls.firstName.errors:
        this.errorSource = 'firstName';
        switch (true) {
          case !!this.userForm.controls.firstName.errors?.['required']:
            this.errorMessage = 'Every user must have a first name.';
            break;
          case !!this.userForm.controls.firstName.errors?.['pattern']:
            this.errorMessage = 'First name can contain only alphabetic characters.';
            break;
          case !!this.userForm.controls.firstName.errors?.['minlength']:
            this.errorMessage = 'First name must contain at least 2 characters.';
            break;
          case !!this.userForm.controls.firstName.errors?.['maxlength']:
            this.errorMessage = 'First name can contain maximum 50 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;

      // Checking if errors come from last name field
      case !!this.userForm.controls.lastName.errors:
        this.errorSource = 'lastName';
        switch (true) {
          case !!this.userForm.controls.lastName.errors?.['required']:
            this.errorMessage = 'Every user must have a last name.';
            break;
          case !!this.userForm.controls.lastName.errors?.['pattern']:
            this.errorMessage = 'Last name can contain only alphabetic characters.';
            break;
          case !!this.userForm.controls.lastName.errors?.['minlength']:
            this.errorMessage = 'Last name must contain at least 2 characters.';
            break;
          case !!this.userForm.controls.lastName.errors?.['maxlength']:
            this.errorMessage = 'Last name can contain maximum 50 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;

      // Checking if errors come from cnp field
      case !!this.userForm.controls.cnp.errors:
        this.errorSource = 'cnp';
        switch (true) {
          case !!this.userForm.controls.cnp.errors?.['required']:
            this.errorMessage = 'Identity card must have a cnp.';
            break;
          case !!this.userForm.controls.cnp.errors?.['pattern']:
            this.errorMessage = 'Cnp can contain only numeric characters.';
            break;
          case !!this.userForm.controls.cnp.errors?.['minlength']:
            this.errorMessage = 'Cnp must contain at least 13 characters.';
            break;
          case !!this.userForm.controls.cnp.errors?.['maxlength']:
            this.errorMessage = 'Cnp can contain maximum 13 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;

      // Checking if errors come from identity series field
      case !!this.userForm.controls.series.errors:
        this.errorSource = 'series';
        switch (true) {
          case !!this.userForm.controls.series.errors?.['required']:
            this.errorMessage = 'Identity card must have a series.';
            break;
          case !!this.userForm.controls.series.errors?.['pattern']:
            this.errorMessage = 'Identity card series can contain only alphabetic characters.';
            break;
          case !!this.userForm.controls.series.errors?.['minlength']:
            this.errorMessage = 'Identity card series must contain at least 2 characters.';
            break;
          case !!this.userForm.controls.series.errors?.['maxlength']:
            this.errorMessage = 'Identity card series can contain maximum 3 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;

      // Checking if errors come from identity card number field
      case !!this.userForm.controls.number.errors:
        this.errorSource = 'number';
        switch (true) {
          case !!this.userForm.controls.number.errors?.['required']:
            this.errorMessage = 'Identity card must have a number.';
            break;
          case !!this.userForm.controls.number.errors?.['pattern']:
            this.errorMessage = 'Identity card number can contain only numeric characters.';
            break;
          case !!this.userForm.controls.number.errors?.['minlength']:
            this.errorMessage = 'Identity card number must contain at least 6 digits.';
            break;
          case !!this.userForm.controls.number.errors?.['maxlength']:
            this.errorMessage = 'Identity card number can contain maximum 6 digits.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;

      // Checking if errors come from identity card issuer field
      case !!this.userForm.controls.issuer.errors:
        this.errorSource = 'issuer';
        switch (true) {
          case !!this.userForm.controls.issuer.errors?.['required']:
            this.errorMessage = 'Identity card must have a issuer.';
            break;
          case !!this.userForm.controls.issuer.errors?.['pattern']:
            this.errorMessage = 'Identity card issuer can contain only alphanumeric characters.';
            break;
          case !!this.userForm.controls.issuer.errors?.['minlength']:
            this.errorMessage = 'Identity card issuer must contain at least 2 characters.';
            break;
          case !!this.userForm.controls.issuer.errors?.['maxlength']:
            this.errorMessage = 'Identity card issuer can contain maximum 15 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;

      // Checking if errors come from identity card issuingDate field
      case !!this.userForm.controls.issuingDate.errors:
        this.errorSource = 'issuingDate';
        switch (true) {
          case !!this.userForm.controls.issuingDate.errors?.['required']:
            this.errorMessage = 'Identity card must have an issuing date.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;


      // Checking if errors come from country field
      case !!this.userForm.controls.country.errors:
        this.errorSource = 'country';
        switch (true) {
          case !!this.userForm.controls.country.errors?.['required']:
            this.errorMessage = 'Every user must have a provenience country.';
            break;
          case !!this.userForm.controls.country.errors?.['pattern']:
            this.errorMessage = 'Country name can contain only alphabetic characters.';
            break;
          case !!this.userForm.controls.country.errors?.['minlength']:
            this.errorMessage = 'Country name must contain at least 5 characters.';
            break;
          case !!this.userForm.controls.country.errors?.['maxlength']:
            this.errorMessage = 'Country name can contain maximum 50 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;

      // Checking if errors come from county field
      case !!this.userForm.controls.county.errors:
        this.errorSource = 'county';
        switch (true) {
          case !!this.userForm.controls.county.errors?.['required']:
            this.errorMessage = 'Every user must have a provenience county.';
            break;
          case !!this.userForm.controls.county.errors?.['pattern']:
            this.errorMessage = 'County name can contain only alphabetic characters.';
            break;
          case !!this.userForm.controls.county.errors?.['minlength']:
            this.errorMessage = 'County name must contain at least 5 characters.';
            break;
          case !!this.userForm.controls.county.errors?.['maxlength']:
            this.errorMessage = 'County name can contain maximum 50 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;

      // Checking if errors come from city field
      case !!this.userForm.controls.city.errors:
        this.errorSource = 'city';
        switch (true) {
          case !!this.userForm.controls.city.errors?.['required']:
            this.errorMessage = 'Every user must have a provenience city.';
            break;
          case !!this.userForm.controls.city.errors?.['pattern']:
            this.errorMessage = 'City name can contain only alphabetic characters.';
            break;
          case !!this.userForm.controls.city.errors?.['minlength']:
            this.errorMessage = 'City name must contain at least 5 characters.';
            break;
          case !!this.userForm.controls.city.errors?.['maxlength']:
            this.errorMessage = 'City name can contain maximum 50 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;


      // Checking if errors come from street field
      case !!this.userForm.controls.street.errors:
        this.errorSource = 'street';
        switch (true) {
          case !!this.userForm.controls.street.errors?.['required']:
            this.errorMessage = 'Street name is required.';
            break;
          case !!this.userForm.controls.street.errors?.['pattern']:
            this.errorMessage = 'Street name can contain only alphabetic characters.';
            break;
          case !!this.userForm.controls.street.errors?.['minlength']:
            this.errorMessage = 'Street name must contain at least 5 characters.';
            break;
          case !!this.userForm.controls.street.errors?.['maxlength']:
            this.errorMessage = 'Street name can contain maximum 50 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;

      // Checking if errors come from street number field
      case !!this.userForm.controls.streetNumber.errors:
        this.errorSource = 'streetNumber';
        switch (true) {
          case !!this.userForm.controls.streetNumber.errors?.['required']:
            this.errorMessage = 'Street number is required.';
            break;
          case !!this.userForm.controls.streetNumber.errors?.['pattern']:
            this.errorMessage = 'Street number can contain only alphanumeric characters.';
            break;
          case !!this.userForm.controls.streetNumber.errors?.['minlength']:
            this.errorMessage = 'Street number must contain at least 1 character.';
            break;
          case !!this.userForm.controls.streetNumber.errors?.['maxlength']:
            this.errorMessage = 'Street number can contain maximum 10 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;

      // Checking if errors come from flat number field
      case !!this.userForm.controls.flatNumber.errors:
        this.errorSource = 'flatNumber';
        switch (true) {
          case !!this.userForm.controls.flatNumber.errors?.['required']:
            this.errorMessage = 'Flat number is required.';
            break;
          case !!this.userForm.controls.flatNumber.errors?.['pattern']:
            this.errorMessage = 'Flat number can contain only alphanumeric characters.';
            break;
          case !!this.userForm.controls.flatNumber.errors?.['minlength']:
            this.errorMessage = 'Flat number must contain at least 1 character.';
            break;
          case !!this.userForm.controls.flatNumber.errors?.['maxlength']:
            this.errorMessage = 'Flat number can contain maximum 10 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;

      // If formular is invalid, but because of reasons different than invalid input
      default:
        this.errorSource = 'default';
        this.errorMessage = 'Something went wrong.';
        break;
    }
  }

  // Used on password field because it's the only input field that accepts special characters
  sanitizeInput(input: string): string {
    // Sanitize the input to prevent XSS
    const sanitizedInput = this.sanitizer.sanitize(SecurityContext.HTML, input);
    // Return the sanitized input
    return sanitizedInput || '';
  }







  addUser() {

    // Verificam formularul
    if (this.userForm.invalid) {
      this.handleUserFormError();
      return;
    }

    // Creem obiectul user ce urmeaza a fi introdus in baza de date
    const user = {
      department: this.userForm.value.department || '',
      position: this.userForm.value.position || '',

      firstName: this.userForm.value.firstName || '',
      lastName: this.userForm.value.lastName || '',

      phoneNumber: this.userForm.value.phoneNumber || '',

      joinDate: new Date()
    }

    // Creem obiectul loginDetails aferent ce urmeaza a fi introdus in baza de date
    const loginDetails = {
      email: this.userForm.value.email || '',
      password: this.sanitizeInput(this.userForm.controls.password.value || "") || '',
      role: this.selectedRole || '',
    }

    // Creem obiectul address aferent ce urmeaza a fi introdus in baza de date
    const address = {
      country: this.userForm.value.country || '',
      county: this.userForm.value.county || '',
      city: this.userForm.value.city || '',
      street: this.userForm.value.street || '',
      streetNumber: this.userForm.value.streetNumber || '',
      flatNumber: this.userForm.value.flatNumber || '',
    }

    // Creem obiectul identity card aferent ce urmeaza a fi introdus in baza de date
    const identityCard = {
      cnp: this.userForm.value.cnp || '',
      number: this.userForm.value.number || 0,
      series: this.userForm.value.series || '',
      issuer: this.userForm.value.issuer || '',
      issuingDate: this.userForm.value.issuingDate || undefined,
    }

    // Apelam functia de addUser si ii pasam ca parametru obiectele de tip user,login details, address, identity card create anterior
    this.addUserSubscription = this.userService.addUser(user, loginDetails, address, identityCard).subscribe(() => {
      this.newGetUsersEvent.emit();
      this.closeModal();
      // Dupa ce utilizatorul este adaugat,add-user-modal va emite un eveniment pe nume newGetUsersEvent ce va fi receptionat de catre componenta parinte (admin-home-page), iar lista de utilizatori de pe ecran isi va da refresh, astfel afisand inclusiv ultimul utilizator adaugat.
      // De asemenea functia closeModal() va emite un eveniment pe nume newCloseModalEvent ce va fi receptionat de catre componenta parinte (admin-home-page) si va inchide modala
    })
  }

  updateUser() {

    // Verificam formularul
    if (this.userForm.invalid) {
      this.handleUserFormError();
      return;
    }


    // Creem obiectul de tip user cu valorile completate in formular
    const user = {
      id: this.editedUser.id,

      department: this.userForm.value.department || '',
      position: this.userForm.value.position || '',

      firstName: this.userForm.value.firstName || '',
      lastName: this.userForm.value.lastName || '',

      phoneNumber: this.userForm.value.phoneNumber || '',

      joinDate: this.editedUser.joinDate,
    }

    // Creem obiectul de tip login details cu valorile completate in formular
    const loginDetails = {
      id: this.editedUser.loginDetails?.id,
      email: this.userForm.value.email || '',
      password: this.sanitizeInput(this.userForm.controls.password.value || "") || '',
      role: this.userForm.value.role || '',
    }

    // Creem obiectul de tip address cu valorile completate in formular
    const address = {
      id: this.editedUser.address?.id,
      country: this.userForm.value.country || '',
      county: this.userForm.value.county || '',
      city: this.userForm.value.city || '',
      street: this.userForm.value.street || '',
      streetNumber: this.userForm.value.streetNumber || '',
      flatNumber: this.userForm.value.flatNumber || '',
    }

    // Creem obiectul de tip identity card cu valorile completate in formular
    const identityCard = {
      id: this.editedUser.identityCard?.id,
      cnp: this.userForm.value.cnp || '',
      number: this.userForm.value.number || 0,
      series: this.userForm.value.series || '',
      issuer: this.userForm.value.issuer || '',
      issuingDate: this.userForm.value.issuingDate || undefined,
    }

    // Apelam functia de updateUser() si ii pasam ca parametru obiectele de tip user, login details, address, identity card create anterior
    this.updatedUserSubscription = this.userService.updateUser(user,loginDetails,address,identityCard).subscribe(() => {
      this.newGetUsersEvent.emit();
      this.closeModal();
    })
  }

  ngOnDestroy(): void {
    this.addUserSubscription.unsubscribe();
    this.updatedUserSubscription.unsubscribe();
  }
}


