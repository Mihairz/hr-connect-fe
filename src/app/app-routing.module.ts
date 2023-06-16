import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';

import { isAuthenticatedGuard } from './guards/is-authenticated.guard';
// Verifica daca utilizatorul este autentificat in functie de prezenta sau absenta unui token. Daca nu este logat, este redirectionat catre pagina de login.
// Se aplica ca si proprietate canActivate la rutele paginilor ce nu vrem sa fie accesibile de utilizatorii nelogati.

import { hasRoleGuard } from './guards/has-role.guard';
// Se foloseste pentru a bloca sau permite accesul la diferite rute in functie de rolul utilizatorilor logati
// Verifica daca utilizatorul autentificat face parte din categoria de utilizatori admisi pentru o pagina, in functie de prezenta sau absenta unei proprietati pe nume 'role' din token-ul jwt. Daca nu este autorizat, este redirectionat catre pagina de login.
// Se aplica ca si proprietate canActivate + proprietate 'data:{role:'admin/employee/hr'} la rutele paginilor ce nu vrem sa fie accesibile de utilizatorii neautorizati.

import { NewsfeedMihaiComponent } from './pages/newsfeed-mihai/newsfeed-mihai.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

import { isNotAuthenticatedGuard } from './guards/is-not-authenticated.guard';
// Se foloseste pentru a bloca accesul la diferite rute utilizatorilor logati / Se atribuie rutelor destinate exclusiv utilizatorilor nelogati (ex. login-page)


const routes: Routes = [
  { path: '', component: LoginPageComponent }, // to implement homepage component
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [isNotAuthenticatedGuard] // pagina de login este accesibila doar utilizatorilor nelogati
  }, 
  {
    path: 'admin', component: AdminHomePageComponent,
    canActivate: [isAuthenticatedGuard, hasRoleGuard], // pagina de admin este accesibila doar de catre utilizatorii logati
    data: { roles: ['admin'] }, // care au rol de admin (identificat din jwt)
  },
  {
    path: 'newsfeed', component: NewsfeedMihaiComponent,
    canActivate: [isAuthenticatedGuard, hasRoleGuard], // pagina de admin este accesibila doar de catre utilizatorii logati
    data: { roles: ['employee', 'hr'] }  // care au rol de employee sau hr (identificat din jwt)
  },
  {
    path: 'profile', component: ProfilePageComponent,
    canActivate: [isAuthenticatedGuard] // pagina de profile este accesibila doar utilizatorilor logati
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
