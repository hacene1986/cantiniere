import { Component, OnInit } from "@angular/core";
import { Order } from "src/app/models/order";
import { OrderService } from "src/app/services/order.service";

@Component({
  selector: "app-recap-cantiniere",
  templateUrl: "./recap-cantiniere.component.html",
  styleUrls: ["./recap-cantiniere.component.css"]
})
export class RecapCantiniereComponent implements OnInit {
  orders: Array<Order>;
  public searchText: string;

  constructor(private OrderService: OrderService) {}

  ngOnInit() {
    this.recapOrder();
    // this.menu()
  }

  recapOrder() {
    this.OrderService.getAllOrder().subscribe(res => {
      console.log(res);
      this.orders = res;
    });
  }
}
