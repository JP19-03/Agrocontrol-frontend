import {Component} from '@angular/core';
import {
  DatepickerCalendarComponent
} from "../../../public/components/datepicker-calendar/datepicker-calendar.component";
import {IrrigationFormComponent} from "../../components/irrigation-form/irrigation-form.component";

@Component({
  selector: 'app-irrigation-scheduler',
  standalone: true,
  imports: [
    DatepickerCalendarComponent,
    IrrigationFormComponent
  ],
  templateUrl: './irrigation-scheduler.component.html',
  styleUrl: './irrigation-scheduler.component.css'
})
export class IrrigationSchedulerComponent {
  selectedDate!: string;

  handleSelectedDate(event: any) {
    this.selectedDate = event;
    console.log(this.selectedDate);
  }

}
