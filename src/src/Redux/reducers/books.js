import {
  SET_BOOKS, SET_IS_LOADING, GET_BOOK, CLEAN_BOOK,
} from '../constants';

const initialState = {
  isLoading: true,
  items: [],
  oneBook: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_BOOKS:
      return {
        ...state,
        items: payload,
        isLoading: false,
      };
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: payload,
      };
    case GET_BOOK:
      return {
        ...state,
        oneBook: payload,
      };
    case CLEAN_BOOK:
      return {
        ...state,
        cleanBook: payload,
      };
    default:
      return state;
  }
};
