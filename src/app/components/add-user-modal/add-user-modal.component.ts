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

    // User details====================================================================================================
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

    // Contact==========================================================================================================
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


    // Personal information=============================================================================================
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z]*$/) // only alphabetic
    ]),

    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z]*$/) // only alphabetic
    ]),

    cnp: new FormControl('', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13),
      Validators.pattern('^[0-9]+$') // only numeric 
    ]),

    number: new FormControl(0, [
      Validators.required,
      Validators.min(100000),
      Validators.max(999999),
      Validators.pattern('^[0-9]+$') // only numeric
    ]),

    series: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(3),
      Validators.pattern(/^[a-zA-Z]*$/) // only alphabetic
    ]),

    issuer: new FormControl('', [
      Validators.minLength(2),
      Validators.maxLength(5),
      Validators.pattern(/^[a-zA-Z0-9\s]*$/) // only alphanumeric with spaces
    ]),

    issuingDate: new FormControl(new Date(), [
      Validators.required,
      this.isValidDate
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

  // Verifica daca o data introdusa intr-un text input este format data dd/mm/yyyy si este valida
  // Folosita in formularul de add user la input-ul text Identity card issuing date
  isValidDate(control: AbstractControl): { [key: string]: any } | null {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/; // Verifica formatul
    const value = control.value;

    if (!datePattern.test(value)) {
      return { invalidFormat: true };
    }

    // Incearca sa creeze un obiect de tip Date cu input-ul introdus
    const dateParts = value.split('/');
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    const date = new Date(year, month - 1, day);
    // month-1 pentru ca in clasa Date lunile sunt numerotate de la 0 la 11

    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return { invalidDate: true };
    }

    return null;
  }






  ngOnInit(): void {
    // Daca modala a fost apelata de pe butonul Edit, initializam formularul completat cu datele utilizatorului ce urmeaza a fi editat. 
    // Daca modala a fost apelata de pe butonul Add, initializam formularul cu campurile goale 
    console.log('modal type: ' + this.modalType);

    this.userForm.patchValue({
      role: this.editedUser.loginDetails?.role,
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
        switch (true) {
          case !!this.userForm.controls.position.errors?.['required']:
            this.errorMessage = 'Every user must be have a function.';
            break;
          case !!this.userForm.controls.position.errors?.['pattern']:
            this.errorMessage = 'Function name can contain only aphanumeric characters.';
            break;
          case !!this.userForm.controls.position.errors?.['minlength']:
            console.log('min length error')
            this.errorMessage = 'Function must contain at least 7 characters.';
            break;
          case !!this.userForm.controls.position.errors?.['maxlength']:
            this.errorMessage = 'Function can contain a maximum of 30 characters.';
            break;
          default:
            if (this.userForm.controls.position.errors) {
              this.errorMessage = 'Something went wrong with the function field.';
            } else {
              this.errorMessage = 'Something went wrong.';
            }
            break;
        }
        break;



      // Checking if errors come from name field
      case !!this.userForm.controls.firstName.errors:
        this.errorSource = 'name';
        switch (true) {
          case !!this.userForm.controls.firstName.errors?.['required']:
            this.errorMessage = 'Every user must have a name.';
            break;
          case !!this.userForm.controls.firstName.errors?.['pattern']:
            this.errorMessage = 'User name can contain only alphabetic characters.';
            break;
          case !!this.userForm.controls.firstName.errors?.['minlength']:
            this.errorMessage = 'User name must contain at least 5 characters.';
            break;
          case !!this.userForm.controls.firstName.errors?.['maxlength']:
            this.errorMessage = 'User name can contain a maximum of 50 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;

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
            this.errorMessage = 'E-mail can contain a maximum of 60 characters.';
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
            this.errorMessage = 'Phone number can contain a maximum of 10 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
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
            this.errorMessage = 'Password can contain a maximum of 60 characters.';
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

    // Creem obiectul user ce urmeaza a fi introdus in baza de date. Daca una dintre valori a ajuns necompletata in backend aceasta va fi setata ca empty string
    const user = {
      role: this.userForm.value.role || '',
      department: this.userForm.value.department || '',
      position: this.userForm.value.position || '',
      password: this.sanitizeInput(this.userForm.controls.password.value || "") || '',

      email: this.userForm.value.email || '',
      phoneNumber: this.userForm.value.phoneNumber || '',

      firstName: this.userForm.value.firstName || '',
      lastName: this.userForm.value.lastName || '',
      cnp: this.userForm.value.cnp || '',
      number: this.userForm.value.number || '',
      series: this.userForm.value.series || '',
      issuer: this.userForm.value.issuer || '',
      issuingDate: this.userForm.value.issuingDate || '',

      country: this.userForm.value.country || '',
      county: this.userForm.value.county || '',
      city: this.userForm.value.city || '',
      street: this.userForm.value.street || '',
      streetNumber: this.userForm.value.streetNumber || '',
      flatNumber: this.userForm.value.flatNumber || '',

      joinDate: new Date()
    }

    // Apelam functia de addUser si ii pasam ca parametru obiectul de tip User creat anterior
    this.addUserSubscription = this.userService.addUser(user).subscribe(() => {
      this.newGetUsersEvent.emit();
      this.closeModal();
      // Dupa ce utilizatorul este adaugat,add-user-modal va emite un eveniment pe nume newGetUsersEvent ce va fi receptionat de catre componenta parinte (admin-home-page), iar lista de utilizatori de pe ecran isi va da refresh, astfel afisand inclusiv ultimul utilizator adaugat.
      // De asemenea functia closeModal() va emite un eveniment pe nume newCloseModalEvent ce va fi receptionat de catre componenta parinte (admin-home-page) si va inchide modala
    })
  }

  updateUser() {
    // Creem un obiect de tip user cu valorile completate in formular
    const user = {
      id: this.editedUser.id,

      role: this.userForm.value.role || '',
      department: this.userForm.value.department || '',
      position: this.userForm.value.position || '',
      password: this.sanitizeInput(this.userForm.controls.password.value || "") || '',

      email: this.userForm.value.email || '',
      phoneNumber: this.userForm.value.phoneNumber || '',

      firstName: this.userForm.value.firstName || '',
      lastName: this.userForm.value.lastName || '',
      cnp: this.userForm.value.cnp || '',
      number: this.userForm.value.number || '',
      series: this.userForm.value.series || '',
      issuer: this.userForm.value.issuer || '',
      issuingDate: this.userForm.value.issuingDate || '',

      country: this.userForm.value.country || '',
      county: this.userForm.value.county || '',
      city: this.userForm.value.city || '',
      street: this.userForm.value.street || '',
      streetNumber: this.userForm.value.streetNumber || '',
      flatNumber: this.userForm.value.flatNumber || '',

      joinDate: this.editedUser.joinDate,
    }

    // Apelam functia de updateUser() si ii pasam ca parametru obiectul de tip User creat anterior
    this.updatedUserSubscription = this.userService.updateUser(user).subscribe(() => {
      this.newGetUsersEvent.emit();
      this.closeModal();
    })
  }

  ngOnDestroy(): void {
    this.addUserSubscription.unsubscribe();
    this.updatedUserSubscription.unsubscribe();
  }
}


