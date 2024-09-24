import {Component, EventEmitter, inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {Fields} from "../../models/fields.entity";
import {FieldsService} from "../../services/fields.service";
import {NgIf} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-field-form-edit',
  standalone: true,
  imports: [
    NgIf,
    MatFormField,
    FormsModule,
    MatInput,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './field-form-edit.component.html',
  styleUrl: './field-form-edit.component.ts'
})
export class FieldFormComponent implements OnInit{
  @Input() isModalOpen: boolean=true ;
  @Input() type:string = 'Add';
  @Input() fieldId!:number;
  @Input() currentUserId!:number;
  @Output() close = new EventEmitter<void>();
  @Output() success = new EventEmitter<void>();
  field!: Fields;
  @ViewChild('fieldForm', { static: false}) fieldForm!: NgForm;
  fieldService: FieldsService = inject(FieldsService);

  constructor() {
    this.field=new Fields({});
  }

  ngOnInit(): void {
        this.field.userId= this.currentUserId;
    }
  private resetForm(){
    this.fieldForm.resetForm();
    this.field=new Fields({});
  }

  onSubmit() {
    if (this.fieldForm.form.valid) {
      if (this.fieldId) {
        this.fieldService.update(this.fieldId, this.field).subscribe((response: any) => {
          console.log('Field Updated', response);
          this.success.emit();
          this.resetForm();
          this.isModalOpen = false;
        });
      } else {
        this.fieldService.create(this.field).subscribe((response: any) => {
          console.log('Field Created', response);
          this.success.emit();
          this.resetForm();
          this.isModalOpen = false;
        });
      }
    }
  }
  onCancel() {
    this.resetForm();
    this.isModalOpen = false;
    this.close.emit();
  }
}
