import { Component, OnInit } from "@angular/core";
import { UserService } from "../../../services/user.service";
import { ActivatedRoute, Route } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: "app-edit-user",
  templateUrl: "./edit-user.component.html",
  styleUrls: ["./edit-user.component.css"]
})
export class EditUserComponent implements OnInit {
  id: number;
  user: Object;
  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe(params => (this.id = params.id));
  }

  ngOnInit() {
    this.getUser(this.id);
  }

  getUser(id) {
    this.userService.getUtilisateur(id).subscribe(res => {
      this.user = res;
    });
  }

  updateUser(form: NgForm) {
    console.log(form.form.value);
    this.userService
      .updateUtilisateur(this.id, form.form.value)
      .subscribe(user => {
        form.reset();
        this.router.navigate(['/my-account/' + this.id]);
      });
  }
}
