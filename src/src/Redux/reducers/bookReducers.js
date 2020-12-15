import {
  BOOKS_LIST_FAIL,
  BOOKS_LIST_SUCCESS,
  BOOKS_LIST_REQUEST,
  BOOKS_DETAILS_SUCCESS,
  BOOKS_DETAILS_FAIL,
  BOOKS_DETAILS_REQUEST,
} from '../constants';

const initialState = {
  isLoading: true,
  books: [],
};

export const bookListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case BOOKS_LIST_REQUEST:
      return {
        isLoading: true,
        books: [],
      };
    case BOOKS_LIST_SUCCESS:
      return {
        isLoading: false,
        books: payload,
      };
    case BOOKS_LIST_FAIL:
      return {
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const bookDetailsReducer = (
  state = { book: { reviews: [] } },
  { type, payload },
) => {
  switch (type) {
    case BOOKS_DETAILS_REQUEST:
      return {
        isLoading: true,
        ...state,
      };
    case BOOKS_DETAILS_SUCCESS:
      return {
        isLoading: false,
        book: payload,
      };
    case BOOKS_DETAILS_FAIL:
      return {
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
