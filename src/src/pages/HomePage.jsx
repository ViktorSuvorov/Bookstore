/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';
import { getBooksList } from '../Redux/actions/bookActions';
import BookCard from '../components/BookСard';
import Loading from '../components/Loading';

const HomeScreen = ({
  filter,
}) => {
  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.bookList);
  const { books, isLoading } = bookList;

  useEffect(() => {
    dispatch(getBooksList(filter));
  }, [filter]);

  return (
    <Container>
      <Row>
        {
          isLoading
            ? <Loading />
            : books.map((book) => (
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
            ))
        }
      </Row>
    </Container>
  );
};

HomeScreen.propTypes = {
  filter: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default HomeScreen;
