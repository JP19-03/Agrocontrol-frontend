import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {LastActivityCardComponent} from "../../components/last-activity-card/last-activity-card.component";


@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [
    LastActivityCardComponent
  ],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.css'
})
export class HomeViewComponent implements OnInit{
  fieldName: string | null = '';
  agriculturalProcessId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.getFieldNameFromLS();
    this.getAgriculturalProcessId();
  }

  getAgriculturalProcessId() {
    this.route.params.subscribe(params => {
      this.agriculturalProcessId = params['id'];
      console.log(this.agriculturalProcessId);
    });
  }

  getFieldNameFromLS() {
    this.fieldName = localStorage.getItem('fieldName');
    console.log(this.fieldName);
  }
}
