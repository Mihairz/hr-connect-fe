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


  uploadCoverImage(image: File): Observable<NewsletterArticle> {
    const formData = new FormData();
    formData.append('image', image, image.name);


    // // afiseaza body ul request-ului
    // const result: { [key: string]: string | number | File } = {};
    // formData.forEach((value, key) => {
    //   if (value instanceof File) {
    //     result[key] = value;
    //   } else {
    //     result[key] = key === 'image' ? +value : value;
    //   }
    // });
    // console.log(result);


    return this.http.post<NewsletterArticle>('http://localhost:8082/article/upload-image', formData);
  }

  
  updateNewsletterArticle(postObject: NewsletterArticle) {
    return this.http.post('http://localhost:8082/article', postObject) as Observable<NewsletterArticle>
  }

  deleteNewsletterArticle(id: number) {
    const headers = new HttpHeaders();
      headers.set('Access-Control-Allow-Origin', 'application/json; charset=utf-8');
      return this.http.delete(`http://localhost:8082/article?id=${id}`, {}) as Observable<{}>
  }
}
