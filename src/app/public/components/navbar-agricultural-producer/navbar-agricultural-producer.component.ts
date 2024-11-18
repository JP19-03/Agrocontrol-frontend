import {Component, EventEmitter, Output} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {LanguageSwitcherComponent} from "../language-switcher/language-switcher.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar-agricultural-producer',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatToolbarModule, MatButtonModule, LanguageSwitcherComponent, RouterLink],
  templateUrl: './navbar-agricultural-producer.component.html',
  styleUrl: './navbar-agricultural-producer.component.css'
})
export class NavbarAgriculturalProducerComponent {
  // Emite un evento cuando se hace clic en el botón del menú
  @Output() toggleSidenav = new EventEmitter<void>();
  userId!: number;

  constructor() {
    const id = localStorage.getItem('userId');
    if (id) {
      this.userId = parseInt(id);
    }
  }

  // Función que emite el evento para alternar el sidenav
  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
}
