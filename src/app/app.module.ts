import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';

import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './components/user/user.component';
import { AddUserModalComponent } from './components/add-user-modal/add-user-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModuleComponent } from './components/login-module/login-module.component';
import { AdminUsersTableComponent } from './components/admin-users-table/admin-users-table.component';


import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AdminHomePageComponent,
    UserComponent,
    AddUserModalComponent,
    LoginModuleComponent, 
    AdminUsersTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule, 
    MatPaginatorModule,
    MatSortModule,
    BrowserAnimationsModule, 
  ],
  providers: [IsAuthenticatedGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
