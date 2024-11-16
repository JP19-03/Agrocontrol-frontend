import {Component, Input, OnInit} from '@angular/core';
import {Fields} from "../../models/fields.entity";
import {FieldsService} from "../../services/fields.service";
import {FieldCardComponent} from "../field-card/field-card.component";
import {CommonModule} from '@angular/common';
import {MatButton} from "@angular/material/button";
import {FieldFormComponent} from "../field-form/field-form.component";
import {FieldFormEditComponent} from "../field-form-edit/field-form-edit.component";


@Component({
  selector: 'app-card-field-list',
  standalone: true,
  imports: [
    CommonModule,
    FieldCardComponent,
    MatButton,
    FieldFormComponent,
    FieldFormEditComponent,
  ],
  templateUrl: './card-field-list.component.html',
  styleUrl: './card-field-list.component.css'
})
export class CardFieldListComponent implements OnInit {
  fields: Array<Fields> = [];
  @Input() currentUserId!: number;
  isModalOpen: boolean = false;
  isEditModalOpen: boolean = false; // Nueva variable para manejar el modal de edición
  selectedFieldId!: number; // ID del campo seleccionado para editar
  message: string = '';
  constructor(private fieldService: FieldsService) {}

  ngOnInit(): void {
    this.loadFields();
  }

  loadFields(): void {
    this.fieldService.getFieldsByUserId(this.currentUserId).subscribe((fields) => {
      this.fields = fields;
      if (fields.length === 0) {
        this.message = 'No fields found';
      }
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onFieldAdded(): void {
    this.loadFields();
    this.closeModal();
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  onFieldEdited(): void {
    this.loadFields();
    this.closeEditModal();
  }

  reload() {
    this.loadFields();
  }
}

