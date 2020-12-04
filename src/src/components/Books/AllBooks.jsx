/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardColumns } from 'react-bootstrap';
import { getAllBooks } from '../../Redux/actions/books';
import BookCard from './BookСard';
import Loading from '../Utils/Loading';

const AllBooks = ({
  getAllBooksConnect, books, isLoading, booksFilters,
}) => {
  console.log(booksFilters);
  useEffect(() => {
    getAllBooksConnect(booksFilters);
  }, []);
  return (
    <div className="container">
      <CardColumns>
        {
          isLoading
            ? <Loading />
            : books.map((book) => (
              <BookCard
                key={book.id}
                image={book.image}
                name={book.name}
                price={book.price}
                author={book.author}
                id={book.id}
              />
            ))
        }
      </CardColumns>
    </div>
  );
};

const mapStateToProps = ({
  bookReducer: {
    books, isLoading, booksFilters,
  },
}) => ({
  books,
  isLoading,
  booksFilters,
});

AllBooks.propTypes = {
  getAllBooksConnect: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { getAllBooksConnect: getAllBooks })(AllBooks);
