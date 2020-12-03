import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CardColumns } from 'react-bootstrap';
import { getAllBooks } from '../../Redux/actions/books';
import Book from './Book';
import Loading from '../Utils/Loading';

const AllBooks = ({ getAllBooksConnect, items, isLoading }) => {
  useEffect(() => {
    getAllBooksConnect();
  }, []);
  return (
    <div className="container">
      <CardColumns>
        {
          isLoading
            ? <Loading />
            : items.map((book) => (
              <Book
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

const mapStateToProps = ({ books: { items, isLoading } }) => ({
  items,
  isLoading,
});

AllBooks.propTypes = {
  getAllBooksConnect: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, { getAllBooksConnect: getAllBooks })(AllBooks);
