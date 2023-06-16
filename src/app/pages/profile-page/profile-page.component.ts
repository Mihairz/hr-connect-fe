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
    this.authService.logout().then(() => { 
      // .then(() => { ... }) is used to chain a callback function that will be executed after the logout process is completed. It is executed when the promise returned by this.authService.logout() is resolved.

      this.router.navigate(['/login']); // inside the callback function redirects to login page
    });
  }
  
}
