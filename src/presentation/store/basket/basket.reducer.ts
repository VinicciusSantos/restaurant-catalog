import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Basket, Item } from "../../../domain/models";

export interface BasketState {
  basket: Basket | null;
  draftBasket: Basket | null;
}

const initialState: BasketState = {
  basket: {
    items: [],
  },
  draftBasket: {
    items: [],
  },
};

interface BasketActionPayload {
  env?: "default" | "draft";
  item: Item;
}

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addOneToBasket(state, action: PayloadAction<BasketActionPayload>) {
      const { item } = action.payload;
      const envSelected =
        action.payload.env === "draft" ? state.draftBasket : state.basket;

      const existingItem = envSelected!.items.find(
        (i) => i.item.id === item.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        envSelected!.items.push({
          item,
          quantity: 1,
        });
      }
    },
    removeOneFromBasket(state, action: PayloadAction<BasketActionPayload>) {
      const { item } = action.payload;
      const envSelected =
        action.payload.env === "draft" ? state.draftBasket : state.basket;

      const existingItem = envSelected!.items.find(
        (i) => i.item.id === item.id
      );
      if (existingItem && existingItem.quantity) {
        existingItem.quantity -= 1;

        if (existingItem.quantity === 0) {
          state.basket!.items = state.basket!.items.filter(
            (i) => i.item.id !== item.id
          );
        }
      }
    },
    resetDraftBasket(state) {
      state.draftBasket = state.basket;
    },
    syncBasket(state) {
      state.basket = state.draftBasket;
    },
  },
});

export const {
  addOneToBasket,
  removeOneFromBasket,
  syncBasket,
  resetDraftBasket,
} = basketSlice.actions;

export const basketReducer = basketSlice.reducer;
