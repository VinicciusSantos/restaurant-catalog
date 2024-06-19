import { Action } from "redux";

import { IState } from "../root-reducer";
import { Item } from "../../../infra/data/menu/models/menu.types";

export interface BasketState {
  items: Array<Item>;
  total: number;
}

export const initialState: BasketState = {
  items: [
    {
      id: 1,
      name: "Coca Cola",
      description: "Coca Cola 350ml",
      alcoholic: 0,
      price: 3.5,
      position: 1,
      visible: 1,
      availabilityType: "available",
      available: true,
      modifiers: [],
    },
    {
      id: 2,
      name: "Pepsi",
      description: "Pepsi 350ml",
      alcoholic: 0,
      price: 3.5,
      position: 2,
      visible: 1,
      availabilityType: "available",
      available: true,
      modifiers: [],
    },
  ],
  total: 300,
};

export function basketReducer(
  state: BasketState = { ...initialState },
  action: Action
) {
  switch (action.type) {
    case "calculating_basket":
      return {
        ...state,
      };
    default:
      return state;
  }
}

export function selectItems(state: IState): Array<Item> {
  return state.basket.items;
}

export function selectBasketTotal(state: IState): number {
  return state.basket.total;
}
