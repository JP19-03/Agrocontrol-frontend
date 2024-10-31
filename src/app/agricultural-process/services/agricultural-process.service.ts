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
    this.setToken();
    return this.http.get<AgriculturalActivity>(`${this.resourcePath()}/${agriculturalProcessId}/lastActivity/${activityType}`, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }

  getActivitiesByAgriculturalProcessId(agriculturalProcessId: number, activityType: String) {
    this.setToken();
    return this.http.get<Array<AgriculturalActivity>>(`${this.resourcePath()}/${agriculturalProcessId}/activities/${activityType}`, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }

  getUnfinishedAgriculturalProcessByFieldId(fieldId: number) {
    this.setToken();
    return this.http.get<AgriculturalProcess>(`${this.resourcePath()}/field/${fieldId}/unfinished`, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }

  addActivity(activity: AgriculturalActivity) {
    this.setToken();
    return this.http.post<AgriculturalActivity>(`${this.resourcePath()}/add-activity`, activity, this.httpOptionsAuthorized)
      .pipe(retry(2), catchError(this.handleError));
  }

}
