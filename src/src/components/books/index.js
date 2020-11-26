/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line react/jsx-filename-extension
import React, { useEffect, useState } from 'react';
import Book from './book';

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  const getAllBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/main', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const parsRes = await response.json();
      console.log(parsRes);
      setAllBooks(parsRes);
      console.log(allBooks);
      // eslint-disable-next-line no-console
    } catch (error) {
      // eslint-disable-next-line no-console
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
