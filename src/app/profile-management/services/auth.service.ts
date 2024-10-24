import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {User} from "../models/user.entity";
import {catchError, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<User>{

  constructor() {
    super();
    this.resourceEndpoint = '/authentication';
  }
  createAgriculturalProducer(user : User){
    return this.http.post<User>(`${this.resourcePath()}/sign-up/agricultural-producer`, user)
      .pipe(retry(2), catchError(this.handleError));
  }

  createDistributor(user : User){
    const headers = this.getHeadersAuthorization();
    return this.http.post(`${this.resourcePath()}/sign-up/distributor`, user)
      .pipe(retry(2), catchError(this.handleError));
  }

  getHeadersAuthorization() {
    return {
      "Content-Type": "application/json",
      "accept": "application/json"
    }
  }
}
