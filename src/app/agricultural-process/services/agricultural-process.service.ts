import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {AgriculturalProcess} from "../models/agricultural-process.entity";
import {AgriculturalActivity} from "../models/agricultural-activity.entity";
import {catchError, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AgriculturalProcessService extends BaseService<AgriculturalProcess>{

  constructor() {
    super();
    this.resourceEndpoint = '/agricultural-processes';
  }

  getLastActivityByType(activityType: String, agriculturalProcessId : number) {
    const headers = this.getHeadersAuthorization();
    return this.http.get<AgriculturalActivity>(`${this.resourcePath()}/${agriculturalProcessId}/lastActivity/${activityType}`, {headers})
      .pipe(retry(2), catchError(this.handleError));
  }

  getHeadersAuthorization() {
    return {
      "Content-Type": "application/json",
      "accept": "application/json"
    }
  }
}
