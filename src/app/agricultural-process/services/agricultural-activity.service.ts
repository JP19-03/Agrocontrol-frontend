import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {AgriculturalActivity} from "../models/agricultural-activity.entity";

@Injectable({
  providedIn: 'root'
})
export class AgriculturalActivityService extends BaseService<AgriculturalActivity>{

  constructor() {
    super();
    this.resourceEndpoint = '/agriculturalActivities';
  }
}
