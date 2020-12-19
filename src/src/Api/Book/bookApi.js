/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from '../indexApi';

const path = 'books/';
const PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH';
const PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW';

// Реализовать позже
// const filter = (sorting) => {
//   let sortField;
//   let sortOrder;
//   if (sorting === PRICE_LOW_TO_HIGH) {
//     sortField = 'price';
//     sortOrder = 'asc';
//   }
//   if (sorting === PRICE_HIGH_TO_LOW) {
//     sortField = 'price';
//     sortOrder = 'desc';
//   }
//   return { sortField, sortOrder };
// };

// priceLowToHigh,
// priceHighToLow,
// priceMin,
// priceMax,
// sortField,
// sortOrder,
// search,
// author,
// genre,
// name

export const getBooks = (filter, pageNumber, keyword) => (
  axios({
    url: `${path}?pageNumber=${pageNumber}&keyword=${keyword}`,
    params: {
      ...filter,
    },
  })
);

export const getBooksAuthors = () => (
  axios({
    url: `${path}authors`,
  })
);

export const getCurrentBook = (id) => (
  axios({
    url: `${path}${id}`,
  })
);

export const deleteBookById = (id, getState) => {
  const { userLogin: { userInfo } } = getState();
  return (
    axios({
      method: 'DELETE',
      url: `${path}${id}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: { id },
    })
  );
};

export const createBookApi = (getState) => {
  const { userLogin: { userInfo } } = getState();
  return (
    axios({
      method: 'POST',
      url: `${path}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
  );
};

export const updateBookApi = (getState, book) => {
  const { userLogin: { userInfo } } = getState();
  return (
    axios({
      method: 'PUT',
      url: `${path}${book.id}`,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: book,
    })
  );
};
