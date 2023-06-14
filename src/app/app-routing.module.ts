import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { NewsletterPageComponent } from './pages/newsletter-page/newsletter-page.component';
import { FullDetailedArticleComponent } from './components/full-detailed-article/full-detailed-article.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'admin', component: AdminHomePageComponent},
  { path: 'article/:id', component: FullDetailedArticleComponent },
  { path: 'newsletter', component: NewsletterPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
