/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOneBook, cleanBook } from '../../Redux/actions/books';
import Book from './Book';
import Header from '../Header/Header';
import Loading from '../Utils/Loading';

const CurrentBook = ({
  getOneBookConnect, oneBook, match, isLoading,
}) => {
  console.log('oneBook', oneBook);
  useEffect(() => {
    getOneBookConnect(match.params.id);
    return cleanBook();
  }, []);
  return (
    <div className="container">
      <Header />
      {
          isLoading
            ? <Loading />
            : <Book {...oneBook} />
      }
    </div>
  );
};

const mapStateToProps = ({ books: { oneBook, isLoading } }) => ({
  oneBook,
  isLoading,
});

export default connect(mapStateToProps, { getOneBookConnect: getOneBook, cleanBook })(CurrentBook);
