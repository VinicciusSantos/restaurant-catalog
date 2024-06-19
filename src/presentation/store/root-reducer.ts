import { combineReducers } from 'redux';

import { basketReducer, BasketState } from './basket';

export interface IState {
  basket: BasketState;
}

export const rootReducer = combineReducers({
  basket: basketReducer,
});
