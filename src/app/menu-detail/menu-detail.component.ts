import { Component, OnInit } from "@angular/core";
import { MenuService } from "../services/menu.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-menu-detail",
  templateUrl: "./menu-detail.component.html",
  styleUrls: ["./menu-detail.component.css"]
})
export class MenuDetailComponent implements OnInit {
  id: string;
  menu: Object;

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => (this.id = params.id));
  }

  ngOnInit() {
    this.getMenu(this.id);
  }

  getMenu(id) {
    console.log(id);
    this.menuService.getMenu(id).subscribe(res => {
      console.log(res);
      this.menu = res;
    });
  }

  modifMenu(form: NgForm) {
    console.log(form.form.value);
    this.menuService.updateMenu(this.id, form.form.value).subscribe(menu => {
      console.log("ok");
      form.reset();
    });
  }
}
