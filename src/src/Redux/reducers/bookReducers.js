import {
  BOOKS_LIST_FAIL,
  BOOKS_LIST_SUCCESS,
  BOOKS_LIST_REQUEST,
  BOOKS_DETAILS_SUCCESS,
  BOOKS_DETAILS_FAIL,
  BOOKS_DETAILS_REQUEST,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAIL,
  BOOK_CREATE_RESET,
  BOOK_CREATE_FAIL,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_REQUEST,
  BOOK_UPDATE_REQUEST,
  BOOK_UPDATE_SUCCESS,
  BOOK_UPDATE_FAIL,
  BOOK_UPDATE_RESET,
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
        books: payload.books,
        pages: payload.pages,
        page: payload.page,
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

export const bookDeleteReducer = (
  state = {},
  { type, payload },
) => {
  switch (type) {
    case BOOK_DELETE_REQUEST:
      return {
        isLoading: true,
      };
    case BOOK_DELETE_SUCCESS:
      return {
        isLoading: false,
        success: true,
      };
    case BOOK_DELETE_FAIL:
      return {
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const bookCreateReducer = (
  state = {},
  { type, payload },
) => {
  switch (type) {
    case BOOK_CREATE_REQUEST:
      return {
        isLoading: true,
      };
    case BOOK_CREATE_SUCCESS:
      return {
        isLoading: false,
        success: true,
        book: payload,
      };
    case BOOK_CREATE_FAIL:
      return {
        isLoading: false,
        error: payload,
      };
    case BOOK_CREATE_RESET:
      return {
      };
    default:
      return state;
  }
};

export const bookUpdateReducer = (
  state = { book: {} },
  { type, payload },
) => {
  switch (type) {
    case BOOK_UPDATE_REQUEST:
      return {
        isLoading: true,
      };
    case BOOK_UPDATE_SUCCESS:
      return {
        isLoading: false,
        success: true,
        book: payload,
      };
    case BOOK_UPDATE_FAIL:
      return {
        isLoading: false,
        error: payload,
      };
    case BOOK_UPDATE_RESET:
      return { book: {} };
    default:
      return state;
  }
};
