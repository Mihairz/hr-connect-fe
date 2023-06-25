import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestHrService } from 'src/app/services/request-hr.service';
import { RequestUser } from 'src/app/models/request-user';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-requests-hr',
  templateUrl: './requests-hr.component.html',
  styleUrls: ['./requests-hr.component.css']
})
export class RequestsHrComponent implements OnInit, OnDestroy{

  constructor(private requestHrService: RequestHrService, private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private router: Router){}

  requestSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getRequests();
  }



  // SETARI TABEL 
  dataSource = new MatTableDataSource<RequestUser>([]); // Initializam o lista goala care contine obiecte de tip RequestUser, sub forma MatTableDataSource ca sa poata fi paginabila si filtrabila de catre angular-material

  columnsToDisplay = ['id','requestType','department', 'lastName', 'email','status','requestDate','finishDate','action']; // Aici se specifica elementului html mat-table ce coloane din typescript sa se afiseze

  // Am intampinat o problema pentru ca paginator-ul se incarca inaintea datelor si astfel era undefined (din cate am inteles). Am gasit solutii aici https://stackoverflow.com/questions/48785965/angular-matpaginator-doesnt-get-initialized

  @ViewChild(MatPaginator, { static: false })
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }
  @ViewChild(MatSort, { static: false })
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }
  searchControl = new FormControl('', [Validators.pattern(/^[a-zA-Z0-9\s]*$/)]); // Make search bar accept only alphanumeric 
  applyFilter(event: Event) {
    if (this.searchControl.hasError('pattern')){
      return; // if user inputs special characters into searchbar, applyFilter does not reach dataSource / page doesn't reload / nothing is searched
    } else{ 
      const filterValue = (event.target as HTMLInputElement).value; // user input
      this.dataSource.filter = filterValue.trim().toLowerCase(); // toLowerCase because that's how mat-table filter algorithm functions
      // Angular automatically sanitizes the input provided by users when using data binding or property binding. Therefore, when we bind the filterValue to the this.dataSource.filter, it is automatically sanitized.
    }
  }








  isLoading = false; // pentru a astepta incarcarea paginii, adica pentru a astepta pana cand se incarca toti utilizatorii
  editedRequest = new RequestUser();
  isModalOpen = false; // Formularul de vizulizare detalii cerere este prestabilit ascuns
  // modalType = "";
  // modalRole = "hr";

  // apeleaza functia getUsers() din serviciul user injectat si populeaza lista existenta
  getRequests() {
    this.isLoading = true; // am setat isLoading pe true la inceputul unui proces care poate dura mai mult

    this.requestSubscription =
      this.requestHrService.getRequests().subscribe((responseRequestsList) => {
        // console.log(responseRequestsList);

        this.dataSource = new MatTableDataSource(responseRequestsList); // atribuim rezultatul request-ului listei ce va fi afisata in mat-table

        this.isLoading = false; // doar dupa ce se vor finaliza intructiunile time consuming variabila isLoading va fi setata inapoi pe false
      });
  }






  body: any = document.querySelector("body");

  openModal() {
    this.isModalOpen = true;
    this.body.style.overflow = "hidden";
  }
  closeModal() {
    this.isModalOpen = false;
    this.body.style.overflow = "auto";
    this.editedRequest = new RequestUser();
    // this.modalType = '';
  }

  // editUser(user: User) {
  //   this.modalType = 'editModalType'
  //   this.editedUser = user;
  //   this.openModal();
  // }

  viewDetails(requestUser: RequestUser){
    // this.modalType
    this.editedRequest = requestUser;
    this.openModal();

    console.log('view details reached');
    console.log("edited request: "+this.editedRequest.requester?.firstName+" "+this.editedRequest.status)
  }

  ngOnDestroy(): void {
    this.requestSubscription.unsubscribe();
  }





}
