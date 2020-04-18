import { OrderService } from "shared/services/order.service";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

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
