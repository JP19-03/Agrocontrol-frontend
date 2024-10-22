import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Fields } from "../../models/fields.entity";
import { MatCard, MatCardActions, MatCardContent, MatCardImage } from "@angular/material/card";
import { MatButton } from "@angular/material/button";
import { FieldsService } from "../../services/fields.service";
import { NgIf } from "@angular/common";

import {Router} from "@angular/router";
import {FieldFormComponent} from "../field-form/field-form.component";
import {AgriculturalProcessService} from "../../../agricultural-process/services/agricultural-process.service";
import {FieldFormEditComponent} from "../field-form-edit/field-form-edit.component";

@Component({
  selector: 'app-field-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardImage,
    MatCardContent,
    MatCardActions,
    MatButton,
    NgIf,
    FieldFormComponent,
    FieldFormEditComponent
  ],
  templateUrl: './field-card.component.html',
  styleUrl: './field-card.component.css'
})
export class FieldCardComponent {
  @Input() field!: Fields;
  @Output() deleteField = new EventEmitter<void>();
  @Output() editField = new EventEmitter<void>();
  isModalOpen: boolean = false;

  fieldService: FieldsService = inject(FieldsService);
  agriculturalProcessService: AgriculturalProcessService = inject(AgriculturalProcessService);

  constructor(private router: Router) {}

  onFieldDeleted(fieldId: number): void {
    this.fieldService.delete(fieldId).subscribe((response: any) => {
      console.log(`Field with ID ${fieldId} deleted successfully.`);
      this.deleteField.emit();
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onEditSuccess() {
    this.editField.emit();
    this.closeModal();
  }

  goToHome(fieldId: number) {
    this.agriculturalProcessService.getAll().subscribe({
      next: (response: any) => {
        const agriculturalProcess = response.find((process: any) =>
          process.fieldId === fieldId && !process.isFinished
        );

        if (agriculturalProcess) {
          localStorage.setItem('fieldName', this.field.fieldName);
          localStorage.setItem('agriculturalProcessId', agriculturalProcess.id);
          this.router.navigate(['home-agricultural-process', agriculturalProcess.id]);
        } else {
          console.log('No unfinished agricultural process found for the given field ID.');
        }
      },
      error: (error) => {
        console.error('Error fetching agricultural processes:', error);
      }
    });
  }

}
