import {Component, inject, OnInit} from '@angular/core';
import { RouterLink } from "@angular/router";
import {
    AgriculturalActivityTableComponent
} from "../../components/agricultural-activity-table/agricultural-activity-table.component";
import {MatTableDataSource} from "@angular/material/table";
import {AgriculturalProcessService} from "../../services/agricultural-process.service";
import {AgriculturalActivity} from "../../models/agricultural-activity.entity";

@Component({
  selector: 'app-crop-treatment-view',
  standalone: true,
    imports: [
        RouterLink,
        AgriculturalActivityTableComponent
    ],
  templateUrl: './crop-treatment-view.component.html',
  styleUrl: './crop-treatment-view.component.css'
})

export class CropTreatmentViewComponent implements OnInit {
  protected dataSource!: MatTableDataSource<any>;
  protected displayedColumns: string[] = ['id', 'date', 'workersTotalCost',  'activityStatus', 'treatmentType', 'resources'];
  private activityService: AgriculturalProcessService = inject(AgriculturalProcessService);
  private agriculturalProcessId: number = 2;
  private activityType: String = 'CROP_TREATMENT';

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getAllActivities();
  }

  getAllActivities(): void {
    this.activityService.getActivitiesByAgriculturalProcessId(this.agriculturalProcessId, this.activityType)
      .subscribe((data: Array<AgriculturalActivity>) => {
        this.dataSource.data = data;
      });
  }
}
