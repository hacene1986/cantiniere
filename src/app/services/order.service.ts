import { Constraint } from '../models/constraint';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  // Méthode pour ajouter une commande
  addOrder(order: Order): Observable<Order> {
    return this.httpClient.put<Order>(environment.urlServeurBackEnd + 'order/add/', order);
  }

  // Méthode pour annuler une commande
  cancelOrder(order: Order): Observable<Order> {
    return this.httpClient.patch<Order>(environment.urlServeurBackEnd + 'order/cancel/' + order.id, order);
  }

  // Méthode pour récuperer une commande
  getOrder(order: Order): Observable<Order> {
    return this.httpClient.get<Order>(environment.urlServeurBackEnd + 'order/find/' + order.id);
  }

  // Méthode pour récupérer toutes les commandes
  getAllOrder(): Observable<Order[]> {
    let reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
      
    })
    return this.httpClient.get<Order[]>(environment.urlServeurBackEnd + 'order/findall/', {headers: reqHeader});
  }

  // Méthode pour récupérer toute les commandes de tous les utilisateurs en fonction des parametres
  getAllOrderBetweenDateInStatus(beginDate: string, endDate: string, status: number): Observable<Order[]> {
    return this.httpClient.get<Order[]>(environment.urlServeurBackEnd + 'order/findallbetweendateinstatus/');
  }

  // Méthode pour récupérer toutes les commandes d'un utilisateur
  getAllOrderForUser(beginDate: string, endDate: string, status: number, user: User): Observable<Order[]> {
    return this.httpClient.get<Order[]>(environment.urlServeurBackEnd + 'order/findallforuser/' + user.id);
  }

  // Méthode pour récupérer toutes les commandes d'aujourd'hui, d'un utilisateur
  getAllOrderForTodayByUser(beginDate: string, endDate: string, status: number, user: User): Observable<Order[]> {
    return this.httpClient.get<Order[]>(environment.urlServeurBackEnd + 'order/findallforusertoday/' + user.id);
  }

  // Méthode pour update une commande
  updateOrder(orderId: number, order: Order): Observable<Order> {
    return this.httpClient.patch<Order>(environment.urlServeurBackEnd + 'order/update/' + orderId, order);
  }

  // Méthode pour calculer le prix de la commande
  computeOrderPrice(contrainteId: number, orderId: number): Observable<Order> {
    return this.httpClient.get<Order>(environment.urlServeurBackEnd + 'order/computeprice/' + orderId + '/' + contrainteId);
  }

  // Méthode pour payer et délivrer la commande
  payOrder(constraint: Constraint, order: Order): Observable<Order> {
    return this.httpClient.patch<Order>(environment.urlServeurBackEnd + 'order/deliverandpay/' + order.id + '/' + constraint.id, order);
  }

}
