import { IItem, Product } from "shared/models/product";
import { map, take } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/database";
import { ShoppingCart } from "shared/models/shopping-cart";

@Injectable({
  providedIn: "root",
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db
      .object("/shopping-cart/" + cartId)
      .valueChanges()
      .pipe(
        map((x: any) => {
          x = x || {};
          return new ShoppingCart(x.items);
        })
      );
  }

  async addToCart(product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-cart/" + cartId + "/items").remove();
    //localStorage.removeItem("cartId");
  }

  private create() {
    return this.db.list("/shopping-cart").push({
      dateCreated: new Date().getTime(),
    });
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

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.$key);
    item$
      .valueChanges()
      .pipe(take(1))
      .subscribe((item: IItem) => {
        if (!item) {
          item$.set({
            //product,
            title: product.title,
            imageUrl: product.imageUrl,
            price: product.price,
            quantity: change > 0 ? 1 : 0,
          });
        } else {
          item$.update({ quantity: item.quantity + change });
          if (item.quantity === 1 && change === -1) {
            item$.remove();
          }
        }
      });
  }
}
