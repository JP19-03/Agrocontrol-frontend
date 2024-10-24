import { Component, inject } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user.entity";
import {RegisterFormComponent} from "../../components/register-form/register-form.component";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    RegisterFormComponent
  ],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  private _authService: AuthService = inject(AuthService);

  // Registro de usuario basado en el rol del usuario
  public singUpUser(user: User) {
    const role = user.roles[0];

    if (role === 'agricultural producer') {
      this._singUpAgriculturalProducer(user);
    } else if (role === 'distributor') {
      this._singUpDistributor(user);
    } else {
      console.error('Invalid role selected');
    }
  }
  // Registro de Productor Agrícola
  private _singUpAgriculturalProducer(user: User) {
    const agriculturalProducer: User = new User({
      email: user.email,
      password: user.password,
      fullName: user.fullName,
      city: user.city,
      country: user.country,
      phone: user.phone,
      dni: user.dni
    });

    this._authService.createAgriculturalProducer(agriculturalProducer).subscribe({
      next: (response) => console.log('Agricultural Producer registered successfully:', response),
      error: (error) => console.error('Error registering Agricultural Producer:', error),
    });
  }

  // Registro de Distribuidor
  private _singUpDistributor(user: User) {
    const distributor: User = new User({
      email: user.email,
      password: user.password,
      fullName: user.fullName,
      city: user.city,
      country: user.country,
      phone: user.phone,
      companyName: user.companyName,
      ruc: user.ruc
    });

    this._authService.createDistributor(distributor).subscribe({
      next: (response) => console.log('Distributor registered successfully:', response),
      error: (error) => console.error('Error registering Distributor:', error),
    });
  }
}
