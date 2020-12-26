/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from '../indexApi';

const path = 'books/';

export const getBooksGenres = () => axios({
  url: `${path}genres`,
});

export const getBooksAuthors = () => axios({
  url: `${path}authors`,
});

const getGenres = async () => {
  const { data } = await getBooksGenres();
  const arrayOfId = data.map((item) => item.id);
  return arrayOfId;
};

const getAuthors = async () => {
  const { data } = await getBooksAuthors();
  const arrayOfId = data.map((item) => item.id);
  return arrayOfId;
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

export const updateBookFromApi = (getState, book) => {
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

export const getCurrentBook = (id) => axios({
  url: `${path}${id}`,
});

export const getBooks = async (filter, pageNumber, keyword) => {
  const allGenresId = await getGenres();
  const allAuthorsId = await getAuthors();
  const priceType = filter.price || 'price up';
  const ratingType = filter.rating || '';
  const authorId = filter?.authorId || allAuthorsId;
  const genreId = filter?.genreId || allGenresId;
  return axios({
    url: `${path}?pageNumber=${pageNumber}&keyword=${keyword}&authorId=${authorId}&genreId=${genreId}&priceType=${priceType}&ratingType=${ratingType}`,
  });
};

export const createReviewBookApi = (getState, bookId, review) => {
  const {
    userLogin: { userInfo },
  } = getState();
  const { userLogin } = getState();
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
