import { Product } from "./../../model/product";
import { Subscription } from "rxjs";
import { ProductService } from "./../../service/product.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: any[] = [];
  filteredProducts: any[];
  subscription: Subscription;

  constructor(private productService: ProductService) {
    this.subscription = this.productService
      .getAll()
      .subscribe(
        (products) => (this.filteredProducts = this.products = products)
      );
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  filter(query: string) {
    this.filteredProducts = query
      ? this.products.filter((p) =>
          p.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
        )
      : this.products;
  }

  ngOnInit(): void {}
}
