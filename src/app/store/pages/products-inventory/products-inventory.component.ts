import {Component, inject, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {ProductFormComponent} from "../../components/product-form/product-form.component";
import {Product} from "../../models/product.entity";
import {ProductService} from "../../services/product.service";
import {ProductsListComponent} from "../../components/products-list/products-list.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-products-inventory',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    ProductFormComponent,
    ProductsListComponent,
    NgIf
  ],
  templateUrl: './products-inventory.component.html',
  styleUrl: './products-inventory.component.css'
})
export class ProductsInventoryComponent implements OnInit{
  showForm: boolean = false;
  products: Array<Product> = [];
  productService: ProductService = inject(ProductService);
  userId: number = 1;
  isEditMode: boolean = false;
  productToEdit?: Product;

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProductsByUserId(this.userId).subscribe((products: Array<Product>) => {
      this.products = products;
      console.log(this.products);
    });
  }

  showPopup() {
    this.showForm = true;
  }

  handleClosed(event: any) {
    this.showForm = false;
    this.getProducts();
  }
  openFormForEdit(product: Product) {
    this.isEditMode = true;
    this.productToEdit = product;
    this.showForm = true;
  }

}
