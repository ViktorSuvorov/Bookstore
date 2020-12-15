/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import Rating from './Rating';

const Book = ({
  image, name, price, author, id, rating,
}) => (
  <Card className="my-3 p-1 rounded">
    <Link
      style={{
        textDecoration: 'none',
        color: 'black',
      }}
      to={`/book/${id}`}
    >
      <Card.Img src={image} alt="book-covers" variant="top" />
      <Card.Body>
        <Card.Title as="div">
          <strong>
            {name}
            {' '}
          </strong>
        </Card.Title>
        <Card.Text as="div">
          <div className="my-3">
            {author}
          </div>
        </Card.Text>
        <Card.Text as="div">
          <Rating value={rating} />
        </Card.Text>
        <Card.Text as="h3">
          <div className="my-3">
            {price}
            &#8381;
          </div>
        </Card.Text>
      </Card.Body>
    </Link>
    {/* <Card.Footer>
      <Button variant="outline-dark" style={{ color: 'black' }}>Add to cart</Button>
    </Card.Footer> */}
  </Card>
);

Book.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default Book;
