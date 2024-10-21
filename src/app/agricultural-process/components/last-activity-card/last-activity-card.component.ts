import {Component, inject, Input, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {AgriculturalProcessService} from "../../services/agricultural-process.service";
import {AgriculturalActivity} from "../../models/agricultural-activity.entity";


@Component({
  selector: 'app-last-activity-card',
  standalone: true,
  imports: [ MatCardModule ],
  templateUrl: './last-activity-card.component.html',
  styleUrl: './last-activity-card.component.css'
})
export class LastActivityCardComponent implements OnInit {
  @Input() type!: string;
  @Input() agriculturalProcessId!: number;
  private agriculturalProcessService: AgriculturalProcessService = inject(AgriculturalProcessService);
  agriculturalActivity!: AgriculturalActivity;


  getAgriculturalActivity() {
    return this.agriculturalProcessService.getLastActivityByType(this.type, this.agriculturalProcessId)
      .subscribe(activity => this.agriculturalActivity = activity);
  }

  ngOnInit(): void {
    this.getAgriculturalActivity();
  }

}
