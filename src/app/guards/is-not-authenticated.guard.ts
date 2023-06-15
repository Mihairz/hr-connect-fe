// Se foloseste pentru a bloca accesul la diferite rute utilizatorilor logati / Se atribuie rutelor destinate exclusiv utilizatorilor nelogati (ex. login-page)

import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { tap } from 'rxjs'; 

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  return authService.isLoggedIn$.pipe(
    tap(isLoggedIn => {
      if(isLoggedIn){
        router.navigateByUrl('/newsfeed');
      }
    })
  )
};

// Aici am avut probleme cu butonul de logout si am folosit ChatGPT
// The issue is that the IsNotAuthenticatedGuard is redirecting the user from the /login route to the /profile page when they are already logged in. However, when the user clicks the logout button on the /profile page, they are redirected to the /login route, triggering the IsNotAuthenticatedGuard, which then redirects them back to the /profile page because they are logged in.
