import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {User} from "../models/user.entity";
import {catchError, Observable, retry, tap} from "rxjs";

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
    return this.http.post(`${this.resourcePath()}/sign-up/distributor`, user)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Método para iniciar sesión y almacenar token, roles y userId
  LogInUser(user: User): Observable<User> {
    return this.http.post<any>(`${this.resourcePath()}/sign-in`, user).pipe(
      retry(2),
      catchError(this.handleError),
      tap((response) => {
        // Guardamos el token, roles y userId en el localStorage
        this.newToken(response.token); // Guarda el token en el BaseService y actualiza las cabeceras
        localStorage.setItem('userId', response.id.toString());
        localStorage.setItem('roles', JSON.stringify(response.roles));
      })
    );
  }
}
