import { Component, OnInit } from "@angular/core";
import { Meal } from "../../models/meal";
import { PlatService } from "src/app/services/plat.service";
import { NgForm } from "@angular/forms";
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
  plat: Array<Meal>;
  constructor(private platServices: PlatService) {}

  ngOnInit() {
    this.getAllMealsForWeek();
    this.getAllMealsForToday();
  }

  getAllMealsForWeek() {
    this.platServices.getAllMealsForWeek(this.weekNumber).subscribe(
      response => {
        this.listPlatsWeek = response;
      },
      error => {
        console.log("Error in Plats.ts ... getAllMealsForWeek()", error);
      }
    );
  }

  getAllMealsForToday() {
    this.platServices.getAllMealsForToday().subscribe(
      response => {
        this.listPlatsToday = response;
      },
      error => {
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
      form.reset();
      window.location.reload();
    });
  }

  deletePlat(id) {
    this.platServices.deleteMeal(id).subscribe(successCode => {
      this.listPlatsWeek = this.listPlatsWeek.filter(
        listPlatsWeek => listPlatsWeek.id !== id
      );
      this.listPlatsToday = this.listPlatsToday.filter(
        listPlatsToday => listPlatsToday.id !== id
      );
    });
  }
}
