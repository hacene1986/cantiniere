import { Component, OnInit } from '@angular/core';
import { Menu } from '../../models/menu';
//import { MenuCantiniereService } from '../../services/menu-cantiniere.service';
import { NgForm } from '@angular/forms';
//import { Meal } from 'src/app/models/meal';
import { PlatService } from 'src/app/services/plat.service';
import { MenuService } from 'src/app/services/menu.service';
@Component({
  selector: 'app-cantiniere-menu',
  templateUrl: './cantiniere-menu.component.html',
  styleUrls: ['./cantiniere-menu.component.css']
})
export class CantiniereMenuComponent implements OnInit {

  // Pour afficher l'onglet Formules (menu) par défaut
  viewMode = 'tabToday';
  weekNumber = 49;
  listMenuThisWeek: Array<Menu>;
  listMenuToday: Array<Menu>;
  // listMenuWeek: Array<Menu>;
   //listPlatsWeek: Array<Meal>;
  
  constructor(
    private menuService: MenuService,
  //  private platService: PlatService
  ) { }

  ngOnInit() {
     this.getAllMealsForToday();
    this.getAllMealsForWeek();
  }

  getAllMealsForWeek() {
    this.menuService.getAllMenuForWeek(this.weekNumber)
      .subscribe(
        (response) => {
          this.listMenuThisWeek = response;
          // console.log('listMenuWeek: ', this.listMenuThisWeek);
          // console.log(response);
        },
        (error) => {
          // this.openSnackBarError();
          console.log('Error in Plats.ts ... getAllMealsForWeek()', error);
        }
      );
    
  }

 

  getAllMealsForToday() {
    this.menuService.getAllMenuForToday()
      .subscribe(
        (response) => {
          this.listMenuToday = response;
          // console.log('listPlatsToday: ', this.listMenuToday);
        },
        (error) => {
         // this.openSnackBarError();
          console.log('Error in Plats.ts ... getAllMealsForToday()', error);
        }
      );
  }

  creerMenu(form: NgForm) {
    const menu: Menu = {
      label: form.value.label,
      description: form.value.description,
      priceDF: form.value.priceDF,
      image: form.value.image,
    //  meals: form.value.meals,
      availableForWeeks: form.value.availableForWeeks
    };
    console.log(menu)
    this.menuService.addMenu(menu)
      .subscribe(
        menu => {
          console.log(menu);
          form.reset();
        });
  }

  deleteMenu(id){
    this.menuService.deleteMenu(id)
    .subscribe(successCode =>{
     // console.log(this.listPlatsWeek);
      this.listMenuThisWeek = this.listMenuThisWeek.filter(listMenuThisWeek => listMenuThisWeek.id !== id);
      this.listMenuToday = this.listMenuToday.filter(listMenuToday => listMenuToday.id !== id)
    })
    
    }
 
}
