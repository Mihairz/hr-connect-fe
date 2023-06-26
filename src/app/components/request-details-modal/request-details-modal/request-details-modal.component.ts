import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { RequestUser } from 'src/app/models/request-user';
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

  denyRequestSubscription: Subscription = new Subscription();
  approveRequestSubscription: Subscription = new Subscription();


  particlesScriptElement: HTMLScriptElement;
  particlesSettingsScriptElement: HTMLScriptElement;
  particlesHostingElement: HTMLScriptElement;

  constructor(private requestHrService: RequestHrService){
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

  closeModal() {
    this.newCloseModalEvent.emit();
    // Functia closeModal() va emite un eveniment pe nume newCloseModalEvent ce va fi receptionat de catre componenta parinte si va inchide modala
  }

  

  // apeleaza functia deleteRequest() din serviciul RequestUser injectat iar apoi emite evenimentul newGetUsersEvent catre componenta parinte
  denyRequest() {
    this.denyRequestSubscription = this.requestHrService.denyRequest(this.editedRequest.id).subscribe((response) => { 
      this.newGetRequestsEvent.emit();
    })
  }

  // apeleaza functia deleteRequest() din serviciul RequestUser injectat iar apoi emite evenimentul newGetUsersEvent catre componenta parinte
  approveRequest() {
    this.approveRequestSubscription = this.requestHrService.approveRequest(this.editedRequest.id).subscribe((response) => { 
      this.newGetRequestsEvent.emit();
    })
  }
}
 