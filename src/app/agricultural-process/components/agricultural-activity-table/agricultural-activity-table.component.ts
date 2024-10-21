import {Component, Input} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-agricultural-activity-table',
  standalone: true,
  imports: [MatTableModule, MatInputModule, MatFormFieldModule, NgIf],
  templateUrl: './agricultural-activity-table.component.html',
  styleUrl: './agricultural-activity-table.component.css'
})
export class AgriculturalActivityTableComponent {
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() displayedColumns!: string[];

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
