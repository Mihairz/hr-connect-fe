import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';

import { isAuthenticatedGuard } from './guards/is-authenticated.guard';
// Verifica daca utilizatorul este autentificat in functie de prezenta sau absenta unui token. Daca nu este logat, este redirectionat catre pagina de login.
// Se aplica ca si proprietate canActivate la rutele paginilor ce nu vrem sa fie accesibile de utilizatorii nelogati.
import { hasRoleGuard } from './guards/has-role.guard';
// Verifica daca utilizatorul autentificat face parte din categoria de utilizatori admisi pentru o pagina, in functie de prezenta sau absenta unei proprietati pe nume 'role' din token-ul jwt. Daca nu este autorizat, este redirectionat catre pagina de login.
// Se aplica ca si proprietate canActivate + proprietate 'data:{role:'admin'} la rutele paginilor ce nu vrem sa fie accesibile de utilizatorii neautorizati.

const routes: Routes = [
  { path: '', component: LoginPageComponent }, // to implement homepage component
  { path: 'login', component: LoginPageComponent }, // pagina de login este accesibila tuturor
  {
    path: 'admin', component: AdminHomePageComponent,
    canActivate: [isAuthenticatedGuard, hasRoleGuard], // pagina de admin este accesibila doar de catre utilizatorii logati
    data: {role: 'admin'}, // care au rol de admin (identificat din jwt)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
