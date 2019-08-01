import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import jwt_decod from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';

// Ajout 01 Aout 2019
import { Menu } from 'src/app/models/menu';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { Meal } from 'src/app/models/meal';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  // Ajout 01 Aout 2019
  menuPanier: [];
  userConnected: User;
  isAuth: boolean;
  prixTotalPanier: any = 0;
  correctPrice: any;
  local: any;
  listArticles: Menu[] = [];
  price: number;
  order: Order;

  // Ajout 01 Aout 2019

  id: string;
  // tslint:disable-next-line:ban-types
  user: Object;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    // Ajout 01 Aout 2019
    private snackbar: MatSnackBar,
    private auth: AuthentificationService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser(this.id);
    console.log(this.id);
    console.log(this.user);

    // Ajout 01 Aout 2019
    if (this.auth.isLogged()) {
      this.isAuth = true;
      this.userConnected = this.auth.getUserConnected();
    } else {
      this.userConnected = null;
      this.isAuth = false;
    }
    this.recupererPanier();
    this.calculerTotalPanier();
    // Ajout 01 Aout 2019
  }

  getUser(id) {
    this.userService.getUtilisateur(id).subscribe(
      res => {
        this.user = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  // getUser(){
  //   let tok = localStorage.getItem('token')
  //  let decod = jwt_decod(tok)
  //   console.log(decod.user)
  //   this.user = decod.user
  // }

  // Ajout 01 Aout 2019
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
      console.log(this.listArticles);
      this.prixTotalPanier = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.listArticles.length; i++) {
        this.prixTotalPanier = this.prixTotalPanier + (this.listArticles[i].menu.priceDF * this.listArticles[i].quantity);
        console.log(this.prixTotalPanier);
      }
    }
  }

  creerLaCommande() {
    const user = this.userConnected;

    const menu = this.menuPanier;

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listArticles.length; i++) {
      // const element = this.listArticles[i];
      // console.log(element.menu.id);

      this.order = {
        status: 0,
        creationDate: new Date(),
        menuId: this.listArticles[i].menu.id,
        userId: this.userConnected.id,
        quantities: null
      };

      this.orderService.addOrder(this.order).subscribe(
        response => {
          this.order = response;
          console.log('order retour: ', this.order);
        },
        error => {
          console.log('Error in Order.ts ... addOrder()', error);
          console.log('order: ', this.order);
        }
      );
    }
  }
  // Ajout 01 Aout 2019
}
