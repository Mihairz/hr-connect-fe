import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.get<FaqContent[]>('http://localhost:8082/faq').pipe(
      map((faqs: FaqContent[]) => faqs.sort((a, b) => a.orderNumber - b.orderNumber))
    ) as Observable<FaqContent[]>;
  }

  getFaqContentByOrder(order: number) {
    return this.http.get(`http://localhost:8082/faq/${order}`) as Observable<FaqContent>
  }

  addFaqContent(postObject: FaqContent) {
    return this.http.post('http://localhost:8082/faq', postObject) as Observable<FaqContent>
  }

  // updateFaqContent(postObject: FaqContent) {
  //   return this.http.put(`http://localhost:8082/faq/${postObject.id}`, postObject) as Observable<FaqContent>
  // } 




  uploadPDF(pdf: File, id: number): Observable<FaqContent> {
    const formData = new FormData();
    formData.append('file', pdf, pdf.name);
    formData.append('id', id.toString());


    //afiseaza body ul request-ului
    console.log('UPLOAD COVER IMAGE BODY: ');
    const result: { [key: string]: string | number | File } = {};
    formData.forEach((value, key) => {
      if (value instanceof File) {
        result[key] = value;
      } else {
        result[key] = key === 'image' ? +value : value;
      }
    });
    console.log(result);


    return this.http.post<FaqContent>('http://localhost:8082/faq/upload-file', formData);
  }

  // getCoverImage(id: number): Observable<Blob> {
  //   return this.http.get(`http://localhost:8082/article/get-image?id=${id}`, { responseType: 'blob' });
  // }

  getCoverImage(id: number): Observable<Blob> {
    return this.http.get(`http://localhost:8082/article/get-image?id=${id}`, { responseType: 'blob' });
  }








  updateFaqContent(postObject: FaqContent) {
    return this.http.post(`http://localhost:8082/faq`, postObject) as Observable<FaqContent>
  }

  deleteFaqContent(id: number) {
    //Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0YWRtQGVtYWlsLnJvIiwicm9sZSI6ImFkbWluIiwiZXhwIjoxNjg3NTEzNzgyLCJpYXQiOjE2ODc1MDc3ODJ9.5R6d4y1_ZG_cudFojLYVV29kcDrETLKkFznq7lsHBzo
    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', 'application/json; charset=utf-8');
    return this.http.delete(`http://localhost:8082/faq?id=${id}`, {}) as Observable<{}>
  }


}
