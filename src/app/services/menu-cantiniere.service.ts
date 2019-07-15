import { environment } from '../../environments/environment';
import { Menu } from '../models/menu';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuCantiniereService {

  constructor(private httpClient: HttpClient) { }

  // Méthode pour récuperer tous les menus de la semaine
  getAllMenuForWeek(weekNumber: number): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(environment.urlServeurBackEnd + 'menu/findallavailableforweek/' + weekNumber);
  }
  // Méthode pour récuperer tous les menus du jour
  getAllMenuForToday(): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(environment.urlServeurBackEnd + 'menu/findallavailablefortoday');
  }

  // Méthode pour récuperer un menu
  getMenu(menu: Menu): Observable<Menu> {
    return this.httpClient.get<Menu>(environment.urlServeurBackEnd + 'menu/find/' + menu);
  }

  // PROCHAINES METHODES SEULEMENT POUR LA CANTINIERE
  // Méthode pour récuperer tous les menus
  getAllMenu(): Observable<Menu[]> {
    return this.httpClient.get<Menu[]>(environment.urlServeurBackEnd + 'menu/findall');
  }

  // Méthode pour ajouter un menu
  addMenu(menu: Menu): Observable<Menu> {
    return this.httpClient.put<Menu>(environment.urlServeurBackEnd + 'menu/add', menu);
  }

  // Méthode pour supprimer un menu
  deleteMenu(menu: Menu): Observable<Menu> {
    return this.httpClient.delete<Menu>(environment.urlServeurBackEnd + 'menu/delete/' + menu);
  }

  // Méthode pour update un menu
  updateMenu(menuId: number, menu: Menu): Observable<Menu> {
    return this.httpClient.patch<Menu>(environment.urlServeurBackEnd + 'menu/update/' + menuId, menu);
  }
}