import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackFormService {

  constructor(private http: HttpClient) { }
  getFeedback() {
    return this.http.get('http://localhost:4300/feedbacks') as Observable<Feedback[]>
  }

  getFeedbackById(id: number) {
    return this.http.get(`http://localhost:4300/feedbacks/${id}`) as Observable<Feedback>
  }

  addFeedback(postObject: Feedback) {
    return this.http.post('http://localhost:4300/feedbacks', postObject) as Observable<Feedback>
  }

  updateFeedback(postObject: Feedback) {
    return this.http.put(`http://localhost:4300/feedbacks/${postObject.id}`, postObject) as Observable<Feedback>
  }

  deleteFeedback(id: number) {
    return this.http.delete(`http://localhost:4300/feedbacks/${id}`) as Observable<{}>
  }
  
}
