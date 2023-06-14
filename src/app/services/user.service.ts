import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

// Acest serviciu tine locul API-ului de backend

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



  // Am folosit un JWT Token fals, acesta il vom inlocuii cu cel generat real in momentul implementarii backend-ului
  FAKE_JWT_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJDb2RlIFNob3RzIFdpdGggUHJvZmFuaXMiLCJpYXQiOjE2MjQyNzU1MjUsImV4cCI6MTY1NTgxMTUyNSwiYXVkIjoiQ29kZSBTaG90IFdpdGggUHJvZmFuaXMgU3Vic2NyaWJlcnMiLCJzdWIiOiJDb2RlIFNob3QgV2l0aCBQcm9mYW5pcyBTdWJzY3JpYmVycyIsIlVzZXJuYW1lIjoicHJvZmFuaXMiLCJGaXJzdE5hbWUiOiJGYW5pcyIsIlJvbGUiOlsiQWRtaW4iLCJTdXBlciBBZG1pbiJdfQ.mT1UD7DXTWRm4etsW9BuWcg5bj2CaeAQVXaoEOIwB7o';

  login(email:any,password:any){
    const token = this.FAKE_JWT_TOKEN;
    // La momentul actual functia de login este un request de tip post la server, care transmite e-mail,password si token, astfel incat response-ul sa fie un JSON cu cele 3, cu scopul ca noi sa preluam token-ul din response.
    return this.http.post('http://localhost:3000/users', { email, password,token});
  }
}
 