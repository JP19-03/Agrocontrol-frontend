import { Component, inject, OnInit } from '@angular/core';
import { Finance } from "../../models/finance.entity";
import { RouterLink} from "@angular/router";
import {FinanceService} from "../../services/finance.service";
import {FinanceTableComponent} from "../../components/finance-table/finance-table.component";
import {MatButton} from "@angular/material/button";
import {FinanceFormComponent} from "../../components/finance-form/finance-form.component";


@Component({
  selector: 'app-finance-view',
  standalone: true,
  imports: [
    RouterLink,
    FinanceTableComponent,
    MatButton,
    FinanceFormComponent

  ],
  templateUrl: './finance-view.component.html',
  styleUrl: './finance-view.component.css'
})
export class FinanceViewComponent implements OnInit {
  modalOpen: boolean = false;
  private financeService : FinanceService = inject(FinanceService);
  protected dataSource!: Array<Finance>;

  ngOnInit() {
    this.getFinances();
  }

  handleSuccess() {
    this.getFinances(); // Refresh the table
    this.closeModal();
  }

  getFinances(): void {
    this.financeService.getAll().subscribe((response: Array<Finance>) => this.dataSource = response);
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }
}
