/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row, Col, ListGroup, Image, Form, Button,
} from 'react-bootstrap';
import { addToFavorite, removeFromFavorite } from '../Redux/actions/favoriteActions';

const Favorite = ({ match, location, history }) => {
  const dispatch = useDispatch();

  const bookId = match.params.id;
  console.log(bookId);

  const favorite = useSelector((state) => state.favorite);
  const { favoriteItems } = favorite;

  useEffect(() => {
    if (bookId) {
      dispatch(addToFavorite(bookId));
    }
  }, [dispatch, bookId]);

  const handle = () => {
    console.log('handle');
  };

  const removeFromFavoriteHandler = (id) => {
    dispatch(removeFromFavorite(id));
  };

  const cartItems = [
    {
      book: 'asdasd',
      image:
        'https://static-cse.canva.com/blob/193590/%D0%9C%D0%9E%D0%99-%D0%9F%D0%A3%D0%A2%D0%AC.png',
      name: 'Самая обычная книга',
      price: 1000,
      description:
        'Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh/Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nib',
      author: 'Лев Толстой',
    },
  ];

  return (
    <ListGroup variant="flush">
      {favoriteItems.map((item) => (
        <ListGroup.Item key={item.book}>
          <Row>
            <Col md={2}>
              <Image src={item.image} alt={item.name} fluid rounded />
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

export default Favorite;
