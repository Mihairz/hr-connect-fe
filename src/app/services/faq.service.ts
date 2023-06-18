import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FaqContent } from '../models/faq'; 
//we need this to map the order of the faqs
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaqService {

  constructor(private http: HttpClient) {
  }
  getFaqContent(): Observable<FaqContent[]> {
    return this.http.get<FaqContent[]>('http://localhost:3100/faq').pipe(
      map((faqs: FaqContent[]) => faqs.sort((a, b) => a.order - b.order))
    );
  }
  
    getFaqContentByOrder(order: number) {
      return this.http.get(`http://localhost:3100/faq/${order}`) as Observable<FaqContent>
    }
  
    addFaqContent(postObject: FaqContent) {
      return this.http.post('http://localhost:3100/faq', postObject) as Observable<FaqContent>
    }
  
    updateFaqContent(postObject: FaqContent) {
      return this.http.put(`http://localhost:3100/faq/${postObject.id}`, postObject) as Observable<FaqContent>
    }
  
    deleteFaqContent(id: number) {
      return this.http.delete(`http://localhost:3100/faq/${id}`) as Observable<{}>
    }

   
}
