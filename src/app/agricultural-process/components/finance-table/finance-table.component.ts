import { Component, Input} from '@angular/core';
import {Finance} from "../../models/finance.entity";
import {NgFor, NgForOf} from "@angular/common";
import {
  ProductsTablePopUpComponent
} from "../../../fields/components/products-table-pop-up/products-table-pop-up.component";


@Component({
  selector: 'app-finance-table',
  standalone: true,
  imports: [
    NgForOf,
    ProductsTablePopUpComponent
  ],
  templateUrl: './finance-table.component.html',
  styleUrl: './finance-table.component.css'
})



export class FinanceTableComponent {
@Input()
  finances!: Array<Finance>;

}
