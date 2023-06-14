import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';

import { isAuthenticatedGuard } from './guards/is-authenticated.guard';
// Verifica daca utilizatorul este autentificat in functie de prezenta sau absenta unui token. Daca nu este logat, este redirectionat catre pagina de login.
// Se aplica ca si proprietate canActivate la rutele paginilor ce nu vrem sa fie accesibile de utilizatorii nelogati.


const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'admin', component: AdminHomePageComponent,
    canActivate: [isAuthenticatedGuard], // pagina de admin este accesibila doar de catre utilizatorii logati
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
