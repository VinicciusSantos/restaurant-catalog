import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Basket, BasketItem } from "../../../domain/models";

export interface BasketState {
  basket: Basket | null;
}

const initialState: BasketState = {
  basket: {
    items: [
      {
        quantity: 4,
        item: {
          id: 1625701,
          name: "Hard Core",
          description:
            "180g angus beef burger, with shredded ribs, gruyere cheese, caramelized onions, lettuce, confit tomato, special house bread, served with fried cassava and passion fruit chipotle.",
          alcoholic: 0,
          price: 33.0,
          position: 0,
          visible: 1,
          availabilityType: "AVAILABLE_NOW",
          sku: "I1625701",
          images: [
            {
              id: 108305,
              image:
                "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbdc8cecca.png",
            },
          ],
          available: true,
        },
      },
    ],
  },
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addOneToBasket(state, action: PayloadAction<BasketItem>) {
      const item = action.payload;
      const existingItem = state.basket?.items.find(
        (i) => i.item.id === item.item.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.basket?.items.push(item);
      }
    },
    removeOneFromBasket(state, action: PayloadAction<BasketItem>) {
      const item = action.payload;
      const existingItem = state.basket?.items.find(
        (i) => i.item.id === item.item.id
      );
      if (existingItem) {
        existingItem.quantity -= 1;

        if (existingItem.quantity === 0) {
          state.basket!.items = state.basket!.items.filter(
            (i) => i.item.id !== item.item.id
          );
        }
      }
    },
  },
});

export const { addOneToBasket, removeOneFromBasket } = basketSlice.actions;

export const basketReducer = basketSlice.reducer;
