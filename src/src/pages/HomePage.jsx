/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row, Col, Container,
} from 'react-bootstrap';
import { getBooksList } from '../Redux/actions/bookActions';
import BookCard from '../components/BookСard';
import Loading from '../components/Loading';
import Pagin from '../components/Pagin';

const HomePage = ({
  filter, match,
}) => {
  const { keyword } = match.params;
  const { pageNumber } = match.params || 1;

  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.bookList);
  const {
    books, isLoading, page, pages,
  } = bookList;

  useEffect(() => {
    dispatch(getBooksList(filter, pageNumber, keyword));
  }, [dispatch, filter, pageNumber, keyword]);

  return (
    <Container>
      {
          isLoading ? <Loading /> : (
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
          )
}

    </Container>
  );
};

// HomePage.propTypes = {
//   filter: PropTypes.objectOf(PropTypes.string).isRequired,
// };

export default HomePage;
