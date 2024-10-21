import {Component, inject, OnInit} from '@angular/core';
import {
  AgriculturalActivityTableComponent
} from "../../components/agricultural-activity-table/agricultural-activity-table.component";
import {AgriculturalActivityService} from "../../services/agricultural-activity.service";
import {AgriculturalActivity} from "../../models/agricultural-activity.entity";
import {MatTableDataSource} from "@angular/material/table";
import {MatButtonModule} from '@angular/material/button';
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-irrigation-history',
  standalone: true,
  imports: [
    AgriculturalActivityTableComponent,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './irrigation-history.component.html',
  styleUrl: './irrigation-history.component.css'
})
export class IrrigationHistoryComponent implements OnInit {
  protected dataSource!: MatTableDataSource<any>;
  protected displayedColumns: string[] = ['id', 'date', 'workersTotalCost', 'hoursIrrigated'];
  private activityService: AgriculturalActivityService = inject(AgriculturalActivityService);

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
  }

  ngOnInit(): void {
    this.getAllActivities();
  }

  getAllActivities(): void {
    this.activityService.getAll().subscribe((response: Array<AgriculturalActivity>) => {
      const irrigations= response.filter((activity: AgriculturalActivity) => activity.activityType === 'IRRIGATION');
      this.dataSource.data = irrigations;
      console.log(irrigations);
    });
  }
}
