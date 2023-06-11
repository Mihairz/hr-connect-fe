import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

// Aceasta componenta reprezinta fiecare intrare din lista ce va aparea pe pagina administratorului. 
// Este componenta copil a componentei admin-home-page.

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnDestroy{ 

  constructor(private userService:UserService){}; // Injectam serviciul user pentru a putea folosii metodele din acesta (crud http requests in cazul nostru)

  deleteUserSubscription: Subscription = new Subscription();

  @Input() user: User = new User(); // Initializam un obiect User gol care va fi populat de metoda getUsers() a componentei parinte (admin-home-page) (input)
  @Output() newGetUsersEvent = new EventEmitter<string>(); // Creem un eveniment nou care va fi transmis componentei parinte (admin-home-page) (output)

   // apeleaza functia deleteUser() din serviciul user injectat iar apoi emite un eveniment-ul newGetUsersEvent catre componenta parinte
  deleteUser() {
    this.deleteUserSubscription = this.userService.deleteUser(this.user.id || 0).subscribe((response)=>{ // 
      this.newGetUsersEvent.emit();
    })
  }

  ngOnDestroy(): void {
    this.deleteUserSubscription.unsubscribe();
  }

}
