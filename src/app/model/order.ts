import { ShoppingCart } from "./shopping-cart";
export interface IOrderItem {
  product: { title: string; imageUrl: string; price: number };
  quantity: number;
  totalPrice: number;
}
export class Order {
  datePlaced: number = new Date().getTime();
  items: IOrderItem[];

  constructor(
    public userId: string,
    public shipping: any,
    shoppingCart: ShoppingCart
  ) {
    this.items = shoppingCart.items.map((i) => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price,
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice,
      };
    });
  }
}
