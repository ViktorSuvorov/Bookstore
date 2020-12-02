/* eslint-disable no-unused-expressions */
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
import { connect } from 'react-redux';
import axios from 'axios';
import { CardColumns } from 'react-bootstrap';
import { getAllBooks } from '../../Redux/actions/books';
import Book from './Book';
import Loading from '../Utils/Loading';

const AllBooks = ({ getAllBooks, items, isLoading }) => {
  useEffect(() => {
    getAllBooks();
  }, []);
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

export default connect(mapStateToProps, { getAllBooks })(AllBooks);
