import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

// Acest serviciu este folosit pentru a realiza crud requests de pe pagina de administrator

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/users');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>('http://localhost:3000/users', user);
     // functia primeste ca parametru un obiect de tip User
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:3000/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<{}> {
    return this.http.delete<{}>(`http://localhost:3000/users/${id}`);
    // transmitem prin URL id-ul user-ului ce va fi eliminat
  }
}
