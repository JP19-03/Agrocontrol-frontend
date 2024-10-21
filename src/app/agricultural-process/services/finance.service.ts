import { Injectable } from '@angular/core';
import { BaseService } from "../../shared/services/base.service";
import { Finance } from "../models/finance.entity";

@Injectable({
  providedIn: 'root'
})
export class FinanceService extends BaseService<Finance> {

  constructor() {
    super();
    this.resourceEndpoint = '/finances';
  }
}
