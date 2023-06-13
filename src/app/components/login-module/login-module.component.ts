import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrls: ['./login-module.component.css']
})
export class LoginModuleComponent {
  form = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(private authService: AuthService, private router: Router) { }

  submitForm() {
    if (this.form.invalid) {
      return;
    }

    this.authService
      .login(this.form.get('email')?.value, this.form.get('password')?.value)
      .subscribe((response) => {
        this.router.navigate(['/admin']);
      })
  }

}
