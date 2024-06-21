import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Item, ModifierItem } from "../../../domain/models";

interface StoredModifier extends ModifierItem {
  quantity: number;
}

interface BasketEnv {
  items: {
    item: Item;
    quantity: number;
    modifiers: StoredModifier[];
  }[];
  total: number;
}

export interface BasketState {
  basket: BasketEnv | null;
  draftBasket: BasketEnv | null;
}

const initialState: BasketState = {
  basket: {
    items: [],
    total: 0,
  },
  draftBasket: {
    items: [],
    total: 0,
  },
};

interface BasketActionPayload {
  env?: "default" | "draft";
  item: Item;
}

interface ChangeModifierPayload extends BasketActionPayload {
  modifier: ModifierItem;
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
          modifiers: [],
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
    ChangeModifier(state, action: PayloadAction<ChangeModifierPayload>) {
      const { item, modifier } = action.payload;
      const envSelected =
        action.payload.env === "draft" ? state.draftBasket : state.basket;

      const existingItem = envSelected!.items.find(
        (i) => i.item.id === item.id
      );
      if (!existingItem) {
        envSelected!.items.push({
          item,
          quantity: 1,
          modifiers: [{ ...modifier, quantity: 1 }],
        });
      }
      envSelected!.items.find((i) => i.item.id === item.id)!.modifiers = [
        { ...modifier, quantity: 1 },
      ];
    },
    resetDraftBasket(state) {
      state.draftBasket = state.basket;
    },
    syncBasket(state) {
      state.basket = state.draftBasket;
    },
  },
});

export const calculateBasketTotal = (basket: BasketEnv) => {
  return basket!.items.reduce(
    (acc, item) =>
      acc +
      item.quantity *
        (item.item.price +
          item.modifiers.reduce(
            (acc, modifier) => acc + modifier.quantity * modifier.price,
            0
          )),
    0
  );
};

export const calculateItemTotal = (item: Item, env?: BasketEnv) => {
  return (
    env?.items.reduce((acc, i) => {
      if (i.item.id === item.id) {
        acc +=
          i.quantity *
          (i.item.price +
            i.modifiers.reduce((acc, m) => acc + m.quantity * m.price, 0));
      }

      return acc;
    }, 0) || 0
  );
};

export const {
  addOneToBasket,
  removeOneFromBasket,
  syncBasket,
  resetDraftBasket,
  ChangeModifier,
} = basketSlice.actions;

export const basketReducer = basketSlice.reducer;
