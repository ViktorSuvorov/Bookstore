/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AwesomeSlider from 'react-awesome-slider';
import { Link } from 'react-router-dom';
import {
  Button, Container, Row, Col, Image, ListGroup, Card,
} from 'react-bootstrap';
import { getCurrentBook } from '../Api/Book/bookApi';
import 'react-awesome-slider/dist/styles.css';
import Rating from './Rating';

const CurrentBook = ({ match }) => {
  const [book, setBook] = useState({
    name: '',
    image: '',
    author: '',
    price: +'',
  });

  const getBook = async () => {
    const response = await getCurrentBook(match.params.id);
    setBook(response.data);
  };

  useEffect(() => {
    getBook();
    return () => {
      setBook({});
    };
  }, []);

  return (
    <Container>
      <Link className="btn btn-dark my-3" to="/">Go back</Link>
      <Row>
        <Col md={6}>
          <Image src={book.image} alt={book.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              Title:
              <h3>{book.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              Author:
              <h4>
                {' '}
                {book.author}
                {' '}
              </h4>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={book.rating} />
            </ListGroup.Item>
            <ListGroup.Item>
              Price:
              {book.price}
              {' '}
              &#8381;
            </ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>
                {' '}
                {book.description}
              </p>

            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price:
                  </Col>
                  <Col>
                    <strong>{book.price}</strong>
                    &#8381;
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button className="btn-block" type="button">
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

CurrentBook.propTypes = {
  match: PropTypes.object.isRequired,
};

export default CurrentBook;
