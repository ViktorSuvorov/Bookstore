import { ADD_BOOK_TO_CART, REMOVE_BOOK_FROM_CART } from '../constants';

const initialState = {
  items: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_BOOK_TO_CART:
      return {
        ...state,
        items: [
          ...state.items,
          payload],
      };
    case REMOVE_BOOK_FROM_CART:
      return {
        ...state,
        items: state.items.filter((book) => book.id !== payload),
      };
    default:
      return state;
  }
};
