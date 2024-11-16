import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {ProductStored} from "../models/product-stored.entity";

@Injectable({
  providedIn: 'root'
})
export class ProductStoredService extends BaseService<ProductStored>{

  constructor() {
    super();
    this.resourceEndpoint = "/payment-products";
  }
}
