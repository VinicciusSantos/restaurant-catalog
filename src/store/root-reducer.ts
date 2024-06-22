import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import { basketReducer, BasketState } from "./basket";
import { menuReducer, MenuState } from "./menu";
import { venueReducer, VenueState } from "./venue";

export interface IState {
  basket: BasketState;
  menu: MenuState;
  venue: VenueState;
}

export const store = configureStore({
  reducer: combineReducers({
    basket: basketReducer,
    venue: venueReducer,
    menu: menuReducer,
  }),
});
