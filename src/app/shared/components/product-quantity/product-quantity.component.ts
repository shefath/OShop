import { ShoppingCart } from "shared/models/shopping-cart";
import { Product } from "shared/models/product";
import { ShoppingCartService } from "shared/services/shopping-cart.service";
import { Component, Input } from "@angular/core";

@Component({
  selector: "product-quantity",
  templateUrl: "./product-quantity.component.html",
  styleUrls: ["./product-quantity.component.css"],
})
export class ProductQuantityComponent {
  // tslint:disable-next-line: no-input-rename
  @Input("product") product: Product;
  // tslint:disable-next-line: no-input-rename
  @Input("shopping-cart") shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  addtoCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
