import { Product } from "shared/models/product";
import { take } from "rxjs/operators";
import { ProductService } from "shared/services/product.service";
import { CategoryService } from "shared/services/category.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit {
  productId;
  categories$;
  product: Product = {
    title: "",
    $key: "",
    category: "",
    imageUrl: "",
    price: null,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getAll();
    this.productId = this.route.snapshot.paramMap.get("id");

    if (this.productId) {
      // this.productService.get(this.productId).subscribe((res) => {
      //   this.product = res;
      // });
      productService
        .get(this.productId)
        .subscribe((product) => (this.product = product));

      // this.productService
      //   .get(this.productId)
      //   .pipe(take(1))
      //   .subscribe((res) => (this.product = res));
    }
  }

  ngOnInit(): void {}

  save(product) {
    if (this.productId) {
      this.productService.update(this.productId, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(["/admin/products"]);
  }
  delete() {
    if (!confirm("Do you want to delete this product ?")) return;
    this.productService.delete(this.productId);
    this.router.navigate(["/admin/products"]);
  }
}
