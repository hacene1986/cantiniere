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
  // public users: Array<User>;
  users: Array<User>;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getAllUtilisateur();
    // this.users = [
    //   {
    //     id: 1,
    //     firstname: "Kevin",
    //     name: "Croquette",
    //     email: "kevincroquette@gmail.com"
    //   },
    //   {
    //     id: 2,
    //     firstname: "Jean",
    //     name: "Choucroute",
    //     email: "jeanchoucroute@gmail.com"
    //   }
    // ];

    // this.getAllUtilisateur();
  }

  getAllUtilisateur() {
    this.userService.getAllUtilisateur().subscribe(
      response => {
        console.log(response);
        this.users = response;
        // console.log('list of users: ' + this.users);
      },
      error => {
        console.log(error);
      }
    );
  }
}
