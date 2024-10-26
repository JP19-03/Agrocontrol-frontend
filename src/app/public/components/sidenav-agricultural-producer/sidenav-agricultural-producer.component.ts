import {Component, inject} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../../profile-management/services/auth.service";

@Component({
  selector: 'app-sidenav-agricultural-producer',
  standalone: true,
  imports: [MatIconModule, RouterLink],
  templateUrl: './sidenav-agricultural-producer.component.html',
  styleUrl: './sidenav-agricultural-producer.component.css'
})
export class SidenavAgriculturalProducerComponent {
  private router = inject(Router);
  private authService: AuthService = inject(AuthService);
  logOut(): void {
    this.authService.logOut();
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}
