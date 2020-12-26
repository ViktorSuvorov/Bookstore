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
  BOOK_CREATE_REVIEW_REQUEST,
  BOOK_CREATE_REVIEW_SUCCESS,
  BOOK_CREATE_REVIEW_FAIL,
  BOOK_CREATE_REVIEW_RESET,
  REVIEW_UPDATE_REQUEST,
  REVIEW_UPDATE_SUCCESS,
  REVIEW_UPDATE_FAIL,
  REVIEW_UPDATE_RESET,
  REVIEW_DELETE_REQUEST,
  REVIEW_DELETE_SUCCESS,
  REVIEW_DELETE_FAIL,
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

export const bookReviewCreateReducer = (
  state = {},
  { type, payload },
) => {
  switch (type) {
    case BOOK_CREATE_REVIEW_REQUEST:
      return {
        isLoading: true,
      };
    case BOOK_CREATE_REVIEW_SUCCESS:
      return {
        isLoading: false,
        success: true,
      };
    case BOOK_CREATE_REVIEW_FAIL:
      return {
        isLoading: false,
        error: payload,
      };
    case BOOK_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const bookReviewUpdateReducer = (
  state = { review: {} },
  { type, payload },
) => {
  switch (type) {
    case REVIEW_UPDATE_REQUEST:
      return {
        isLoading: true,
      };
    case REVIEW_UPDATE_SUCCESS:
      return {
        isLoading: false,
        success: true,
        review: payload,
      };
    case REVIEW_UPDATE_FAIL:
      return {
        isLoading: false,
        error: payload,
      };
    case REVIEW_UPDATE_RESET:
      return { review: {} };
    default:
      return state;
  }
};

export const bookReviewDeleteReducer = (
  state = {},
  { type, payload },
) => {
  switch (type) {
    case REVIEW_DELETE_REQUEST:
      return {
        isLoading: true,
      };
    case REVIEW_DELETE_SUCCESS:
      return {
        isLoading: false,
        success: true,
      };
    case REVIEW_DELETE_FAIL:
      return {
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
