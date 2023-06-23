import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRequest } from '../models/userRequest';


@Injectable({
  providedIn: 'root'
})
export class UserRequestService {

  constructor(private http: HttpClient) {}

  getUserRequests(): Observable<UserRequest[]> {
    return this.http.get<UserRequest[]>('http://localhost:3100/requests');
  }

  getUserRequestById(id: number): Observable<UserRequest> {
    return this.http.get<UserRequest>(`http://localhost:3100/requests/${id}`);
  }

  addUserRequest(userRequest: UserRequest): Observable<UserRequest> {
    return this.http.post<UserRequest>('http://localhost:3100/requests', userRequest);
    // functia primeste ca parametru un obiect de tip userRequest
  }

  updateUserRequest(userRequest: UserRequest): Observable<UserRequest> {
    return this.http.put<UserRequest>(`http://localhost:3100/requests/${userRequest.id}`, userRequest);
  }

  deleteUserRequest(id: number): Observable<{}> {
    return this.http.delete<{}>(`http://localhost:3100/requests/${id}`);
    // transmitem prin URL id-ul userRequest-ului ce va fi eliminat
  }
}
