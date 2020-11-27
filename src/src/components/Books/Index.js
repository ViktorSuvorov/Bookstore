/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line react/jsx-filename-extension
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Book from './Book';

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const getAllBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/main');
      setAllBooks(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

  return (
    <Book allBooks={allBooks} />
  );
};
export default AllBooks;
