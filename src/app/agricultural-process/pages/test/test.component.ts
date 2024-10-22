import { Component } from '@angular/core';
import {LastActivityCardComponent} from "../../components/last-activity-card/last-activity-card.component";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    LastActivityCardComponent
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

}
