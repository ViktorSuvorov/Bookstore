/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from '../indexApi';

const path = 'books/';
const allAuthorsId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const allGenresId = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const filterFunction = (sorting) => {
  let sortField;
  let sortOrder;
  if (sorting === 'Price up') {
    sortField = 'price';
    sortOrder = 'asc';
  }
  if (sorting === 'Price down') {
    sortField = 'price';
    sortOrder = 'desc';
  }
  if (sorting === 'Rating up') {
    sortField = 'rating';
    sortOrder = 'asc';
  }
  if (sorting === 'Rating down') {
    sortField = 'rating';
    sortOrder = 'desc';
  }
  return { sortField, sortOrder };
};

export const getBooks = (filter, pageNumber, keyword) => {
  const priceType = filter?.price || 'price up';
  const ratingType = filter?.rating;
  console.log('keyword', keyword);
  const authorId = filter.filters?.authorId || allAuthorsId;
  const genreId = filter.filters?.genreId || allGenresId;
  return axios({
    url: `${path}?pageNumber=${pageNumber}&keyword=${keyword}&authorId=${authorId}&genreId=${genreId}&priceType=${priceType}&ratingType=${ratingType}`,
  });
};

export const getBooksAuthors = () => axios({
  url: `${path}authors`,
});

export const getBooksGenres = () => axios({
  url: `${path}genres`,
});

export const getCurrentBook = (id) => axios({
  url: `${path}${id}`,
});

export const deleteBookById = (id, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  return axios({
    method: 'DELETE',
    url: `${path}${id}`,
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
    data: { id },
  });
};

export const createBookApi = (getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  return axios({
    method: 'POST',
    url: `${path}`,
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
  });
};

export const updateBookApi = (getState, book) => {
  const {
    userLogin: { userInfo },
  } = getState();
  return axios({
    method: 'PUT',
    url: `${path}${book.id}`,
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
    data: book,
  });
};

export const createReviewBookApi = (getState, bookId, review) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const { userLogin } = getState();
  console.log(userLogin);
  return axios({
    method: 'POST',
    url: `${path}${bookId}/reviews`,
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
    data: {
      ...review,
      ...userInfo,
    },
  });
};
