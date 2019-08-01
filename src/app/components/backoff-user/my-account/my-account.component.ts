import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import jwt_decod from "jwt-decode";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.css"]
})
export class MyAccountComponent implements OnInit {
  id: string;
  user: Object;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.getUser(this.id);
    console.log(this.id);
    console.log(this.user);
  }

  getUser(id) {
    this.userService.getUtilisateur(id).subscribe(
      res => {
        this.user = res;
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }

  // getUser(){
  //   let tok = localStorage.getItem('token')
  //  let decod = jwt_decod(tok)
  //   console.log(decod.user)
  //   this.user = decod.user
  // }
}
