/* eslint-disable no-unused-vars */
import {
  getBooks,
  getCurrentBook,
  deleteBookById,
  createBookApi,
  updateBookFromApi,
  createReviewBookApi,
  updateReviewFromApi,
  deleteReviewById,
} from '../../Api/Book/bookApi';

import {
  BOOKS_LIST_SUCCESS,
  BOOKS_LIST_REQUEST,
  BOOKS_LIST_FAIL,
  BOOKS_DETAILS_REQUEST,
  BOOKS_DETAILS_SUCCESS,
  BOOKS_DETAILS_FAIL,
  BOOK_DELETE_FAIL,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_REQUEST,
  BOOK_CREATE_RESET,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAIL,
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

export const bookListRequest = () => ({
  type: BOOKS_LIST_REQUEST,
});

export const bookListSuccess = (books) => ({
  type: BOOKS_LIST_SUCCESS,
  payload: books,
});

export const bookListError = (error) => ({
  type: BOOKS_LIST_FAIL,
  payload: error,
});

export const bookDeleteRequest = () => ({
  type: BOOK_DELETE_REQUEST,
});

export const bookDeleteSuccess = () => ({
  type: BOOK_DELETE_SUCCESS,
});

export const bookDeleteError = (error) => ({
  type: BOOK_DELETE_FAIL,
  payload: error.data.message,
});

export const bookDetailsRequest = () => ({
  type: BOOKS_DETAILS_REQUEST,
});

export const bookDetailsSuccess = (books) => ({
  type: BOOKS_DETAILS_SUCCESS,
  payload: books,
});

export const bookDetailsError = (error) => ({
  type: BOOKS_DETAILS_FAIL,
  payload: error.data.message,
});

export const bookCreateRequest = () => ({
  type: BOOK_CREATE_REQUEST,
});

export const bookCreateSuccess = (data) => ({
  type: BOOK_CREATE_SUCCESS,
  payload: data,
});

export const bookCreateError = (error) => ({
  type: BOOK_CREATE_FAIL,
  payload: error.data.message,
});

export const bookCreateReset = () => ({
  type: BOOK_CREATE_RESET,
});

export const bookCreateReviewRequest = () => ({
  type: BOOK_CREATE_REVIEW_REQUEST,
});

export const bookCreateReviewSuccess = () => ({
  type: BOOK_CREATE_REVIEW_SUCCESS,
});

export const bookCreateReviewError = (error) => ({
  type: BOOK_CREATE_REVIEW_FAIL,
  payload: error.data.message,
});

export const bookCreateReviewReset = () => ({
  type: BOOK_CREATE_REVIEW_RESET,
});

export const bookUpdateRequest = () => ({
  type: BOOK_UPDATE_REQUEST,
});

export const bookUpdateSuccess = (data) => ({
  type: BOOK_UPDATE_SUCCESS,
  payload: data,
});

export const bookUpdateError = (error) => ({
  type: BOOK_UPDATE_FAIL,
  payload: error.data.message,
});

export const bookUpdateReset = () => ({
  type: BOOK_UPDATE_RESET,
});

export const reviewUpdateRequest = () => ({
  type: REVIEW_UPDATE_REQUEST,
});

export const reviewUpdateSuccess = (data) => ({
  type: REVIEW_UPDATE_SUCCESS,
  payload: data,
});

export const reviewUpdateError = (error) => ({
  type: REVIEW_UPDATE_FAIL,
  payload: error.data.message,
});

export const reviewUpdateReset = () => ({
  type: REVIEW_UPDATE_RESET,
});

export const reviewDeleteRequest = () => ({
  type: REVIEW_DELETE_REQUEST,
});

export const reviewDeleteSuccess = () => ({
  type: REVIEW_DELETE_SUCCESS,
});

export const reviewDeleteError = (error) => ({
  type: REVIEW_DELETE_FAIL,
  payload: error.data.message,
});

export const getBooksList = (filter, pageNumber = '', keyword = '') => async (
  dispatch,
) => {
  try {
    const { data } = await getBooks(filter, pageNumber, keyword);
    dispatch(bookListRequest());
    dispatch(bookListSuccess(data));
  } catch (error) {
    dispatch(bookListError(error));
  }
};

export const getBookDetails = (id) => async (dispatch) => {
  try {
    const { data } = await getCurrentBook(id);
    dispatch(bookDetailsRequest());
    dispatch(bookDetailsSuccess(data));
  } catch (error) {
    dispatch(bookDetailsError(error));
  }
};

export const deleteBook = (id) => async (dispatch, getState) => {
  try {
    dispatch(bookDeleteRequest());
    await deleteBookById(id, getState);

    dispatch(bookDeleteSuccess());
  } catch (error) {
    dispatch(bookDeleteError(error));
  }
};

export const createBook = () => async (dispatch, getState) => {
  try {
    const { data } = await createBookApi(getState);
    dispatch(bookCreateRequest());
    dispatch(bookCreateSuccess(data));
  } catch (error) {
    dispatch(bookCreateError(error));
  }
};

export const updateBook = (book) => async (dispatch, getState) => {
  try {
    const { data } = await updateBookFromApi(getState, book);
    dispatch(bookUpdateRequest());
    dispatch(bookUpdateSuccess(data));
  } catch (error) {
    dispatch(bookUpdateError(error));
  }
};

export const createBookReview = (bookId, review) => async (
  dispatch,
  getState,
) => {
  try {
    await createReviewBookApi(getState, bookId, review);
    dispatch(bookCreateReviewRequest());
    dispatch(bookCreateReviewSuccess());
  } catch (error) {
    dispatch(bookCreateReviewError(error));
  }
};

export const updateReview = (review) => async (dispatch, getState) => {
  try {
    const { data } = await updateReviewFromApi(getState, review);
    dispatch(reviewUpdateRequest());
    dispatch(reviewUpdateSuccess(data));
  } catch (error) {
    dispatch(bookUpdateError(error));
  }
};

export const deleteReview = (reviewId, id) => async (dispatch, getState) => {
  try {
    dispatch(reviewDeleteRequest());
    await deleteReviewById(reviewId, id, getState);

    dispatch(reviewDeleteSuccess());
  } catch (error) {
    dispatch(reviewDeleteError(error));
  }
};
