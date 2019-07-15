import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // Est stocké dans une variable d'environnement -> environment.ts
  urlServeur = environment.urlServeurBackEnd;

  constructor(
    private httpClient: HttpClient
  ) { }

  // Méthode pour creer un utilisateur
  creerUtilisateur(user: User): Observable<User> {
    
    return this.httpClient.put<User>(this.urlServeur + 'user/register', user);
  }

  // Méthode pour update le compte d'un utilisateur
  updateUtilisateur(id: number, user: User): Observable<User> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
      
    })
    return this.httpClient.patch<User>(this.urlServeur + 'user/update/' + id, user, {headers: reqHeader});
  }

  // Méthode pour supprimer le compte d'un utilisateur
  deleteUtilisateur(user: User): Observable<User> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
      
    })
    return this.httpClient.delete<User>(this.urlServeur + 'user/delete/' + user.id, {headers: reqHeader});
  }

  // Méthode pour desactiver le compte d'un utilisateur
  desactiverUtilisateur(user: User): Observable<User> {
    return this.httpClient.patch<User>(this.urlServeur + 'user/deactivate/' + user.id, user);
  }

  // Méthode pour activer le compte d'un utilisateur
  activerUtilisateur(user: User): Observable<User> {
    return this.httpClient.patch<User>(this.urlServeur + 'user/activate/' + user.id, user);
  }

  // Méthode pour créditer la cagnotte d'un utilisateur
  crediterUtilisateur(id: string, amount: number): Observable<User> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
      
    })
    return this.httpClient.post<User>(this.urlServeur + 'user/credit/' + id + '?amount=' + amount, null, {headers : reqHeader});
  }

  // Méthode pour débiter la cagnotte d'un utilisateur
  debiterUtilisateur(id: string, amount: number): Observable<User> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
      
    })
    return this.httpClient.post<User>(this.urlServeur + 'user/debit/' + id + '?amount=' + amount, null, {headers: reqHeader});
  }

  // Méthode pour récuperer un utilisateur
  getUtilisateur(id: string): Observable<User> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
      
    })
    return this.httpClient.get<User>(this.urlServeur + 'user/find/' + id, {headers: reqHeader});
  }


  // Méthode pour récuperer tous les utilisateur
  getAllUtilisateur(): Observable<User[]> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
      
    })
    
    return this.httpClient.get<User[]>(this.urlServeur + 'user/findall', {headers: reqHeader});
  }
}
