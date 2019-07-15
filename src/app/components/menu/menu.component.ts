import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Menu } from './../../models/menu';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  // Pour afficher l'onglet Formules (menu) par défaut
  viewMode = 'tabToday';

  // Pour initialiser le numéro de la semaine
  weekNumber: number;
  dateWeek = new Date();
  yearStart: any;

  listMenuThisWeek: Array<Menu>;
  listMenuToday: Array<Menu>;

  quantity = '1';

  // Pour les snackBar (messages de confirmation/erreur)
  @ViewChild('snackBarTemplateError')
  snackBarTemplateError: TemplateRef<any>;
  @ViewChild('snackBarTemplateAjoutPanier')
  snackBarTemplateAjoutPanier: TemplateRef<any>;

  constructor(
    private menuService: MenuService,
    private snackbar: MatSnackBar,
    private router: Router,
    private modalService: NgbModal,
  ) { }

  // On initialise la vue en calculant le numéro de la semaine, et en récupérant tous les menu du jour et de la semaine
  ngOnInit() {
    this.getWeekNumber(this.dateWeek);
    this.getAllMenuForWeek();
    this.getAllMenuForToday();
  }

  getAllMenuForWeek() {
    this.menuService.getAllMenuForWeek(this.weekNumber)
      .subscribe(
        (response) => {
          this.listMenuThisWeek = response;
          console.log('listMenuThisWeek: ', this.listMenuThisWeek);
        },
        (error) => {
          console.log('Error in Menu.ts ... getAllMenuForWeek()', error);
        }
      );
  }

  getAllMenuForToday() {
    this.menuService.getAllMenuForToday()
      .subscribe(
        (response) => {
          this.listMenuToday = response;
          console.log('listMenuToday: ', this.listMenuToday);
        },
        (error) => {
          console.log('Error in Menu.ts ... getAllMenuForToday()', error);
        }
      );
  }

  // Méthode pour récupérer le numéro de la semaine actuelle
  getWeekNumber(dateWeek) {
    dateWeek = new Date(Date.UTC(dateWeek.getFullYear(), dateWeek.getMonth(), dateWeek.getDate()));
    dateWeek.setUTCDate(dateWeek.getUTCDate() + 4 - (dateWeek.getUTCDay() || 7));
    this.yearStart = new Date(Date.UTC(dateWeek.getUTCFullYear(), 0, 1));
    this.weekNumber = Math.ceil((((dateWeek - this.yearStart) / 86400000) + 1) / 7);
    console.log('Date de la semaine : ' + dateWeek.getUTCFullYear(), this.weekNumber);

    return this.weekNumber;
  }

  // Méthode pour ouvrir le modal d'ajout de menu
  openAddModal(ajoutPanier: any) {
    this.modalService.open(ajoutPanier, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then((result) => {
        this.closeModal();
      }, (reason) => {
        this.closeModal();
      });
  }

  // Méthode qui permet de fermer le modal
  closeModal() {
    this.modalService.dismissAll();
  }

  // Méthode du bouton "+" de la card pour directement ajouter un menu dans le panier
  addToPanier(menu) {
    console.log(menu);
    let panier = [];
    if (localStorage.getItem('panier')) {
      panier = JSON.parse(localStorage.getItem('panier'));
    }
    panier.push({ quantity: this.quantity, menu });
    localStorage.setItem('panier', JSON.stringify(panier));
    this.openSnackBarAjoutPanier();
    console.log(JSON.parse(localStorage.getItem('panier')));
  }

  // Méthode du modal, qui valide l'ajout du menu dans le panier
  closeValiderAjoutPanier(menu, quantity) {
    let panier = [];
    if (localStorage.getItem('panier')) {
      panier = JSON.parse(localStorage.getItem('panier'));
    }
    panier.push({ quantity, menu });
    localStorage.setItem('panier', JSON.stringify(panier));

    this.closeModal();
    this.openSnackBarAjoutPanier();
    console.log(JSON.parse(localStorage.getItem('panier')));
  }

  // Méthode qui permet d'afficher un message de confirmation d'ajout de menu dans le panier
  openSnackBarAjoutPanier() {
    this.snackbar.openFromTemplate(this.snackBarTemplateAjoutPanier, {
      duration: 10000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  // Méthode qui permet d'afficher un message d'erreur, en cas d'erreur
  openSnackBarError() {
    this.snackbar.openFromTemplate(this.snackBarTemplateError, {
      duration: 15000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
}
