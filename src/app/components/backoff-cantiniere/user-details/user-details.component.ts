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
  menuInOrder: Menu;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private menuservice: MenuService
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

  findOrderDetails(menuId) {
    console.log('menuId before getMenu', menuId);

    this.menuservice.getMenu(menuId).subscribe(
      (res) => {
        console.log('menuId après getMenu', menuId);
        console.log('res après getMenu', menuId);
        this.menuInOrder = res;
      },
      (err) => {
        console.log('erreur findOrderDetails : ', err);
      }
    );
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
        console.log(res);

        this.orders = res;
      },
      (err) => {

      });
  }
}
