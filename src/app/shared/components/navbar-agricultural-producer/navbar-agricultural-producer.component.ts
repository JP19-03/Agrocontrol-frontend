import {Component, EventEmitter, Output} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-navbar-agricultural-producer',
  standalone: true,
  imports: [MatSidenavModule,MatIconModule, MatToolbarModule,MatButtonModule],
  templateUrl: './navbar-agricultural-producer.component.html',
  styleUrl: './navbar-agricultural-producer.component.css'
})
export class NavbarAgriculturalProducerComponent {
  // Emite un evento cuando se hace clic en el botón del menú
  @Output() toggleSidenav = new EventEmitter<void>();

  // Función que emite el evento para alternar el sidenav
  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
}
