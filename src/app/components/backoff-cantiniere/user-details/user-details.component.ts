import { Menu } from 'src/app/models/menu';
import { MenuService } from './../../../services/menu.service';
import { Order } from 'src/app/models/order';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  id: string;
  id2: number;
  user: User;
  amount: number;
  orders: Order[];

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private route: ActivatedRoute,
    private orderService: OrderService,
  ) {
    this.route.params.subscribe(params => this.id = params.id);
  }

  ngOnInit() {
    this.userDetail(this.id);
    this.getOrderFromUser();
  }

  openSolder(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-solder' });
  }

  openCrediter(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-crediter' });
  }

  userDetail(id) {
    this.userService.getUtilisateur(id).subscribe(res => {
      this.user = res;
    });
  }

  crediter(form: NgForm) {
    this.amount = form.value.amount;

    this.userService
      .crediterUtilisateur(this.id, this.amount)
      .subscribe(wallet => {
        form.reset();
        window.location.reload();
      });
  }

  debiter(form: NgForm) {
    this.amount = form.value.amount;

    this.userService
      .debiterUtilisateur(this.id, this.amount)
      .subscribe(wallet => {
        form.reset();
        window.location.reload();
      });
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
