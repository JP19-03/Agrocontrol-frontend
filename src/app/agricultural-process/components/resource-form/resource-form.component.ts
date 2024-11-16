import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {AgriculturalProcessService} from "../../services/agricultural-process.service";
import {WorkerService} from "../../../fields/services/worker.service";

@Component({
  selector: 'app-resource-form',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgForOf,
  ],
  templateUrl: './resource-form.component.html',
  styleUrls: ['./resource-form.component.css'], // Fix typo: styleUrls instead of styleUrl
})
export class ResourceFormComponent implements OnChanges {
  @Input() showForm: boolean = false; // Control visibility of the form
  @Input() activityId!: number; // ID of the activity, required
  @Output() close: EventEmitter<void> = new EventEmitter<void>(); // Event emitter to close the form

  workers: WorkerService = inject(WorkerService); // Inject WorkerService



  selectedOption: string = 'workers'; // Default selected option
  selectedItem: string | null = null; // Currently selected item
  options: string[] = []; // Dynamic options for the dropdown

  // Static categories for options
  @Input() fruits: string[] = ['Apple', 'Banana', 'Orange'];
  @Input() vegetables: string[] = ['Carrot', 'Broccoli', 'Spinach'];

  // Lifecycle hook to handle changes to inputs
  ngOnChanges(changes: SimpleChanges): void {
    if ('activityId' in changes && !changes['activityId'].currentValue) {
      console.error('Invalid or missing activityId. Please provide a valid activityId.');
    }
    if ('showForm' in changes && changes['showForm'].currentValue) {
      this.updateOptions(); // Reset options if the form is shown
    }
  }

  // Updates the dropdown options based on the selected category
  updateOptions(): void {
    this.options = this.selectedOption === 'fruits' ? this.fruits : this.vegetables;
    this.selectedItem = null; // Reset selected item when category changes
  }

  // Handles category change via radio buttons
  onOptionChange(): void {
    this.updateOptions();
  }

  // Handles form submission
  onSubmit(): void {
    if (!this.selectedItem) {
      alert('Please select an item before submitting.');
      return;
    }

    // Simulate form submission
    console.log('Form submitted:', {
      activityId: this.activityId,
      selectedOption: this.selectedOption,
      selectedItem: this.selectedItem,
    });

    // Close form after submission
    this.closeForm();
  }

  // Closes the form
  closeForm(): void {
    this.showForm = false;
    this.selectedItem = null; // Reset state when form closes
    this.selectedOption = 'fruits'; // Reset to default
    this.updateOptions(); // Ensure options are reset
  }

  closePopup() {
    this.close.emit(); // Emit close event to parent component
  }
}
