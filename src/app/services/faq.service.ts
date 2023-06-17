import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FaqContent } from '../models/faq'; 

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) {
  }
    getFaqContent() {
      return this.http.get('http://localhost:4000/articles') as Observable<FaqContent[]>
    }
  
    getFaqContentById(id: number) {
      return this.http.get(`http://localhost:4000/articles/${id}`) as Observable<FaqContent>
    }
  
    addFaqContent(postObject: FaqContent) {
      return this.http.post('http://localhost:4000/articles', postObject) as Observable<FaqContent>
    }
  
    updateFaqContent(postObject: FaqContent) {
      return this.http.put(`http://localhost:4000/articles/${postObject.id}`, postObject) as Observable<FaqContent>
    }
  
    deleteFaqContent(id: number) {
      return this.http.delete(`http://localhost:4000/articles/${id}`) as Observable<{}>
    }

   
}
