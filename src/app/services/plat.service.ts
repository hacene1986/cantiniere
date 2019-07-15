import { Observable } from 'rxjs';
import { Meal } from '../models/meal';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatService {

  constructor(private httpClient: HttpClient) { }

  // Méthode pour récupérer tous les plats de la semaine
  getAllMealsForWeek(weekNumber: number): Observable<Meal[]> {
    return this.httpClient.get<Meal[]>(environment.urlServeurBackEnd + 'meal/findallavailableforweek/' + weekNumber);
  }

  // Méthode pour récupérer tous les plats du jour
  getAllMealsForToday(): Observable<Meal[]> {
    return this.httpClient.get<Meal[]>(environment.urlServeurBackEnd + 'meal/findallavailablefortoday');
  }

  // Méthode pour récupérer un plat
  getMeal(id: string): Observable<Meal> {
    return this.httpClient.get<Meal>(environment.urlServeurBackEnd + 'meal/find/' + id);
  }

  // PROCHAINES METHODES SEULEMENT POUR LA CANTINIERE
  // Méthode pour récupérer tous les plats
  getAllMeal(): Observable<Meal[]> {
    return this.httpClient.get<Meal[]>(environment.urlServeurBackEnd + 'meal/findall');
  }

  // Méthode pour ajouter un plat
  addMeal(meal: Meal): Observable<Meal> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this.httpClient.put<Meal>(environment.urlServeurBackEnd + 'meal/add', meal, {headers: reqHeader});
  }

  // Méthode pour supprimer un plat
  deleteMeal(meal: Meal): Observable<Meal> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this.httpClient.delete<Meal>(environment.urlServeurBackEnd + 'meal/delete/' + meal, {headers: reqHeader});
  }

  // Méthode pour update un plat
  updateMeal(id: string, meal: Meal): Observable<Meal> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
    return this.httpClient.patch<Meal>(environment.urlServeurBackEnd + 'meal/update/' + id, meal, {headers: reqHeader});
  }
}
