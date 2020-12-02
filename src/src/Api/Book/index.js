/* eslint-disable import/prefer-default-export */
import axios from '../index';

const path = 'books';

export const getBooks = () => (
  axios({
    url: `${path}`,
  })
);
