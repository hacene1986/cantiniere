import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-user-account",
  templateUrl: "./user-account.component.html",
  styleUrls: ["./user-account.component.css"]
})
export class UserAccountComponent implements OnInit {
  public searchText: string;
  users: Array<User>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getAllUtilisateur();
  }

  getAllUtilisateur() {
    this.userService.getAllUtilisateur().subscribe(
      response => {
        console.log(response);
        this.users = response;
      },
      error => {
        console.log(error);
      }
    );
  }
}
