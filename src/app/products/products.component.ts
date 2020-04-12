import { Subscription } from "rxjs";
import { ShoppingCartService } from "./../service/shopping-cart.service";
import { Product } from "./../model/product";
import { switchMap } from "rxjs/operators";
import { ProductService } from "./../service/product.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: any[] = [];
  category: string;
  cart: any;
  subscription: Subscription;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private cartService: ShoppingCartService
  ) {
    productService
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return route.queryParamMap;
        })
      )
      .subscribe((param) => {
        this.category = param.get("category");

        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).subscribe(
      (cart) => (this.cart = cart)
    );
  }
}
