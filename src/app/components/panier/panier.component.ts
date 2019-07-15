import { Quantity } from './../../models/quantity';
import { Menu } from './../../models/menu';
import { Order } from './../../models/order';
import { OrderService } from './../../services/order.service';
import { Meal } from 'src/app/models/meal';
import { AuthentificationService } from './../../services/authentification.service';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  menuPanier: [];
  userConnected: User;
  isAuth: boolean;
  prixTotalPanier: any = 0;
  local: any;
  listArticles: Menu[] = [];
  price: number;
  order: Order;

  constructor(
    private snackbar: MatSnackBar,
    private auth: AuthentificationService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    if (this.auth.isLogged()) {
      this.isAuth = true;
      this.userConnected = this.auth.getUserConnected();
    } else {
      this.userConnected = null;
      this.isAuth = false;
    }
    this.recupererPanier();
    this.calculerTotalPanier();
  }

  // Initialiser le panier
  recupererPanier() {
    if (localStorage.getItem('panier') != null) {
      this.menuPanier = JSON.parse(localStorage.getItem('panier'));
      console.log(this.menuPanier);
    }
    // Pour supprimer 'panier' du localstorage s'il est vide
    if (JSON.stringify(this.menuPanier) === '[]') {
      localStorage.removeItem('panier');
    }
  }

  // Méthode qui permet de supprimer un menu du panier
  supprimerMenu(i) {
    console.log(JSON.parse(localStorage.getItem('panier')));
    const storagePanier = JSON.parse(localStorage.getItem('panier'));
    storagePanier.splice(i, 1);
    localStorage.setItem('panier', JSON.stringify(storagePanier));
    console.log(JSON.parse(localStorage.getItem('panier')));
    this.ngOnInit();
  }

  // Pour calculer le prix total du panier
  calculerTotalPanier() {
    if (localStorage.getItem('panier') != null) {
      this.local = localStorage.getItem('panier');
      this.listArticles = JSON.parse(this.local);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.listArticles.length; i++) {
        // this.price = this.listArticles[i].priceDF;
        console.log('total panier: ' + this.prixTotalPanier);
        console.log('Prix article i: ' + this.listArticles[i].priceDF);
        this.prixTotalPanier = this.prixTotalPanier + this.listArticles[i].priceDF;
        console.log(this.prixTotalPanier);
      }
    }
    // FIXME fix NaN
  }

  creerLaCommande() {
    // FIXME PROBLEME : d'après le back, une commande ne peux être
    // constitué que d'un seul menu (on passe menu.id)



    // const user = this.userConnected;

    // const menus = this.listArticles;
    // const menu = this.menuPanier;

    // this.order = {
    //   status: 0,
    //   creationDate: new Date(),
    //   // menu, // id -> Un seul menu par commande ???
    //   user.id,
    //   quantities: null, // FIXME tableau de quantité ?????
    // };

    // this.orderService.addOrder(this.order)
    //   .subscribe(
    //     (response) => {
    //       this.order = response;
    //       console.log('order: ', this.order);
    //     },
    //     (error) => {
    //       // this.openSnackBarError();
    //       console.log('Error in Order.ts ... addOrder()', error);
    //       console.log('user: ', user);
    //       console.log('menu: ', menu);
    //       console.log('order: ', this.order);
    //     }
    //   );
  }

}
