import { Product } from "./../model/product";
import { switchMap } from "rxjs/operators";
import { ProductService } from "./../service/product.service";
import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent {
  products: Product[] = [];
  filteredProducts: any[] = [];
  category: string;

  constructor(route: ActivatedRoute, private productService: ProductService) {
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
}
