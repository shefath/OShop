import { Subscription } from "rxjs";
import { CustomFormsModule } from "ng2-validation";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ShoppingCartService } from "shared/services/shopping-cart.service";

@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html",
  styleUrls: ["./shopping-cart.component.css"],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart;
  subscription: Subscription;

  constructor(private cartService: ShoppingCartService) {}

  clearCart() {
    this.cartService.clearCart();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe((cart) => {
      this.cart = cart;
      // console.log("cart ", cart.items, " ", this.cart);
    });
  }
}
