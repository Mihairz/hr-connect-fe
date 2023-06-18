import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewsletterArticle } from '../models/newsletter-article';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient) {
  }

  getNewsletterArticles() {
    return this.http.get('http://localhost:4000/articles') as Observable<NewsletterArticle[]>
  }

  getNewsletterArticleById(id: number) {
    return this.http.get(`http://localhost:4000/articles/${id}`) as Observable<NewsletterArticle>
  }

  addNewsletterArticle(postObject: NewsletterArticle) {
    return this.http.post('http://localhost:4000/articles', postObject) as Observable<NewsletterArticle>
  }

  updateNewsletterArticle(postObject: NewsletterArticle) {
    return this.http.put(`http://localhost:4000/articles/${postObject.id}`, postObject) as Observable<NewsletterArticle>
  }

  deleteNewsletterArticle(id: number) {
    return this.http.delete(`http://localhost:4000/articles/${id}`) as Observable<{}>
  }
}
