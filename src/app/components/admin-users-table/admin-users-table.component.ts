import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users-table',
  templateUrl: './admin-users-table.component.html',
  styleUrls: ['./admin-users-table.component.css'],
})

export class AdminUsersTableComponent implements OnInit, OnDestroy {
  // tableScriptElement: HTMLScriptElement;
  constructor(private userService: UserService) {
    // this.tableScriptElement = document.createElement("script");
    // this.tableScriptElement.src = "assets/users-table.js";
    // document.body.appendChild(this.tableScriptElement);
  }

  userSubscription: Subscription = new Subscription();
  userList: User[] = []; // Initializam o lista goala care contine obiecte de tip User. Aceasta va fi populata la ngOnInit cu ajutorul metodei getUsers()
  columnsToDisplay = ['id', 'department', 'team', 'role', 'name', 'email', 'phone', 'action'];

  // @ViewChild('paginator') paginator!: MatPaginator;
  // dataSource = new MatTableDataSource<User>(this.userList);
  // ngAfterViewInit() {
  //   this.dataSource = new MatTableDataSource(this.userList);
  //   this.dataSource.paginator=this.paginator;
  // }

  isLoading = false;
  isModalOpen = false; // Formularul de adaugare utilizatori noi este prestabilit ascuns




  ngOnInit(): void {
    // console.log('Admin homepage has been initialized');
    this.getUsers();
  }

  // apeleaza functia getUsers() din serviciul user injectat si populeaza lista existenta
  getUsers() {
    this.isLoading = true; // am setat isLoading pe true la inceputul unui proces care poate dura mai mult

    this.userSubscription =
      this.userService.getUsers().subscribe((responseUserList) => {
        // console.log(responseUserList);
        this.userList = responseUserList;
        this.isLoading = false; // doar dupa ce se vor finaliza intructiunile time consuming variabila isLoading va fi setata inapoi pe false
      })
  }

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }



  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
