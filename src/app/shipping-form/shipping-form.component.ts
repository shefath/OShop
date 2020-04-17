import { AuthService } from "./../auth.service";
import { OrderService } from "./../service/order.service";
import { Subscription } from "rxjs";
import { ShoppingCart } from "./../model/shopping-cart";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Order } from "../model/order";
import { Router } from "@angular/router";

@Component({
  selector: "shipping-form",
  templateUrl: "./shipping-form.component.html",
  styleUrls: ["./shipping-form.component.css"],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input("cart") cart: ShoppingCart;
  shipping = {};
  userId: string;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private route: Router
  ) {}

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(
      (x) => (this.userId = x.uid)
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  async placeOrder(form) {
    this.shipping = { ...form };
    const order = new Order(this.userId, this.shipping, this.cart);

    const result = await this.orderService.placeOrder(order);
    this.route.navigate(["/order-success", result.key]);
  }
}
