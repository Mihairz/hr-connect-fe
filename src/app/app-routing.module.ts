import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'admin', component: AdminHomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
