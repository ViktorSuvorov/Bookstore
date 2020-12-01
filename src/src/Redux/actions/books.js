/* eslint-disable import/prefer-default-export */
import { SET_BOOKS } from '../constants';

export const setBooks = (books) => ({
  type: SET_BOOKS,
  payload: books,
});
