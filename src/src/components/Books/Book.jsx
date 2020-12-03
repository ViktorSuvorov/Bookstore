/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './Book.css';
import { NavLink as Link } from 'react-router-dom';

const Book = ({
  image, name, price, author, id,
}) => (
  <Card border="dark">
    <Link
      style={{
        textDecoration: 'none',
        color: 'black',
      }}
      to={`/book/${id}`}
    >
      <img src={image} alt="book-covers" className="grid__img" />
      <Card.Body className="text-truncate">
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {author}
        </Card.Text>
        <Card.Text>
          {price}
          &#8381;
        </Card.Text>
        <Card.Text>
          Rating
        </Card.Text>
      </Card.Body>
    </Link>
    <Card.Footer>
      <Button variant="outline-dark" style={{ color: 'black' }}>Add to cart</Button>
    </Card.Footer>
  </Card>
);

Book.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Book;
