import { Component, Input } from "@angular/core";
import { Order } from "shared/models/order";

@Component({
  selector: "orders-summary",
  templateUrl: "./orders-summary.component.html",
  styleUrls: ["./orders-summary.component.css"],
})
export class OrdersSummaryComponent {
  @Input("orders") orders: Order[];
  order: any;

  constructor() {}

  viewOrderDetail(order) {
    this.order = order || {};
  }
}
