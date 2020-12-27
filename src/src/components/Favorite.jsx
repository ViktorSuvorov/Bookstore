/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Row, Col, ListGroup, Image, Button,
} from 'react-bootstrap';
import {
  addToFavorite,
  removeFromFavorite,
} from '../Redux/actions/favoriteActions';

const Favorite = ({ match }) => {
  const dispatch = useDispatch();

  const bookId = match.params.id;

  const favorite = useSelector((state) => state.favorite);
  const { favoriteItems } = favorite;

  useEffect(() => {
    if (bookId) {
      dispatch(addToFavorite(bookId));
    }
  }, [dispatch, bookId]);

  const removeFromFavoriteHandler = (id) => {
    dispatch(removeFromFavorite(id));
  };

  return (
    <ListGroup variant="flush">
      {favoriteItems.map((item) => (
        <ListGroup.Item key={item.book}>
          <Row>
            <Col md={2}>
              <Image src={item.image?.[0].url} alt={item.name} fluid rounded />
            </Col>
            <Col md={3}>
              <Link to={`/book/${item.book}`}>
                <strong>Name:</strong>
                <p>
                  {' '}
                  {item.name}
                </p>
              </Link>
              <strong>Author:</strong>

              <p>{item.author}</p>
            </Col>
            <Col md={2}>
              {item.price}
              {' '}
              &#8381;
            </Col>
            <Col md={3}>{item.description}</Col>
            <Col md={2}>
              <Button
                type="button"
                variand="light"
                onClick={() => removeFromFavoriteHandler(item.book)}
              >
                <i className="fas fa-trash" />
              </Button>
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

Favorite.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default Favorite;
