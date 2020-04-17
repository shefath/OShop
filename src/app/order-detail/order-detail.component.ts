import { Component, Input } from "@angular/core";
import { Order } from "../model/order";

@Component({
  selector: "order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.css"],
})
export class OrderDetailComponent {
  @Input("order") order: Order;

  getOrderTotal() {
    let sum = 0;
    if (this.order) {
      this.order.items.forEach((item) => {
        sum += item.totalPrice;
      });
    }
    return sum;
  }
}
