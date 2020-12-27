/* eslint-disable no-case-declarations */
/* eslint-disable import/prefer-default-export */
import { FAVORITE_ADD_ITEM, FAVORITE_REMOVE_ITEM } from '../Constants';

export const favoriteReducer = (state = { favoriteItems: [] }, { type, payload }) => {
  switch (type) {
    case FAVORITE_ADD_ITEM:
      const item = payload;

      const existItem = state.favoriteItems.find((x) => x.book === item.book);
      if (existItem) {
        return {
          ...state,
          favoriteItems: state.favoriteItems.map((x) => (x.book === existItem.book ? item : x)),
        };
      }
      return {
        ...state,
        favoriteItems: [...state.favoriteItems, item],
      };
    case FAVORITE_REMOVE_ITEM:
      return {
        ...state,
        favoriteItems: state.favoriteItems.filter((x) => x.book !== payload),
      };
    default:
      return state;
  }
};
