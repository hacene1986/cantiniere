import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PlatService } from "../../services/plat.service";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-plat-detail",
  templateUrl: "./plat-detail.component.html",
  styleUrls: ["./plat-detail.component.css"]
})
export class PlatDetailComponent implements OnInit {
  id: string;
  plat: Object;
  constructor(
    private platServices: PlatService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => (this.id = params.id));
  }

  ngOnInit() {
    this.getPlat(this.id);
  }

  getPlat(id) {
    this.platServices.getMeal(id).subscribe(res => {
      this.plat = res;
    });
  }

  modifPlat(form: NgForm) {
    this.platServices.updateMeal(this.id, form.form.value).subscribe(plat => {
      form.reset();
    });
  }
}
