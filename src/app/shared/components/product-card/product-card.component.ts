import { ShoppingCart } from "shared/models/shopping-cart";
import { Product } from "shared/models/product";
import { ShoppingCartService } from "shared/services/shopping-cart.service";
import { Component, Input } from "@angular/core";
import { ShoppingCartItem } from "shared/models/shopping-cart-item";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent {
  @Input("product") product;
  @Input("show-actions") showActions = true;
  @Input("shopping-cart") shoppingCart;

  constructor(private cartService: ShoppingCartService) {}

  addtoCart() {
    this.cartService.addToCart(this.product);
  }
}
