import {Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgForOf, NgIf } from '@angular/common';
import { WorkerService } from '../../../fields/services/worker.service';
import { AgriculturalProcess } from '../../models/agricultural-process.entity';
import { AgriculturalProcessService } from '../../services/agricultural-process.service';
import {Router} from "@angular/router";
import {AgriculturalActivity} from "../../models/agricultural-activity.entity";

@Component({
  selector: 'app-seeding-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    NgIf,
  ],
  templateUrl: './seeding-form.component.html',
  styleUrls: ['./seeding-form.component.css'],
})
export class SeedingFormComponent implements OnInit {
  @Input() agriculturalProcessId!: number;
  today = new Date().toISOString().split('T')[0];
  success = false;
  seeding: AgriculturalActivity = new AgriculturalActivity({});
  @ViewChild('seedingForm', { static: false }) seedingForm!: NgForm;
  fieldWorkers: any = [];
  workers: { workerId: number; cost: number }[] = [{ workerId: 0, cost: 0 }];
  workerService: WorkerService = inject(WorkerService);
  showWarning = false;
  agriculturalProcess!: AgriculturalProcess;
  agriculturalProcessService: AgriculturalProcessService = inject(AgriculturalProcessService);
  constructor(private router: Router) {
  }

  ngOnInit() {
    console.log('Agricultural Process ID:', this.agriculturalProcessId);
    this.seeding.date = this.today;
    this.getWorkers();
    this.getAgriculturalProcess();
  }

  private resetForm() {
    this.seedingForm.resetForm();
    this.seeding = new AgriculturalActivity({ date: this.today });
    this.workers = [{ workerId: 0, cost: 0 }];
  }

  private getAgriculturalProcess() {
    this.agriculturalProcessService.getById(this.agriculturalProcessId).subscribe({
      next: (response) => {
        this.agriculturalProcess = response;
        console.log('Agricultural Process:', this.agriculturalProcess);
      },
      error: (err) => console.error('Error fetching agricultural process:', err),
    });
  }

  onSubmit() {
    if (this.seedingForm.valid && this.isWorkersValid()) {
      this.seeding.agriculturalProcessId = this.agriculturalProcessId;
      this.agriculturalProcessService.addActivity(this.seeding).subscribe({
        next: (response) => {
          console.log('Seeding created successfully', response);
          this.resetForm();
          this.success = true;
        },
        error: (err) => {
          console.error('Error creating seeding:', err);
          this.showWarning = true;
        },
      });
    } else {
      this.showWarning = true;
    }
  }

  private getWorkers() {
    this.workerService.getAll().subscribe({
      next: (response) => {
        this.fieldWorkers = response;
      },
      error: (err) => console.error('Error fetching workers:', err),
    });
  }

  private isWorkersValid() {
    return this.workers.every(worker => worker.workerId > 0 && worker.cost > 0);
  }

  addWorker() {
    this.workers.push({ workerId: 0, cost: 0 });
  }

  removeWorker(index: number) {
    if (this.workers.length > 1) {
      this.workers.splice(index, 1);
    }
  }

  onCancel() {
    this.router.navigate(['/home-agricultural-process/:id']);
    this.resetForm();
    this.success = false;
  }
}
