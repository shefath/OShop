import { map } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable({
  providedIn: "root",
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  create() {
    return this.db.list("/shopping-cart").push({
      dateCreated: new Date().getTime(),
    });
  }

  private get(cartId) {
    return this.db
      .object("/shopping-cart/" + cartId)
      .snapshotChanges()
      .pipe(
        map((actions) => {
          const id = actions.payload.key;
          const data = actions.payload.val();
          return { id, data };
        })
      );
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem("cartId");
    if (cartId) {
      return cartId;
    }

    let result = await this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }

  async addToCart(product) {
    const cartId = await this.getOrCreateCartId();
    let item$ = this.db.object(
      "/shopping-cart/" + cartId + "/items/" + product.id
    );
  }
}
