import { IItem, Item } from "./../model/product";
import { map, take } from "rxjs/operators";
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

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.object("/shopping-cart/" + cartId).valueChanges();
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem("cartId");
    if (cartId) {
      return cartId;
    }

    let result = await this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object("/shopping-cart/" + cartId + "/items/" + productId);
  }

  async addToCart(product) {
    this.updateCartQuantity(product, 1);
  }

  async removeFromCart(product) {
    this.updateCartQuantity(product, -1);
  }

  private async updateCartQuantity(product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.id);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: IItem) => {
        if (!item) {
          item$.set({ product, quantity: change > 0 ? 1 : 0 });
        } else {
          item$.update({ quantity: item.quantity + change });
        }
      });
  }
}
