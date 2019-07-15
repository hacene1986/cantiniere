import { environment } from './../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  token = null;
  decode = null;

  // Méthode d'authentification
  authentification(email: string, password: string): Observable<HttpResponse<any>> {
    return this.httpClient.post<HttpResponse<any>>(
      environment.urlServeurBackEnd + 'login',
      { email, password },
      { observe: 'response' })
      .pipe(
        tap(data => {
          console.log(data.headers.get('Authorization'));
          localStorage.setItem('token', data.headers.get('Authorization'));

          this.token = localStorage.getItem('token');
          this.decode = jwt_decode(this.token);

          catchError(this.handleError<HttpResponse<any>>('getUserByKey'));
        }));
  }

  getUserConnected() {
    this.token = localStorage.getItem('token');
    this.decode = jwt_decode(this.token);
    return this.decode.user;
  }

  // Méthode de déconnexion
  logout() {
    localStorage.removeItem('token');
    // window.location.reload();
    this.router.navigate(['/']);
  }

  // Méthode pour l'oubli du mot de passe
  forgotPassword(email: string): Observable<User> {
    return this.httpClient.post<User>(environment.urlServeurBackEnd + 'forgotpassword/', null,
      { params: { email } });
  }

  isLogged() {
    if (localStorage.getItem('token') != null) {
      return true;
    } else {
      return false;
    }
  }

  //  Handle Http operation that failed.
  //  Let the app continue.
  //  @param operation - name of the operation that failed
  //  @param result - optional value to return as the observable result
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return (error);
    };
  }

}
