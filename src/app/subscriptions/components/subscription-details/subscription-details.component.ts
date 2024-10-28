import { Component, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-subscription-details',
  standalone: true,
  imports: [NgIf, MatIcon],
  templateUrl: './subscription-details.component.html',
  styleUrls: ['./subscription-details.component.css'], // Corregido 'styleUrl' a 'styleUrls'
})
export class SubscriptionDetailsComponent implements OnInit {
  @Input() subscriptionType!: number;
  details: Array<string> = [];

  ngOnInit(): void {
    this.getDetails();
    console.log('subscriptionType', this.subscriptionType);
  }

  private getDetails(): void { // Añadido 'private' para encapsulación
    switch (this.subscriptionType) {
      case 1:
        this.details = [
          'Fields: Management of 1 field',
          'Planting: Basic tracking of plant quantities and labor',
          'Irrigation: Basic Scheduling Calendar',
          'Fumigation: Simple planning for fumigation',
          'Harvest: Production tracking',
          'Distribution: Basic sale management',
          'Support: Standard support',
        ];
        break;
      case 2:
        this.details = [
          'Fields: Management of up to 5 fields',
          'Planting: Advanced tracking of plant quantities and labor',
          'Irrigation: Advanced Scheduling Calendar',
          'Fumigation: Advanced planning for fumigation',
          'Harvest: Production tracking with quality control',
          'Distribution: Advanced sale management',
          'Support: Priority support',
        ];
        break;
      default:
        this.details = [
          'Stock Management: Real-time stock management',
          'Delivery scheduling: Advanced delivery scheduling',
          'Sales Analysis: Advanced sales analysis',
          'Support: Premium support',
        ];
        break;
    }
  }
}
