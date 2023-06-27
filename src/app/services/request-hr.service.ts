import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { RequestUser } from '../models/request-user';

@Injectable({
  providedIn: 'root'
})
export class RequestHrService{
  constructor(private http: HttpClient) { }

  getAllRequests(): Observable<RequestUser[]> {
    return this.http.get<RequestUser[]>('http://localhost:8082/request/allRequests');
  }

  getAllPendingRequests(): Observable<RequestUser[]> {
    return this.http.get<RequestUser[]>('http://localhost:8082/request/allInPendingRequests');
  }

  denyRequest(id?: number): Observable<any> {
    return this.http.delete(`http://localhost:8082/request/respond-to-request?requestId=${id}&status=false`);  
  }

  approveRequest(id?: number): Observable<any> {
    return this.http.delete(`http://localhost:8082/request/respond-to-request?requestId=${id}&status=true`); 
  }

  addRequest(type:string,details:string): Observable<RequestUser>{
    return this.http.put<RequestUser>('http://localhost:8082/request/add',{type,details});
  }

}
