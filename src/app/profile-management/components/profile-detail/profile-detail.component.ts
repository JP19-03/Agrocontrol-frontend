import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.css'
})
export class ProfileDetailComponent {

  farmer = {
    fullName: 'Farmer Name',
    city: 'City',
    country: 'Country',
    phone: '123-456-7890',
    dni: '12345678'
  };

  distributor = {
    fullName: 'Distributor Name',
    city: 'City',
    country: 'Country',
    phone: '098-765-4321',
    companyName: 'Company Name',
    ruc: '12345678901'
  };
}
