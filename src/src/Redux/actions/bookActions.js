/* eslint-disable no-unused-vars */
import {
  getBooks, getCurrentBook, deleteBookById, createBookApi, updateBookApi,
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
  payload:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
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
  payload:
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
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

export const getBooksList = (arg, pageNumber = '') => async (dispatch) => {
  try {
    const { data } = await getBooks(arg, pageNumber);
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
    dispatch(bookDetailsError());
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
    const { data } = await updateBookApi(getState, book);
    dispatch(bookUpdateRequest());
    dispatch(bookUpdateSuccess(data));
  } catch (error) {
    dispatch(bookUpdateError(error));
  }
};
