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

import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewsletterPageComponent } from './pages/newsletter-page/newsletter-page.component';
import { NewsletterArticleComponent } from './components/newsletter-article/newsletter-article.component';
import { MatDialogModule } from '@angular/material/dialog';
import { AddArticleModalComponent } from './components/add-article-modal/add-article-modal.component';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    AdminHomePageComponent,
    UserComponent,
    AddUserModalComponent,
    LoginModuleComponent, 
    AdminUsersTableComponent, 
    NewsletterPageComponent, NewsletterArticleComponent, AddArticleModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule, 
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
