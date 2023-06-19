import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  roles: string[] = ['employee','hr','admin'];
  selectedRole: string= '';

  // Creem formularul si campurile acestuia
  userForm = new FormGroup({

    department: new FormControl('',[
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(10),
      Validators.pattern(/^[a-zA-Z0-9\s]*$/) // only alphanumeric
    ]),

    function: new FormControl('',[
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(30),
      Validators.pattern(/^[a-zA-Z0-9\s]*$/) // only alphanumeric
    ]),

    role: new FormControl('',[
      Validators.required,
    ]),

    name: new FormControl('',[
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
      Validators.pattern(/^[a-zA-Z\s]*$/) // only alphabetic
    ]),

    email: new FormControl('',[
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(60),
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) // email format
    ]),

    phone: new FormControl('',[
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern(/^[a-zA-Z0-9\s]*$/) // only alphanumeric
    ]),

    password: new FormControl('',[
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(60),
      Validators.pattern(/^[a-zA-Z0-9\s]*$/) // only alphanumeric
    ])
  })

  onRoleChange() {
    this.selectedRole = this.userForm.value.role || "";
    console.log('Selected Role:', this.selectedRole);
  }

  addUserSubscription: Subscription = new Subscription();
  updatedUserSubscription: Subscription = new Subscription();

  particlesScriptElement: HTMLScriptElement;
  particlesSettingsScriptElement: HTMLScriptElement;
  particlesHostingElement: HTMLScriptElement;


  constructor(private userService: UserService) {
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


  ngOnInit(): void {
    // Daca modala a fost apelata de pe butonul Edit, initializam formularul completat cu datele utilizatorului ce urmeaza a fi editat. 
    // Daca modala a fost apelata de pe butonul Add, initializam formularul cu campurile goale 
    console.log('modal type: '+this.modalType);
    this.userForm.patchValue({
      department: this.editedUser.department,
      function: this.editedUser.function,
      role: this.editedUser.role,
      name: this.editedUser.name,
      email: this.editedUser.email,
      phone: this.editedUser.phone,
      password: this.editedUser.password
    })
    this.selectedRole = this.userForm.value.role || "";
  }

  closeModal() {
    this.newCloseModalEvent.emit();
    // Functia closeModal() va emite un eveniment pe nume newCloseModalEvent ce va fi receptionat de catre componenta parinte (admin-home-page) si va inchide modala
  }
  



  addUser() {

    if(this.userForm.invalid){
      return;
    }

    // Creem obiectul user ce urmeaza a fi introdus in baza de date. Daca una dintre valori a ajuns necompletata in backend aceasta va fi setata ca empty string
    const user = {
      department: this.userForm.value.department || '',
      function: this.userForm.value.function || '',
      role: this.selectedRole || '',
      name: this.userForm.value.name || '',
      email: this.userForm.value.email || '',
      phone: this.userForm.value.phone || '',
      password: this.userForm.value.password || ''
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
    const user = {
      id: this.editedUser.id,
      department: this.userForm.value.department || '',
      function: this.userForm.value.function || '',
      role: this.userForm.value.role || '',
      name: this.userForm.value.name || '',
      email: this.userForm.value.email || '',
      phone: this.userForm.value.phone || '',
      password: this.userForm.value.password || ''
    }

    this.updatedUserSubscription = this.userService.updateUser(user).subscribe(() => {
      this.newGetUsersEvent.emit();
      this.closeModal();
    })
  }

  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
  
    if (control?.errors?.['required']) {
      return `${controlName} is required.`;
    }
  
    if (control?.errors?.['minlength']) {
      return `${controlName} must have at least ${control.errors ['minlength'].requiredLength} characters.`;
    }
  
    if (control?.errors?.['maxlength']) {
      return `${controlName} must have at most ${control.errors ['maxlength'].requiredLength} characters.`;
    }
  
    if (control?.errors?.['pattern']) {
      return `Please provide a valid ${controlName}.`;
    }
  
    // Add more conditions for other validation errors if needed
  
    return '';
  }
  

  ngOnDestroy(): void {
    this.addUserSubscription.unsubscribe();
  }
}


