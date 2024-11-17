import {Component, HostListener} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {
    NavbarAgriculturalProducerComponent
} from "../../components/navbar-agricultural-producer/navbar-agricultural-producer.component";
import {Event, RouterOutlet} from "@angular/router";
import {
    SidenavAgriculturalProducerComponent
} from "../../components/sidenav-agricultural-producer/sidenav-agricultural-producer.component";

@Component({
  selector: 'app-home-distributor',
  standalone: true,
    imports: [
        MatDrawer,
        MatDrawerContainer,
        MatDrawerContent,
        NavbarAgriculturalProducerComponent,
        RouterOutlet,
        SidenavAgriculturalProducerComponent
    ],
  templateUrl: './home-distributor.component.html',
  styleUrl: './home-distributor.component.css'
})
export class HomeDistributorComponent {
  isSidenavOpened = true;

  constructor() {
    this.isSidenavOpened = window.innerWidth > 768; // Verifica el tamaño inicial
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isSidenavOpened = window.innerWidth > 768; // Actualiza según el tamaño de la ventana
  }

  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened; // Alternar el estado del sidenav
  }
}
