import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Ingredientervice {

  constructor(private httpClient: HttpClient) { }

  // Méthode pour ajouter un ingredient
  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.httpClient.put<Ingredient>(environment.urlServeurBackEnd + 'ingredient/add', ingredient);
  }

  // Méthode pour supprimer un ingredient
  deleteIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.httpClient.delete<Ingredient>(environment.urlServeurBackEnd + 'ingredient/delete/' + ingredient);
  }

  // Méthode pour recuperer un ingredient
  getIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.httpClient.get<Ingredient>(environment.urlServeurBackEnd + 'ingredient/find/' + ingredient.id);
  }

  // Méthode pour récuperer tous les ingredients
  getAllIngredient(): Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(environment.urlServeurBackEnd + 'ingredient/findall/');
  }

  // Méthode pour update un ingredient
  updateIngredient(ingredientId: number, ingredient: Ingredient): Observable<Ingredient> {
    return this.httpClient.patch<Ingredient>(environment.urlServeurBackEnd + 'Ingredient/update/' + ingredientId, Ingredient);
  }

}
