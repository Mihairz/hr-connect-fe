import { CanActivateFn } from '@angular/router';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  return true;
};


import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class IsAuthenticatedGuard implements CanActivateFn {
  constructor(private authService: AuthService) {}

  canActivate(route: any, state: any): Observable<boolean> {
    // Access the variable from the AuthService and return its boolean value
    return this.authService.isLoggedIn$;
  }
}

