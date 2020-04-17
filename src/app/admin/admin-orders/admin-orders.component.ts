import { OrderService } from "./../../service/order.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Order } from "src/app/model/order";

@Component({
  selector: "admin-orders",
  templateUrl: "./admin-orders.component.html",
  styleUrls: ["./admin-orders.component.css"],
})
export class AdminOrdersComponent implements OnInit {
  orders$: Observable<any[]>;
  order: any;

  constructor(private orderservice: OrderService) {}

  ngOnInit() {
    this.orders$ = this.orderservice.getOrders();
  }
}
