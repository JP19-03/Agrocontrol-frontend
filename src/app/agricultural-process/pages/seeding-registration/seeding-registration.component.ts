import {Component} from '@angular/core';
import {SeedingFormComponent} from "../../components/seeding-form/seeding-form.component";

@Component({
  selector: 'app-seeding-registration',
  standalone: true,
  imports: [
    SeedingFormComponent
  ],
  templateUrl: './seeding-registration.component.html',
  styleUrl: './seeding-registration.component.css'
})
export class SeedingRegistrationComponent {

}
