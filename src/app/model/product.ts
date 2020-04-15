export interface IProduct {
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface Product {
  $key: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
}

export interface IItem {
  product: Product;
  quantity: number;
}

export interface Item {
  id: string;
  product: Product;
  quantity: number;
}
