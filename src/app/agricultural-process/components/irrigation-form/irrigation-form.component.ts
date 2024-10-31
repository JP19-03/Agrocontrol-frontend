import {Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {Irrigation} from "../../models/irrigation.entity";
import {FormsModule, NgForm} from "@angular/forms";
import {IrrigationService} from "../../services/irrigation.service";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {WorkerService} from "../../../fields/services/worker.service";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-irrigation-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
    NgForOf,
    NgIf
  ],
  templateUrl: './irrigation-form.component.html',
  styleUrl: './irrigation-form.component.css'
})
export class IrrigationFormComponent implements OnInit {

  @Input() agriculturalProcessId!: number;
  @Input() date!: string;

  success = false;
  irrigation!: Irrigation;

  @ViewChild('irrigationForm', { static: false }) irrigationForm!: NgForm;

  fieldWorkers: any = [];

  workers: { workerId: number; cost: number }[] = [
    { workerId: 0, cost: 0 }
  ];

  irrigationService: IrrigationService = inject(IrrigationService);
  workerService: WorkerService = inject(WorkerService);

  showWarning = false;
  userId!: number;

  constructor(private router: Router) {
    this.irrigation = new Irrigation({});
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId') || '') : 0;
    this.getWorkers();
  }

  private resetForm() {
    this.irrigationForm.resetForm();
    this.irrigation = new Irrigation({});
    this.workers = [
      { workerId: 0, cost: 0 }
    ]; // Reset workers array
  }

  onSubmit() {
    if (this.irrigationForm.form.valid && this.isWorkersValid()) {
      this.irrigation.agriculturalProcessId = this.agriculturalProcessId;
      this.irrigation.date = this.date;
      // Filtra los trabajadores válidos
      this.irrigation.workers = this.workers;
      this.calculateTotalCost();
      console.log('Irrigation', this.irrigation);

      this.irrigationService.create(this.irrigation).subscribe((response: any) => {
        console.log('Irrigation created', response);

      }, error => {
        console.error('Error creating irrigation', error);
      });

      this.success = true;
      this.resetForm();
    } else {
      console.log('Form is invalid');
      this.showWarning = true;
    }
  }

  getWorkers() {
    this.workerService.getAllWorkersByProducerId(this.userId).subscribe((workers: any) => {
      this.fieldWorkers = workers;
    });
  }

  isWorkersValid() {
    return this.workers.every(worker => worker.workerId && worker.cost > 0);
  }

  addWorker() {
    this.workers.push({ workerId: 0, cost: 0 }); // Add a new worker object
  }

  removeWorker(index: number) {
    if (this.workers.length > 1) {
      this.workers.splice(index, 1); // Remove the worker at the specified index
    }
  }

  calculateTotalCost() {
    this.irrigation.totalWorkersCost = this.workers.reduce((acc, worker) => acc + (worker.cost || 0), 0);
    console.log('Total Workers Cost:', this.irrigation.totalWorkersCost);
  }


  onCancel() {
    this.resetForm();
    this.success = false;
    this.router.navigate(['/irrigation-history'])
  }

}

