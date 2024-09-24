import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Product} from "../models/product.entity";

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService<Product>{

  constructor() {
    super();
    this.resourceEndpoint = '/products';
  }
}
