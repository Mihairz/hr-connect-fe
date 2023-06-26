import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { RequestUser } from '../models/request-user';

@Injectable({
  providedIn: 'root'
})
export class RequestHrService{
  constructor(private http: HttpClient) { }

  getRequests(): Observable<RequestUser[]> {
    return this.http.get<RequestUser[]>('http://localhost:8082/request/allRequests');
  }

  deleteRequest(id?: number): Observable<{}> {
    return this.http.delete(`http://localhost:8082/request?id=${id}`, {}) as Observable<{}>
  }
}
