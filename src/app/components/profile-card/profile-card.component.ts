import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  userId: string = '';
  userProfile: User | undefined;


  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id !== null ? id : '';
    this.getUser(parseInt(this.userId));
  }

  // response is the data that we require 
  getUser(id: number) {
    this.userService.getUserById(id).subscribe((responseUserProfile) => {
      this.userProfile = responseUserProfile;
      // console.log(responseUserProfile);
    });
  }

  logout() {
    this.authService.logout().then(() => {
      // .then(() => { ... }) is used to chain a callback function that will be executed after the logout process is completed. It is executed when the promise returned by this.authService.logout() is resolved.

      this.router.navigate(['/login']); // inside the callback function redirects to login page
    });
  }



}
