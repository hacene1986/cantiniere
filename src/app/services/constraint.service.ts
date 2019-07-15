import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Constraint } from '../models/constraint';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstraintService {

  constructor(private httpClient: HttpClient) { }


  // Méthode pour ajouter une contrainte
  addConstraint(constraint: Constraint): Observable<Constraint> {
    return this.httpClient.put<Constraint>(environment.urlServeurBackEnd + 'constraint/add', constraint);
  }

  // Méthode pour supprimer une contrainte
  deleteConstraint(constraint: Constraint): Observable<Constraint> {
    return this.httpClient.delete<Constraint>(environment.urlServeurBackEnd + 'constraint/delete/' + constraint);
  }

  // Méthode pour récuperer une contrainte
  getConstraint(constraint: Constraint): Observable<Constraint> {
    return this.httpClient.get<Constraint>(environment.urlServeurBackEnd + 'constraint/find/' + constraint.id);
  }

  // Méthode pour recupérer toutes les contraintes
  getAllConstraint(): Observable<Constraint[]> {
    return this.httpClient.get<Constraint[]>(environment.urlServeurBackEnd + 'constraint/findall/');
  }

  // Méthode pour mettre à joure une contrainte
  updateConstraint(constraintId: number, constraint: Constraint): Observable<Constraint> {
    return this.httpClient.patch<Constraint>(environment.urlServeurBackEnd + 'constraint/update/' + constraintId, constraint);
  }
}
