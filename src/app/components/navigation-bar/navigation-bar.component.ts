import { Component } from '@angular/core';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { MatIconRegistry} from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser';
//need to import this for the dropdown
import { NgbDropdown} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent {
  faHouse=faHouse;
  //creates custom icons in  material -- not working as of now
  title ='custom icon';
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ){
    this.matIconRegistry.addSvgIcon(
      'house',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../house.svg')
    )

  }
}
