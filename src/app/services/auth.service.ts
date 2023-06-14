import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  //   The _isLoggedIn$ property is declared as private, which means it can only be accessed within the class itself and not from outside. It is assigned a new instance of the BehaviorSubject class with an initial value of false.
  
  // BehaviorSubject is a type of Observable provided by RxJS that emits the most recent value to its subscribers and also allows you to set an initial value.

  //   The isLoggedIn$ property is declared without the private access modifier, which means it can be accessed from outside the class. It is assigned the result of calling the asObservable() method on the _isLoggedIn$ BehaviorSubject. 
  
  // The asObservable() method returns an Observable that can be subscribed to, but it does not allow direct modification of the underlying BehaviorSubject.

  // By providing the isLoggedIn$ property as an observable, it allows other parts of the codebase to subscribe to changes in the login status. This follows the principle of encapsulation, where the internal state (_isLoggedIn$) is kept private, and a read-only version (isLoggedIn$) is exposed to the outside world.

  // In summary, the code creates a private _isLoggedIn$ BehaviorSubject instance variable with an initial value of false. It also exposes a public isLoggedIn$ property as an observable, derived from the private BehaviorSubject, enabling external code to subscribe to changes in the login status without directly modifying the internal state.

  private readonly TOKEN_NAME = 'hr connect auth';
  // Vom folosii aceasta denumire pentru token-ul ce va fi setat in local storage in momentul login-ului

  get token(){
    return localStorage.getItem(this.TOKEN_NAME);
    // Obtinem valoarea token-ului stocat local storage
  }

  constructor(private userService: UserService) {
    this._isLoggedIn$.next(!!this.token)
    // next = is used to emit values in the context of Observables and Subjects. It allows you to publish values to the subscribers of the Observable or Subject, enabling the propagation of data through the reactive streams.
    // Aplicam asta ca atunci cand dam refresh la pagina, utilizatorii logati sa ramana logati
  }


  login(email: any, password: any) {
    return this.userService.login(email, password).pipe(
      // It appeals the login function from the backend/user-service
      // A pipe is a function or operator that allows us to pass the output of a function as the input of another. 
      // The pipe function is called on the result of userService.login, indicating that some operators will be applied to the resulting observable


      tap((response: any) => {
        // tap operator from the RxJS library to perform a side effect without modifying the emitted values. The tap operator takes a callback function that will be executed for each emitted value. In this case, the callback function takes one parameter response of type any, which represents the response received from the login method.
        localStorage.setItem(this.TOKEN_NAME, response.token);
        // We know that the response will have a property named token. So it's important to keep the name of the variable like this in user-service/backend.
        this._isLoggedIn$.next(true);
        // This line calls the next method on an instance variable _isLoggedIn$ of type Subject<boolean>. It emits the value true, indicating that the user is logged in.
      })
    );


    //  To summarize, the login method calls the userService.login method with the provided email and password parameters. It then performs some side effects using the tap operator, such as storing the received token in the localStorage and emitting a true value to indicate that the user is logged in. The overall result is an observable that can be subscribed to.
  }


} 
