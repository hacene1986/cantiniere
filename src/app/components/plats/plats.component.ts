import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { Meal } from "../../models/meal";
import { PlatService } from "../../services/plat.service";
import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-plats",
  templateUrl: "./plats.component.html",
  styleUrls: ["./plats.component.css"]
})
export class PlatsComponent implements OnInit {
  // Pour afficher les plats du jour par défaut
  viewMode = "tabToday";
  listPlatsWeek: Array<Meal>;
  listPlatsToday: Array<Meal>;

  quantity = "1";

  // Pour initialiser le numéro de la semaine
  weekNumber: number;
  dateWeek = new Date();
  yearStart: any;

  // Pour les snackBar (messages de confirmation/erreur)
  @ViewChild("snackBarTemplateError")
  snackBarTemplateError: TemplateRef<any>;

  constructor(
    private platServices: PlatService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getWeekNumber(this.dateWeek);
    this.getAllMealsForToday();
    this.getAllMealsForWeek();
  }

  getAllMealsForWeek() {
    this.platServices.getAllMealsForWeek(this.weekNumber).subscribe(
      response => {
        this.listPlatsWeek = response;
      },
      error => {
        this.openSnackBarError();
      }
    );
  }

  getAllMealsForToday() {
    this.platServices.getAllMealsForToday().subscribe(
      response => {
        this.listPlatsToday = response;
      },
      error => {
        this.openSnackBarError();
      }
    );
  }

  // Méthode pour récupérer le numéro de la semaine actuelle
  getWeekNumber(dateWeek) {
    dateWeek = new Date(
      Date.UTC(dateWeek.getFullYear(), dateWeek.getMonth(), dateWeek.getDate())
    );
    dateWeek.setUTCDate(
      dateWeek.getUTCDate() + 4 - (dateWeek.getUTCDay() || 7)
    );
    this.yearStart = new Date(Date.UTC(dateWeek.getUTCFullYear(), 0, 1));
    this.weekNumber = Math.ceil(
      ((dateWeek - this.yearStart) / 86400000 + 1) / 7
    );

    return this.weekNumber;
  }

  // Méthode qui permet d'afficher un message d'erreur, en cas d'erreur
  openSnackBarError() {
    this.snackbar.openFromTemplate(this.snackBarTemplateError, {
      duration: 15000,
      verticalPosition: "bottom",
      horizontalPosition: "center"
    });
  }
}
