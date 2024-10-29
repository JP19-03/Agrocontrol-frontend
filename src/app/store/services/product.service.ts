import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Product} from "../models/product.entity";
import {catchError, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<Product>{

  constructor() {
    super();
    this.resourceEndpoint = '/products';
  }

  getProductsByUserId(userId: number) {
    const headers = this.getHeadersAuthorization();
    return this.http.get<Array<Product>>(`${this.resourcePath()}/user/${userId}`, {headers})
      .pipe(retry(2), catchError(this.handleError));
  }

  getHeadersAuthorization() {
    return {
      "Content-Type": "application/json",
      "accept": "application/json"
    }
  }
}
