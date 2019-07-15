import { Component, OnInit } from "@angular/core";
import { UserService } from 'src/app/services/user.service';
import jwt_decod from 'jwt-decode'
@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.css"]
})
export class MyAccountComponent implements OnInit {
  id: string;
  user: Object;
  constructor( private userService: UserService,) {}

  ngOnInit() {
    this.getUser()
  }

  getUser(){
    let tok = localStorage.getItem('token')
   let decod = jwt_decod(tok)
    console.log(decod.user)
    this.user = decod.user
  }
}
