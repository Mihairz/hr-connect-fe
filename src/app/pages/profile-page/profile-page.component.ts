import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent {
  @Output() title = "test???";
  @Output() ceva = ["La birou", "In concediu"]
  @Output() valori = [420, 69]
}
