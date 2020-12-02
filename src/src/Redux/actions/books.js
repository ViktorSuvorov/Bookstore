/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { getBooks, getCurrentBook } from '../../Api/Book';

import { SET_BOOKS, GET_BOOK } from '../constants';

export const setBooks = (books) => ({
  type: SET_BOOKS,
  payload: books,
});

export const getBook = (id) => ({
  type: GET_BOOK,
  payload: id,
});

export const getAllBooks = () => async (dispatch) => {
  try {
    const response = await getBooks();
    dispatch(setBooks(response.data));
  } catch (error) {
    console.error(error.message);
  }
};

export const getOneBook = (id) => async (dispatch) => {
  try {
    const response = await getCurrentBook(id);
    dispatch(getBook(response.data));
  } catch (error) {
    console.error(error.message);
  }
};
