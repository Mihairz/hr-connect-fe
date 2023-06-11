import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users-table',
  templateUrl: './admin-users-table.component.html',
  styleUrls: ['./admin-users-table.component.css'],
})

export class AdminUsersTableComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(private userService: UserService) { }

  userSubscription: Subscription = new Subscription();



  // SETARI TABEL 
  // userList: User[] = [];  Initializam o lista goala care contine obiecte de tip User. Aceasta va fi populata la ngOnInit cu ajutorul metodei getUsers()
  dataSource = new MatTableDataSource<User>([]); // Initializam o lista goala care contine obiecte de tip User, sub forma MatTableDataSource ca sa poata fi paginabila si filtrabila de catre angular-material

  columnsToDisplay = ['id', 'department', 'team', 'role', 'name', 'email', 'phone', 'action']; // Aici se specifica elementului html mat-table ce coloane din typescript sa se afiseze

  @ViewChild(MatPaginator) paginator: any = MatPaginator; // Initializeaza paginator-ul din angular material

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    setTimeout(() => this.dataSource.paginator = this.paginator, 40);
  }




  isLoading = false; // pentru a astepta incarcarea paginii, adica pentru a astepta pana cand se incarca toti utilizatorii
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
        // this.userList = responseUserList;

        this.dataSource = new MatTableDataSource(responseUserList); // atribuim rezultatul request-ului listei ce va fi afisata in mat-table

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