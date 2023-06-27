import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    // const headers = new HttpHeaders();
    //   headers.set('Access-Control-Allow-Origin', 'application/json; charset=utf-8');
    return this.http.get('http://localhost:8082/article/all') as Observable<NewsletterArticle[]>
  }

  getNewsletterArticleById(id: number) {
    return this.http.get(`http://localhost:8082/article/get-article?id=${id}`) as Observable<NewsletterArticle>
  }

  addNewsletterArticle(postObject: NewsletterArticle) {
    return this.http.post('http://localhost:8082/article', postObject) as Observable<NewsletterArticle>
  }

  // updateNewsletterArticle(postObject: NewsletterArticle) {
  //   return this.http.put(`http://localhost:4000/articles/${postObject.id}`, postObject) as Observable<NewsletterArticle>
  // }
  updateNewsletterArticle(postObject: NewsletterArticle) {
    return this.http.post('http://localhost:8082/article', postObject) as Observable<NewsletterArticle>
  }

  deleteNewsletterArticle(id: number) {
    const headers = new HttpHeaders();
      headers.set('Access-Control-Allow-Origin', 'application/json; charset=utf-8');
      return this.http.delete(`http://localhost:8082/article?id=${id}`, {}) as Observable<{}>
  }
}
