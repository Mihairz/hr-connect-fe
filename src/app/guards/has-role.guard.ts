import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable, inject } from '@angular/core';

// Preia si verifica rolul utilizatorului logat bazandu-se pe variabila userRole, injectata din authService, care stocheaza payload-ul jwt-ului, in care se afla o proprietate pe nume 'role' ce poate avea valoarea 'admin'/'hr'/'employee'.
// Se aplica ca si proprietate 'canActivate' + proprietate 'data:{role:''} in care se mentioneaza denumirea categoriilor de utilziatori autorizati la rutele paginilor ce nu vrem sa fie accesibile de utilizatorii neautorizati   (in app-routing.module.ts)

export const hasRoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  const authService = inject(AuthService) as AuthService;
  const router = inject(Router);

  // console.log("user role: "+authService.userRole?.role);

  const isAuthorized =  authService.userRole?.role.includes(route.data['role']) ?? false;
  // verificam daca proprietatea 'role' din variabila userRole include categoria de utilizatori mentionata in proprietate 'role' a proprietatii 'data' a rutei din app-routing.module.ts

  if(!isAuthorized){
    router.navigate(['']);
  }
  // Daca utilizatorul nu face parte din categoria de utilizatori autorizata, este redirectionat catre homepage

  return isAuthorized;
  // Daca utilizatorul face parte din categoria de utilizatori autorizati, has-role.guard.ts returneaza true si astfel request-ul trece mai departe in ruta din app-routing.module.ts
};
