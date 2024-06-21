import { Item } from "./menu.model";

export interface Basket {
  items: BasketItem[];
}

export interface BasketItem {
  item: Item;
  quantity: number;
}
