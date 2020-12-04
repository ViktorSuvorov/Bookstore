/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from '../indexApi';

const path = 'books/';
const PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH';
const PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW';

// Реализовать позже
const filter = (sorting) => {
  let sortField;
  let sortOrder;
  if (sorting === PRICE_LOW_TO_HIGH) {
    sortField = 'price';
    sortOrder = 'asc';
  }
  if (sorting === PRICE_HIGH_TO_LOW) {
    sortField = 'price';
    sortOrder = 'desc';
  }
  return { sortField, sortOrder };
};

export const getBooks = (arg) => (
  axios({
    url: `${path}`,
    params: {
      ...arg,
    },
  })
);

export const getCurrentBook = (id) => (
  axios({
    url: `${path}${id}`,
  })
);
