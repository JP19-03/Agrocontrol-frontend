import {Component, inject, Input, OnInit} from '@angular/core';
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
export class SidenavAgriculturalProducerComponent implements OnInit{
   @Input() role: string = 'producer';
   agriculturalProcessId!: number;

  private router = inject(Router);
  private authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    const id = localStorage.getItem('agriculturalProcessId');
    if (id) {
      this.agriculturalProcessId = parseInt(id);
    }
  }

  logOut(): void {
    this.authService.logOut();
    localStorage.clear();
    this.router.navigate(['/login']); // Redirige a la página de login
  }

  goToHome() {
    this.router.navigate([`home-agricultural-process/${this.agriculturalProcessId}`]);
  }
}
