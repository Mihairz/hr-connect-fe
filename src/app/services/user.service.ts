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

  FAKE_JWT_TOKEN_ADMIN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJoci1jb25uZWN0LXRlYW0iLCJpYXQiOjE2MjQyNzU1MjUsImV4cCI6MTY1NTgxMTUyNSwiYXVkIjoiaHItY29ubmVjdCIsInN1YiI6ImhyLWNvbm5lY3QtYWRtaW4tdXNlciIsImRlcGFydG1lbnQiOiIiLCJqb2ItdGl0bGUiOiIiLCJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5kb2VAaHJjb25uZWN0LmNvbSIsInBob25lIjoiMDc4OTk3NjY3NSJ9.q-OrGYqHFoRLVO3d_-wgpu9lnOlO9p_3g6-Rh0-JULM";

  FAKE_JWT_TOKEN_HR = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJoci1jb25uZWN0LXRlYW0iLCJpYXQiOjE2MjQyNzU1MjUsImV4cCI6MTY1NTgxMTUyNSwiYXVkIjoiaHItY29ubmVjdCIsInN1YiI6ImhyLWNvbm5lY3QtaHItdXNlciIsImRlcGFydG1lbnQiOiJQQkciLCJqb2ItdGl0bGUiOiJIZWFkIG9mIEhSIiwicm9sZSI6ImhyIiwibmFtZSI6IkFsaWNlIFdvbmRlcmxhbmQiLCJlbWFpbCI6ImFsaWNld29uZGVybGFuZEBocmNvbm5lY3QuY29tIiwicGhvbmUiOiIwNzY2NTU2NjY0In0.YvsdyHGVV3VHw9IuKeObhWiSh_3k3k4YzKGcEAX_0F4";

  FAKE_JWT_TOKEN_EMPLOYEE = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJoci1jb25uZWN0LXRlYW0iLCJpYXQiOjE2MjQyNzU1MjUsImV4cCI6MTY1NTgxMTUyNSwiYXVkIjoiaHItY29ubmVjdCIsInN1YiI6ImhyLWNvbm5lY3QtaHItdXNlciIsImRlcGFydG1lbnQiOiJQQkciLCJqb2ItdGl0bGUiOiJIZWFkIG9mIEZyb250ZW5kIGRlcGFydG1lbnQiLCJyb2xlIjoiZW1wbG95ZWUiLCJuYW1lIjoiSWJyaWFuIE1paGFpLVJhenZhbiIsImVtYWlsIjoiaWJyaWFubWloYWlyYXp2YW5AaHJjb25uZWN0LmNvbSIsInBob25lIjoiMDczNTQ2ODU0MyJ9.WML5RoWN-AhDuAoXHlkFNsbfnWpToGCl89RQxRmt5Ec";

  login(email:any,password:any){
    const token = this.FAKE_JWT_TOKEN_ADMIN; // aici se schimba atribuirea in functie de ce categorie de utilizatori vrei sa simulezi log in ul
    // La momentul actual functia de login este un request de tip post la server, care transmite e-mail,password si token, astfel incat response-ul sa fie un JSON cu cele 3, cu scopul ca noi sa preluam token-ul din response.
    return this.http.post('http://localhost:3000/users', { email, password,token});
  }
}
 