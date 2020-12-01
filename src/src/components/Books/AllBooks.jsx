/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line react/jsx-filename-extension
import React, { useEffect } from 'react';
import { connect, useSelector, use } from 'react-redux';
import axios from 'axios';
import { CardColumns } from 'react-bootstrap';
import { setBooks } from '../../Redux/actions/books';
import Book from './Book';
import Loading from '../Utils/Loading';

const AllBooks = ({ onSetBooks, items, isLoading }) => {
  const getAllBooks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books');
      console.log('this is response', response);
      onSetBooks(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);
  console.log('this is items after useEffect', items);
  return (
    <div className="container">
      <CardColumns>
        {
        isLoading ? <Loading />
          : items.map((book) => (
            <Book key={book.id} {...book} />
          ))
      }
      </CardColumns>
    </div>
  );
};

const mapStateToProps = ({ books: { items, isLoading } }) => ({
  items,
  isLoading,
});

const mapDispatchToProps = (dispatch) => (
  {
    onSetBooks: (books) => dispatch(setBooks(books)),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);
