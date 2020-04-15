import { ShoppingCartItem, IShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  // constructor(public itemsMap: IShoppingCartItem[]) {
  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = this.itemsMap || {};
    // tslint:disable-next-line: forin
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      this.items.push(
        new ShoppingCartItem({
          ...item,
          $key: productId,
        })
      );
    }
  }

  getProductQty(productId) {
    let qty = 0;
    this.items.forEach((item) => {
      if (item.$key === productId) {
        qty = item.quantity;
        return qty;
      }
    });
    return qty;
  }

  get totalItemsCount() {
    let count = 0;
    this.items.forEach((item) => {
      count += item.quantity;
    });
    return count;
  }

  get totalAmount() {
    let sum = 0;
    this.items.forEach((item) => {
      if (item.quantity > 0) {
        sum += item.totalPrice;
      }
    });
    return sum;
  }
}

// export class ShopppingCart {
//   constructor(public items: ShoppingCartItem[]) {
//     console.log("items", items);
//   }

//   get productIds() {
//     return Object.keys(this.items);
//   }

//   get totalItemsCount() {
//     let count = 0;
//     // tslint:disable-next-line: forin
//     for (let productid in this.items) {
//       count += this.items[productid].quantity;
//     }
//     return count;
//   }
// }
