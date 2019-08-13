import { Order } from 'src/app/models/order';
import { User } from 'src/app/models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import jwt_decod from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  id: string;
  id2: number;
  user: User;
  orders: Order[];
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getUser(this.id);
    console.log(this.id);
    console.log(this.user);
    this.getOrderFromUser();
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

  getOrderFromUser() {
    this.id2 = +this.id;
    return this.orderService.getAllOrderForUser(null, null, null, this.id2).subscribe(
      (res) => {
        this.orders = res;
      },
      (err) => {
        console.log(err);
      });
  }

}
