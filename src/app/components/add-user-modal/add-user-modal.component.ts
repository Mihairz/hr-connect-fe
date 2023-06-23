import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer} from '@angular/platform-browser';
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

  roles: string[] = ['employee', 'hr', 'admin'];
  selectedRole: string = '';
  errorMessage: string = '';
  errorSource: string = '';


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


  // Creem formularul si campurile acestuia, cu restrictiile specifice
  userForm = new FormGroup({

    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phoneNumber: new FormControl(''),
    
    country: new FormControl(''),
    county: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    streetNumber: new FormControl(''),
    flatNumber: new FormControl(''),



    department: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
      Validators.pattern(/^[a-zA-Z0-9\s]*$/) // only alphanumeric
    ]),

    position: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      Validators.pattern(/^[a-zA-Z0-9\s]*$/) // only alphanumeric
    ]),

    email: new FormControl(''),
    password: new FormControl(''),
    role: new FormControl('', [
      Validators.required,
    ]),

    cnp: new FormControl(''),
    number: new FormControl(0),
    series: new FormControl(''),
    issuer: new FormControl(''),
    issuing_date: new FormControl(new Date())

    // name: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(5),
    //   Validators.maxLength(50),
    //   Validators.pattern(/^[a-zA-Z\s]*$/) // only alphabetic
    // ]),

    // email: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(7), 
    //   Validators.maxLength(60), 
    //   Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) // email format
    // ]),
 
    // phone: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(10),
    //   Validators.maxLength(10),
    //   Validators.pattern('^[0-9]+$') // only numeric
    // ]),

    // password: new FormControl('', [
    //   Validators.required,
    //   Validators.minLength(7),
    //   Validators.maxLength(60),
    // ])
  })


  ngOnInit(): void {
    // Daca modala a fost apelata de pe butonul Edit, initializam formularul completat cu datele utilizatorului ce urmeaza a fi editat. 
    // Daca modala a fost apelata de pe butonul Add, initializam formularul cu campurile goale 
    console.log('modal type: ' + this.modalType);

    this.userForm.patchValue({
      firstName: this.editedUser.firstName,
      lastName: this.editedUser.lastName,
      phoneNumber: this.editedUser.phoneNumber,

      country: this.editedUser.address?.country,
      county: this.editedUser.address?.county,
      city: this.editedUser.address?.city,
      street: this.editedUser.address?.street,
      streetNumber: this.editedUser.address?.streetNumber,
      flatNumber: this.editedUser.address?.flatNumber,

      department: this.editedUser.department,
      position: this.editedUser.position,
      
      email: this.editedUser.loginDetails?.email,
      password: this.editedUser.loginDetails?.password,
      

      cnp: this.editedUser.identityCard?.cnp,
      number: this.editedUser.identityCard?.number,
      series: this.editedUser.identityCard?.series,
      issuer: this.editedUser.identityCard?.issuer,
      issuing_date: this.editedUser.identityCard?.issuing_date

      
    })
    // this.join date
    this.selectedRole = this.userForm.value.role || "";
  }

  closeModal() {
    this.newCloseModalEvent.emit();
    // Functia closeModal() va emite un eveniment pe nume newCloseModalEvent ce va fi receptionat de catre componenta parinte si va inchide modala
  }


  sanitizeInput(input: string): string {
    // Sanitize the input to prevent XSS
    const sanitizedInput = this.sanitizer.sanitize(SecurityContext.HTML, input);
    // Return the sanitized input
    return sanitizedInput || '';
  }

  // Se apeleaza cand formularul produce o eroare. Verifica despre ce eroare este vorba si afiseaza un mesaj specific pentru aceasta.
  handleUserFormError() { 
    // !! = obtine valoarea boolean a unui element

    switch (true) {

      // Checking if errors come from department field
      case !!this.userForm.controls.department.errors:
        this.errorSource = 'department';
        switch (true) {
          case !!this.userForm.controls.department.errors?.['required']:
            this.errorMessage = 'Every user must be part of a department.';
            break;
          case !!this.userForm.controls.department.errors?.['pattern']:
            this.errorMessage = 'Department name can contain only aphanumeric characters.';
            break;
          case !!this.userForm.controls.department.errors?.['minlength']:
            this.errorMessage = 'Department must contain at least 2 characters.';
            break;
          case !!this.userForm.controls.department.errors?.['maxlength']:
            this.errorMessage = 'Department can contain a maximum of 10 characters.';
            break;
          default:
            this.errorMessage = 'Something went wrong.';
            break;
        }
        break;

      // Checking if errors come from function field
      case !!this.userForm.controls.position.errors:
        this.errorSource = 'function';
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

      // Checking if errors come from role field
      case !!this.userForm.controls.role.errors:
        this.errorSource = 'role';
        this.errorMessage = 'Every user must have a role.'
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

  // Urmareste valoarea campului role (care este un dropdown cu 3 optiuni)
  onRoleChange() {
    this.selectedRole = this.userForm.value.role || "";
    console.log('Selected Role:', this.selectedRole);
  }

  addUser() {
 
    // Verificam formularul
    if (this.userForm.invalid) {
      this.handleUserFormError();
      return;
    }

    // Creem obiectul user ce urmeaza a fi introdus in baza de date. Daca una dintre valori a ajuns necompletata in backend aceasta va fi setata ca empty string
    const user = {
      firstName: this.userForm.value.firstName || '',
      lastName: this.userForm.value.lastName || '',
      phoneNumber: this.userForm.value.phoneNumber || '',

      country: this.userForm.value.country || '',
      county: this.userForm.value.county || '',
      city: this.userForm.value.city || '',
      street: this.userForm.value.street || '',
      streetNumber: this.userForm.value.streetNumber || '',
      flatNumber:this.userForm.value.flatNumber || '',

      department: this.userForm.value.department || '',
      position: this.userForm.value.position || '',
      
      email: this.userForm.value.email || '',
      password:this.sanitizeInput(this.userForm.controls.password.value || "") || '' ,
      

      cnp: this.userForm.value.cnp || '',
      number: this.userForm.value.number || '',
      series: this.userForm.value.series || '',
      issuer: this.userForm.value.issuer || '',
      issuing_date: this.userForm.value.issuing_date || ''








      // department: this.userForm.value.department || '',
      // function: this.userForm.value.position || '',
      // role: this.selectedRole || '',
      // name: this.userForm.value.firstName || '',
      // email: this.userForm.value.email || '',
      // phone: this.userForm.value.phoneNumber || '',
      // password: this.sanitizeInput(this.userForm.controls.password.value || "") || ''
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
      joinDate: this.editedUser.joinDate,
      
      firstName: this.userForm.value.firstName || '',
      lastName: this.userForm.value.lastName || '',
      phoneNumber: this.userForm.value.phoneNumber || '',

      country: this.userForm.value.country || '',
      county: this.userForm.value.county || '',
      city: this.userForm.value.city || '',
      street: this.userForm.value.street || '',
      streetNumber: this.userForm.value.streetNumber || '',
      flatNumber: this.userForm.value.flatNumber || '',

      department: this.userForm.value.department || '',
      position: this.userForm.value.position || '',
      
      email: this.userForm.value.email || '',
      password:this.sanitizeInput(this.userForm.controls.password.value || "") || '' ,
      

      cnp: this.userForm.value.cnp || '',
      number: this.userForm.value.number || '',
      series: this.userForm.value.series || '',
      issuer: this.userForm.value.issuer || '',
      issuing_date: this.userForm.value.issuing_date || ''
    }

    // Apelam functia de updateUser() si ii pasam ca parametru obiectul de tip User creat anterior
    this.updatedUserSubscription = this.userService.updateUser(user).subscribe(() => {
      this.newGetUsersEvent.emit();
      this.closeModal();
    })
  }


  ngOnDestroy(): void {
    this.addUserSubscription.unsubscribe();
  }
}


