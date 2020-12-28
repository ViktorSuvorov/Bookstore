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
    data: { ...book },
  });
};

export const getCurrentBook = (id) => axios({
  url: `${path}${id}`,
});

export const getBooks = async (filter, pageNumber, keyword) => {
  console.log(keyword);
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

export const getBooksListAdmin = async (pageNumber, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  return axios({
    url: `${path}admin/booklist/?pageNumber=${pageNumber}`,
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
    data: {
      userInfo,
    },
  });
};

export const createReviewBookApi = (getState, bookId, review) => {
  const {
    userLogin: { userInfo },
  } = getState();
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

export const updateReviewFromApi = (getState, review) => {
  const {
    userLogin: { userInfo },
  } = getState();
  return axios({
    method: 'PUT',
    url: `${path}${review.bookId}/reviews`,
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
    data: { ...review },
  });
};

export const deleteReviewById = (reviewId, id, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  return axios({
    method: 'DELETE',
    url: `${path}${id}/reviews`,
    headers: {
      Authorization: `Bearer ${userInfo.token}`,
    },
    data: { reviewId, id },
  });
};
