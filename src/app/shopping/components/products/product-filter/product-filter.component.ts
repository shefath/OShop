import { CategoryService } from "shared/services/category.service";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "product-filter",
  templateUrl: "./product-filter.component.html",
  styleUrls: ["./product-filter.component.css"],
})
export class ProductFilterComponent {
  category$;
  @Input("category") category: string;

  constructor(categoryService: CategoryService) {
    this.category$ = categoryService.getAll();
  }
}
