// import { Action, Dispatch } from 'redux';

// import BasketItem from '../../models/BasketItem';
// import { IState } from '../root-reducer';


// export function incrementItem(basketItem: BasketItem) {
//   return (dispatch: Dispatch<Action>, getState: () => IState) => {
//     const state: IState = getState();

// //     // Call this same function after 3 seconds to avoid concurrency
// //     if (state.basket.calculatingBasketInApi) {
// //       return setTimeout(() => {
// //         return incrementItem(basketItem)(dispatch, getState);
// //       }, 3000);
// //     }

// //     dispatch({
// //       type: 'calculating_basket',
// //       payload: true
// //     });

// //     const basketItems = state.basket.items.map((item) => {
// //       if (item.id === basketItem.id) {
// //         return {
// //           ...item,
// //           quantity: item.quantity + 1,
// //         }
// //       }

// //       return item;
// //     });

// //     const newTotal = basketItems.reduce((previousValue: number, currentValue) => {
// //       const basketItemTotal = currentValue.itemPrice * currentValue.quantity;

// //       return previousValue + basketItemTotal;
// //     }, 0);


// //     dispatch({
// //       type: 'update-basket',
// //       payload: basketItems
// //     });

// //     // Simulate a real validate basket
// //     axios.get('https://2486713dae314753ae6b0ff127002d12.api.mockbin.io/')
// //       .then(function () {
// //         dispatch({
// //           type: 'update-basket-totals',
// //           payload: newTotal
// //         });
// //       })
// //       .finally(() => {
// //         dispatch({
// //           type: 'calculating_basket',
// //           payload: false
// //         });
// //       })

// //   }
// }

// export function decrementItem(basketItem: BasketItem) {
// //   return (dispatch: Dispatch<Action>, getState: () => IState) => {
// //     const state: IState = getState();

// //     // Call this same function after 3 seconds to avoid concurrency
// //     if (state.basket.calculatingBasketInApi) {
// //       return setTimeout(() => {
// //         return incrementItem(basketItem)(dispatch, getState);
// //       }, 3000);
// //     }

// //     const foundItem = state.basket.items.find((item) => {
// //       return item.id === basketItem.id;
// //     });

// //     // Disabling 0 quantity
// //     if (foundItem?.quantity === 1) {
// //       return;
// //     }

// //     dispatch({
// //       type: 'calculating_basket',
// //       payload: true
// //     });

// //     const basketItems = state.basket.items.map((item) => {
// //       if (item.id === basketItem.id) {
// //         return {
// //           ...item,
// //           quantity: item.quantity - 1,
// //         }
// //       }

// //       return item;
// //     });

// //     const newTotal = basketItems.reduce((previousValue: number, currentValue) => {
// //       const basketItemTotal = currentValue.itemPrice * currentValue.quantity;

// //       return previousValue + basketItemTotal;
// //     }, 0);

// //     dispatch({
// //       type: 'update-basket',
// //       payload: basketItems
// //     });

// //     // Simulate a real validate basket
// //     axios.get('https://2486713dae314753ae6b0ff127002d12.api.mockbin.io/')
// //       .then(function () {
// //         dispatch({
// //           type: 'update-basket-totals',
// //           payload: newTotal
// //         });
// //       })
// //       .finally(() => {
// //         dispatch({
// //           type: 'calculating_basket',
// //           payload: false
// //         });
// //       })

// //   }
// }