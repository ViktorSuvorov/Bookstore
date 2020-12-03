/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getOneBook, cleanBook } from '../../Redux/actions/books';
import Book from './Book';
import Header from '../Header/Header';
import Loading from '../Utils/Loading';

const CurrentBook = ({
  getOneBookConnect, match,
}) => {
  const [book, setBook] = useState();
  const isLoading = 'false';
  useEffect(() => {
    setBook(getOneBookConnect(match.params.id));
    return cleanBook();
  }, []);
  return (
    <div className="container">
      <Header />
      {
          isLoading
            ? <Loading />
            : <Book {...book} />
      }
    </div>
  );
};

// const mapStateToProps = ({ books: { oneBook, isLoading } }) => ({
//   oneBook,
//   isLoading,
// });

export default connect(null, { getOneBookConnect: getOneBook, cleanBook })(CurrentBook);
