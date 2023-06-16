import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements OnDestroy {
  @Output() newCloseModalEvent = new EventEmitter<string>();
  @Output() newGetUsersEvent = new EventEmitter<string>();

  // Creem formularul si campurile acestuia
  userForm = new FormGroup({
    department: new FormControl(''),
    team: new FormControl(''),
    role: new FormControl(''),
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl('')
  })

  addUserSubscription: Subscription = new Subscription();

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



  addUser() {
    // Creem obiectul user ce urmeaza a fi introdus in baza de date. Daca una dintre valori a ajuns necompletata in backend aceasta va fi setata ca empty string
    const user = {
      department: this.userForm.value.department || '',
      team: this.userForm.value.team || '',
      role: this.userForm.value.role || '',
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

  closeModal() {
    this.newCloseModalEvent.emit();
  }
  // Functia closeModal() va emite un eveniment pe nume newCloseModalEvent ce va fi receptionat de catre componenta parinte (admin-home-page) si va inchide modala


  ngOnDestroy(): void {
    this.addUserSubscription.unsubscribe();
  }
}


