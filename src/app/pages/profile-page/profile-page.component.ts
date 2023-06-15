import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout() // Apeleaza functia logout din AuthService fara parametrii.
    
    this.router.navigate(['/login']); // Redirectioneaza catre pagina de login.
  }

}
