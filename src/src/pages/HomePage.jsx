/* eslint-disable react/require-default-props */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { getBooksList } from '../Redux/actions/bookActions';
import BookCard from '../components/BookСard';
import Loading from '../components/Loading';
import Pagin from '../components/Pagin';
import Message from '../components/Message';
import FilterBy from '../components/FilterBy';

const HomePage = ({ match }) => {
  const [filter, setFilter] = useState({});

  const handleSetFilter = (result) => {
    setFilter(result);
  };

  const dispatch = useDispatch();

  const { keyword } = match.params;
  const { pageNumber } = match.params || 1;

  const bookList = useSelector((state) => state.bookList);
  const {
    books, isLoading, page, pages, error,
  } = bookList;

  useEffect(() => {
    dispatch(getBooksList(filter, pageNumber, keyword));
  }, [dispatch, filter, pageNumber, keyword]);

  return (
    <Container>
      <Row>
        <Col sm={3}>
          <FilterBy handleSetFilter={(result) => handleSetFilter(result)} />
        </Col>
        <Col>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <>
              <Row>
                {books.map((book) => (
                  <Col sm={12} md={6} lg={4} xl={3} key={book.id}>
                    <BookCard
                      image={book.image}
                      name={book.name}
                      price={book.price}
                      author={book.author}
                      id={book.id}
                      rating={book.rating}
                    />
                  </Col>
                ))}
              </Row>
              <Pagin pages={pages} page={page} keyword={keyword || ''} />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

HomePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      keyword: PropTypes.string,
    }),
  }),
};

export default HomePage;
