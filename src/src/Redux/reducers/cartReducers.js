/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-case-declarations */
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../Constants';

export const cartReducer = (state = { cartItems: [] }, { type, payload }) => {
  switch (type) {
    case CART_ADD_ITEM:
      const item = payload;

      const existItem = state.cartItems.find((x) => x.book === item.book);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => (x.book === existItem.book ? item : x)),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.book !== payload),
      };
    default:
      return state;
  }
};
