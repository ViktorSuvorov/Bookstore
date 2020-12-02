/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { getBooks } from '../../Api/Book/index';

import { SET_BOOKS } from '../constants';

export const setBooks = (books) => ({
  type: SET_BOOKS,
  payload: books,
});

export const getAllBooks = () => async (dispatch) => {
  try {
    const response = await getBooks();
    console.log('res from store', response);
    dispatch(setBooks(response.data));
  } catch (error) {
    console.error(error.message);
  }
};
