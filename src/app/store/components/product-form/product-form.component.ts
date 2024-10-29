import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { Product } from '../../models/product.entity';
import { ProductService } from '../../services/product.service';
import { NgClass, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    FormsModule,
    MatInput,
    MatFormField,
    MatButton,
    NgIf,
    MatIcon,
    MatLabel,
    MatProgressSpinner,
    NgClass
  ],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  //#region Attributes
  @Input() showForm!: boolean;
  product!: Product;
  @Input() userId: number = 1;
  @ViewChild('productForm', { static: false }) protected productForm!: NgForm;
  productService: ProductService = inject(ProductService);
  @Output() close = new EventEmitter<void>();
  loading: boolean = false;
  success!: boolean;
  message!: string;

  //#endregion Attributes

  constructor() {
    this.product = new Product({});
  }

  private resetForm(): void {
    this.product = new Product({});
    this.productForm.resetForm();
    this.message = '';
  }

  private isValid = () => this.productForm.valid;

  onSubmit() {
    if (this.isValid() && !this.loading) {
      this.loading = true;
      this.product.userId = this.userId;

      console.log('Product: ', this.product);

      // Simulate loading delay of 5 seconds
      setTimeout(() => {
        this.productService.create(this.product).subscribe(
          (response) => {
            console.log('Product created: ', response);
            this.message = 'Product created successfully';
            this.resetForm();
            this.success = true; // Indicate success
          },
          (error) => {
            console.error('Error creating product: ', error);
            this.message = 'Error creating product';
            this.success = false; // Indicate failure
          },
          () => {
            this.loading = false; // Ensure loading is false at the end of the request
          }
        );
      }, 3000); // Delay of 5 seconds
    }
  }

  onCancel() {
    this.resetForm();
    this.closePopup();
  }

  closePopup() {
    this.close.emit();
  }
}
