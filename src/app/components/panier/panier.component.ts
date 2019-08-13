import { Menu } from './../../models/menu';
import { Order } from './../../models/order';
import { OrderService } from './../../services/order.service';
import { Meal } from 'src/app/models/meal';
import { AuthentificationService } from './../../services/authentification.service';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

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
  correctPrice: any;
  local: any;
  listArticles: Menu[] = [];
  price: number;
  order: Order;

  @ViewChild('snackBarTemplateCommander')
  snackBarTemplateCommander: TemplateRef<any>;
  @ViewChild('snackBarTemplateCommanderAvant')
  snackBarTemplateCommanderAvant: TemplateRef<any>;
  @ViewChild('snackBarTemplateCagnotteTropFaible')
  snackBarTemplateCagnotteTropFaible: TemplateRef<any>;

  constructor(
    private snackbar: MatSnackBar,
    private auth: AuthentificationService,
    private orderService: OrderService,
    private router: Router
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
    }
    // Pour supprimer 'panier' du localstorage s'il est vide
    if (JSON.stringify(this.menuPanier) === '[]') {
      localStorage.removeItem('panier');
    }
  }

  // Méthode qui permet de supprimer un menu du panier
  supprimerMenu(i) {
    const storagePanier = JSON.parse(localStorage.getItem('panier'));
    storagePanier.splice(i, 1);
    localStorage.setItem('panier', JSON.stringify(storagePanier));
    this.ngOnInit();
  }

  // Pour calculer le prix total du panier
  calculerTotalPanier() {
    if (localStorage.getItem('panier') != null) {
      this.local = localStorage.getItem('panier');
      this.listArticles = JSON.parse(this.local);
      this.prixTotalPanier = 0;
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.listArticles.length; i++) {
        this.prixTotalPanier =
          this.prixTotalPanier +
          this.listArticles[i].menu.priceDF * this.listArticles[i].quantity;
      }
    }
  }

  creerLaCommande() {
    const user = this.userConnected;
    const menu = this.menuPanier;

    if (this.userConnected.wallet < this.prixTotalPanier) {
      this.openSnackBarCagnotteTropFaible();
    } else {
      // tslint:disable-next-line: prefer-for-of
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
            this.openSnackBarCommander();
            localStorage.removeItem('panier');
            this.router.navigate(['/']);

            console.log('order retour: ', this.order);
          },
          error => {
            this.openSnackBarCommanderAvant();
            console.log('Error in Order.ts ... addOrder()', error);
            console.log('order: ', this.order);
          }
        );
      }
    }
  }

  // Méthode qui permet d'afficher un message de confirmation de commande
  openSnackBarCommander() {
    this.snackbar.openFromTemplate(this.snackBarTemplateCommander, {
      duration: 10000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  openSnackBarCommanderAvant() {
    this.snackbar.openFromTemplate(this.snackBarTemplateCommanderAvant, {
      duration: 10000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  openSnackBarCagnotteTropFaible() {
    this.snackbar.openFromTemplate(this.snackBarTemplateCagnotteTropFaible, {
      duration: 10000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
