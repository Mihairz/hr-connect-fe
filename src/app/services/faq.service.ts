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
    return this.http.get<FaqContent[]>('http://localhost:4100/faqs-json').pipe(
      map((faqs: FaqContent[]) => faqs.sort((a, b) => a.order - b.order))
    ) as Observable<FaqContent[]> ; 
  }
  
    getFaqContentByOrder(order: number) {
      return this.http.get(`http://localhost:4100/faqs-json/${order}`) as Observable<FaqContent>
    }
  
    addFaqContent(postObject: FaqContent) {
      return this.http.post('http://localhost:4100/faqs-json', postObject) as Observable<FaqContent>
    }
  
    updateFaqContent(postObject: FaqContent) {
      return this.http.put(`http://localhost:4100/faqs-json/${postObject.id}`, postObject) as Observable<FaqContent>
    }
  
    deleteFaqContent(id: number) {
      return this.http.delete(`http://localhost:4100/faqs-json/${id}`) as Observable<{}>
    }

   
}
