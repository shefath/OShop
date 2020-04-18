import { switchMap } from "rxjs/operators";
import { AuthService } from "shared/services/auth.service";
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { OrderService } from "shared/services/order.service";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.css"],
})
export class MyOrdersComponent {
  orders$: Observable<any[]>;
  order: any;

  constructor(authService: AuthService, orderservice: OrderService) {
    this.orders$ = authService.user$.pipe(
      switchMap((u) => orderservice.getOrdersByUser(u.uid))
    );
  }
}
