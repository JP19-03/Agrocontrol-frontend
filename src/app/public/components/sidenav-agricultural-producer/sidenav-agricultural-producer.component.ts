import {Component, inject, Input} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../profile-management/services/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sidenav-agricultural-producer',
  standalone: true,
  imports: [MatIconModule, RouterLink, NgIf],
  templateUrl: './sidenav-agricultural-producer.component.html',
  styleUrl: './sidenav-agricultural-producer.component.css'
})
export class SidenavAgriculturalProducerComponent {
   @Input() role: string = 'producer';

  private router = inject(Router);
  private authService: AuthService = inject(AuthService);
  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}
