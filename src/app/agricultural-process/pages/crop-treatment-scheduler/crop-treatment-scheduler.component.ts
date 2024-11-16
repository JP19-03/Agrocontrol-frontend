import {Component} from '@angular/core';
import {CropTreatmentFormComponent} from "../../components/crop-treatment-form/crop-treatment-form.component";
import {
  DatepickerCalendarComponent
} from "../../../public/components/datepicker-calendar/datepicker-calendar.component";

@Component({
  selector: 'app-crop-treatment-scheduler',
  standalone: true,
  imports: [
    CropTreatmentFormComponent,
    DatepickerCalendarComponent
  ],
  templateUrl: './crop-treatment-scheduler.component.html',
  styleUrl: './crop-treatment-scheduler.component.css'
})
export class CropTreatmentSchedulerComponent {
  selectedDate!: string;

  handleSelectedDate(event: any) {
    this.selectedDate = event;
    console.log(this.selectedDate);
  }
}
