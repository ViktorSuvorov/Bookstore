/* eslint-disable no-unused-vars */
import { getBooks, getCurrentBook } from '../../Api/Book/bookApi';

import {
  BOOKS_LIST_SUCCESS,
  BOOKS_LIST_REQUEST,
  BOOKS_LIST_FAIL,
  BOOKS_DETAILS_REQUEST,
  BOOKS_DETAILS_SUCCESS,
  BOOKS_DETAILS_FAIL,
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

export const getBooksList = (arg) => async (dispatch) => {
  try {
    const { data } = await getBooks(arg);
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
