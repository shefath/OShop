import { map } from "rxjs/operators";
import { ShoppingCartService } from "./shopping-cart.service";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { Order } from "shared/models/order";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService
  ) {}

  async placeOrder(order) {
    const result = await this.db.list("/orders").push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders() {
    return this.db
      .list("/orders")
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.val();
            const key = a.payload.key;

            return {
              orderId: key,
              ...(data as Order),
            } as Order;
          });
        })
      );
  }

  getOrdersByUser(userId: string) {
    // console.log("USER ID", userId);
    // userId = "2xSJ2zD1CKdgOcKbVbuKFN5oblF2";
    return this.db
      .list("/orders", (ref) => {
        return ref.orderByChild("userId").equalTo(userId);
      })
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.val();
            const key = a.payload.key;
            return { orderId: key, ...(data as Order) } as Order;
          });
        })
      );
  }
}
