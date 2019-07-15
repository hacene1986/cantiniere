import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Meal } from '../models/meal';
import { ActivatedRoute } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-plat-detail',
  templateUrl: './plat-detail.component.html',
  styleUrls: ['./plat-detail.component.css']
})
export class PlatDetailComponent implements OnInit {
  id: string;
  plat: Object;
  constructor(private platServices: PlatService, private route: ActivatedRoute, private router: Router) { 
    this.route.params.subscribe(params => this.id = params.id)
  }

  ngOnInit() {
    this.getPlat(this.id)
  }


  getPlat(id){
    console.log(id)
    this.platServices.getMeal(id).subscribe((res) => {
      console.log(res)
      this.plat = res;
    })
  }

  modifPlat(form: NgForm) {
    this.platServices.updateMeal(this.id, form.form.value)
      .subscribe(
        plat => {
          console.log('ok');
          form.reset();
         
        }


      );

  }
}
