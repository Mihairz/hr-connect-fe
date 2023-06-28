import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestUser } from 'src/app/models/request-user';
import { User } from 'src/app/models/user';
import { RequestHrService } from 'src/app/services/request-hr.service';

@Component({
  selector: 'app-request-details-modal',
  templateUrl: './request-details-modal.component.html',
  styleUrls: ['./request-details-modal.component.css']
})
export class RequestDetailsModalComponent {

  @Output() newCloseModalEvent = new EventEmitter<string>();
  @Output() newGetRequestsEvent = new EventEmitter<string>(); // Creem un eveniment nou care va fi transmis componentei parinte (output)
  @Input() editedRequest: RequestUser = new RequestUser();
  @Input() userRole?: string;

  denyRequestSubscription: Subscription = new Subscription();
  approveRequestSubscription: Subscription = new Subscription();


  particlesScriptElement: HTMLScriptElement;
  particlesSettingsScriptElement: HTMLScriptElement;
  particlesHostingElement: HTMLScriptElement;

  constructor(private requestHrService: RequestHrService) {
    // adaugam in mod dinamic fisierul ce contine logica pentru fundalul animat, particle.js (din folder-ul assets al angular) la HTML-ul componentei
    this.particlesScriptElement = document.createElement("script");
    this.particlesScriptElement.src = "assets/particles.js";
    document.body.appendChild(this.particlesScriptElement);

    // adaugam in mod dinamic fisierul ce contine setarile pentru fundalul animat, particle.js (din folder-ul assets al angular) la HTML-ul componentei
    this.particlesSettingsScriptElement = document.createElement("script");
    this.particlesSettingsScriptElement.src = "assets/particles-settings.js";
    document.body.appendChild(this.particlesSettingsScriptElement);

    // adaugam in mod dinamic elementul ce contine scriptul pentru hostingul? fundalului animat
    this.particlesHostingElement = document.createElement("script");
    this.particlesHostingElement.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
    document.body.appendChild(this.particlesHostingElement);
  }

  // Perioada de concediu este stocata yyyy-mm-dd_yyyy-mm-dd, aceasta functie este folosita pentru a transforma perioada de concediu  in formatul cu care suntem obisnuiti dd/mm/yyyy - dd/mm/yyyy in momentul afisarii
  formatPeriod(dateString?: string): string {
    if (dateString){
      const parts = dateString.split('_');
      const startDateParts = parts[0].split('-');
      const endDateParts = parts[1].split('-');
  
      const formattedStartDate = startDateParts.reverse().join('.');
      const formattedEndDate = endDateParts.reverse().join('.');
  
      return `${formattedStartDate}-${formattedEndDate}`;
    }
    return '';
  }

  // Datele calendaristice sunt stocate in baza de date sub forma yyyy-mm-dd, aceasta functie este folosita pentru a le transforma in formatul dd-mm-yyyy in momentul afisarii
  formatDate(date?: Date){
    return date?.toString().split('-').reverse().join('-');
  }
  

  closeModal() {
    this.newCloseModalEvent.emit();
    // Functia closeModal() va emite un eveniment pe nume newCloseModalEvent ce va fi receptionat de catre componenta parinte si va inchide modala
  }



  // apeleaza functia deleteRequest() din serviciul RequestUser injectat iar apoi emite evenimentul newGetUsersEvent catre componenta parinte
  denyRequest() {
    this.denyRequestSubscription = this.requestHrService.denyRequest(this.editedRequest.id).subscribe((response) => {
      this.newGetRequestsEvent.emit();
      this.closeModal();
    })
  }

  // apeleaza functia deleteRequest() din serviciul RequestUser injectat iar apoi emite evenimentul newGetUsersEvent catre componenta parinte
  approveRequest() {
    console.log('APPROVE REQUEST');
    this.approveRequestSubscription = this.requestHrService.approveRequest(this.editedRequest.id).subscribe((response) => {
      this.newGetRequestsEvent.emit();
      this.closeModal();
    })
  }
}
