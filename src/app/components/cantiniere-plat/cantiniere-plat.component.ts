import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Meal } from "../../models/meal";
//import { ActivatedRoute } from '@angular/router';
import { PlatService } from "src/app/services/plat.service";
import { NgForm, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-cantiniere-plat",
  templateUrl: "./cantiniere-plat.component.html",
  styleUrls: ["./cantiniere-plat.component.css"]
})
export class CantinierePlatComponent implements OnInit {
  // Pour afficher tous les plats par défaut
  viewMode = "tabAll";
  weekNumber = 32;
  listPlatsWeek: Array<Meal>;
  listPlatsToday: Array<Meal>;
  id: string;
  /// plat: Meal;
  plat: Array<Meal>;
  constructor(private platServices: PlatService) {
    //this.route.params.subscribe(params => this.id = params.id)
  }

  ngOnInit() {
    this.getAllMealsForWeek();
    this.getAllMealsForToday();
  }

  getAllMealsForWeek() {
    this.platServices.getAllMealsForWeek(this.weekNumber).subscribe(
      response => {
        this.listPlatsWeek = response;
        console.log("listPlatsWeek: ", this.listPlatsWeek);
      },
      error => {
        // this.openSnackBarError();
        console.log("Error in Plats.ts ... getAllMealsForWeek()", error);
      }
    );
  }

  getAllMealsForToday() {
    this.platServices.getAllMealsForToday().subscribe(
      response => {
        this.listPlatsToday = response;
        console.log("listPlatsToday: ", this.listPlatsToday);
      },
      error => {
        // this.openSnackBarError();
        console.log("Error in Plats.ts ... getAllMealsForToday()", error);
      }
    );
  }

  creerPlat(form: NgForm) {
    const meal: Meal = {
      label: form.value.label,
      description: form.value.description,
      priceDF: form.value.priceDF,
      image: form.value.image,
      ingredients: form.value.ingredients,
      availableForWeeks: form.value.availableForWeeks
    };

    this.platServices.addMeal(meal).subscribe(plat => {
      console.log("ok");
      form.reset();
      window.location.reload();
    });
  }

  deletePlat(id) {
    this.platServices.deleteMeal(id).subscribe(successCode => {
      // console.log(this.listPlatsWeek);
      this.listPlatsWeek = this.listPlatsWeek.filter(
        listPlatsWeek => listPlatsWeek.id !== id
      );
      this.listPlatsToday = this.listPlatsToday.filter(
        listPlatsToday => listPlatsToday.id !== id
      );
    });
  }
}
