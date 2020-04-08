import { ProductService } from "./../../service/product.service";
import { CategoryService } from "./../../service/category.service";
import { Component, OnInit } from "@angular/core";
import { Ptor } from "protractor";
import { Router } from "@angular/router";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"],
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getCategories();
  }

  ngOnInit(): void {}

  save(product) {
    this.productService.create(product);
    //this.router.navigate(['/admin/products'],product.$key);
  }
}
