import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {LastActivityCardComponent} from "../../components/last-activity-card/last-activity-card.component";
import {WorkerService} from "../../../fields/services/worker.service";
import {Worker} from "../../../fields/models/worker.entity";
import {WorkersFieldTableComponent} from "../../../fields/components/workers-field-table/workers-field-table.component";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";


@Component({
  selector: 'app-home-view',
  standalone: true,
  imports: [
    LastActivityCardComponent,
    WorkersFieldTableComponent,
    MatButton,
    NgIf,
    RouterLink,
    TranslateModule
  ],
  templateUrl: './home-view.component.html',
  styleUrl: './home-view.component.css'
})
export class HomeViewComponent implements OnInit{
  fieldName: string | null = '';
  userId!: number;
  agriculturalProcessId!: number;
  workers: Array<Worker> = [];
  workerService: WorkerService = inject(WorkerService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.getDataFromLS();
    this.getAgriculturalProcessId();
    this.getWorkersByUserId();
  }

  getAgriculturalProcessId() {
    this.route.params.subscribe(params => {
      this.agriculturalProcessId = params['id'];
      console.log(this.agriculturalProcessId);
    });
  }

  getWorkersByUserId() {
    this.workerService.getAllByUserId(this.userId).subscribe((workers) => {
      this.workers = workers.slice(0, 2) as Worker[];
      console.log(this.workers);
    });
  }

  getDataFromLS() {
    this.fieldName = localStorage.getItem('fieldName');
    this.userId = parseInt(localStorage.getItem('userId') || '');
  }
}
