/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Card } from 'react-bootstrap';
// import PropTypes, { object } from 'prop-types';
import './Book.css';

const Book = ({
  image, name, price, author,
}) => (
  <Card border="dark">
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
    <Card.Footer>
      <Button variant="outline-primary">Add to cart</Button>
    </Card.Footer>
  </Card>
);

// Book.propTypes = {
//   allBooks: PropTypes.arrayOf([object]).isRequired,
// };

export default Book;
