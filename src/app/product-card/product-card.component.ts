import { Product } from "./../model/product";
import { ShoppingCartService } from "./../service/shopping-cart.service";
import { Component, Input } from "@angular/core";

@Component({
  selector: "product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.css"],
})
export class ProductCardComponent {
  @Input("product") product: Product;
  @Input("show-actions") showActions = true;

  constructor(private cartService: ShoppingCartService) {}

  addtoCart(product) {}
}
