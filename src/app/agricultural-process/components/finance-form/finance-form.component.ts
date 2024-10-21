import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import {Finance} from "../../models/finance.entity";
import {FinanceService} from "../../services/finance.service";

@Component({
  selector: 'app-finance-form',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInput,
    MatButton,
    NgIf,
    MatDialogModule
  ],
  templateUrl: './finance-form.component.html',
  styleUrl: './finance-form.component.css'
})
export class FinanceFormComponent {
  @Input() agriculturalProcessId!: number; // Recibe el fieldId como input
  @Input() isModalOpen: boolean = false; // Recibe el isModalOpen como input
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();
  finance!: Finance;
  @ViewChild('financeForm', {static: false}) financeForm!: NgForm;
  financeService: FinanceService = inject(FinanceService);

  constructor() {
    this.finance = new Finance( {});
  }

  resetForm() {
    this.financeForm.resetForm();
    this.finance = new Finance({});
  }

  onSubmit() {
    if (this.financeForm.form.valid) {
      this.finance.agriculturalProcessId = this.agriculturalProcessId
      this.finance.totalProfit = (this.finance.totalRevenue !== undefined && this.finance.totalCost !== undefined)
        ? this.finance.totalRevenue - this.finance.totalCost
        : undefined;
      this.financeService.create(this.finance).subscribe((response: any) => {
        console.log('Finance created', response);

      })
      this.success.emit(); // Emitir evento al enviar
      this.resetForm();
      this.isModalOpen = false;


    } else {
      console.log('Form is invalid');
    }
  }

  onCancel() {
    this.resetForm();
    this.isModalOpen = false;
    this.close.emit(); // Emitir evento al cerrar
  }

  protected readonly Finance = Finance;
}




