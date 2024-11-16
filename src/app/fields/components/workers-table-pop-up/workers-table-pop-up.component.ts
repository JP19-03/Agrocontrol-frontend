import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";
import {WorkersFieldTableComponent} from "../workers-field-table/workers-field-table.component";
import {
  WorkersProcessComponent
} from "../../../agricultural-process/components/workers-process/workers-process.component";

@Component({
  selector: 'app-workers-table-pop-up',
  standalone: true,
  imports: [
    NgIf,
    WorkersFieldTableComponent,
    WorkersProcessComponent
  ],
  templateUrl: './workers-table-pop-up.component.html',
  styleUrl: './workers-table-pop-up.component.css'
})

export class WorkersTablePopUpComponent {

  @Input()
  isModalOpen: boolean = false;

  @Input()
  irrigationWorkers!: Array<any>;
}
