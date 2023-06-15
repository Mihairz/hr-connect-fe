import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrls: ['./login-module.component.css']
})
export class LoginModuleComponent {

  // Creem formularul in ts
  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  // Injectam AuthService pt login si Router pt redirectionare
  constructor(private authService: AuthService, private router: Router) { }

  // Creem metoda submitForm, ce va fi apelata cand se apasa butonul de login
  submitForm() {
    // Daca formularul este invalid, nimic nu se intampla
    if (this.form.invalid) {
      return;
    }

    // Apeleaza functia login din AuthService pasand ca parametrii input-urile din formular. In response redirectioneaza catre pagina de admin.

    // Aici ma gandesc ca o sa creez o componenta pe nume dashboard in care sa pun admin-page si user-page ca si componente si sa le ascund in functie de ulterioara implementare a rolurilor de utilizator SAU poate reusesc sa implementez 2 redirectionari diferite in functie de rol
    this.authService
      .login(this.form.get('email')?.value, this.form.get('password')?.value)
      .subscribe((response) => {
        if(this.authService.userRole?.role === 'admin'){
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/newsfeed']);
        }
        
      })
  }

  // Flow-ul este login-module>auth-service>backend-auth
}
