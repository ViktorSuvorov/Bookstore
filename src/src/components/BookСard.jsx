import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import Rating from './Rating';

const Book = ({
  image, name, price, author, id, rating,
}) => (
  <Card className="my-3 p-2 rounded">
    <Link
      style={{
        textDecoration: 'none',
        color: 'black',
      }}
      to={`/book/${id}`}
    >
      <Card.Img
        src={image?.[0]?.url}
        alt="book-covers"
        variant="top"
        style={{ width: '165px', height: '200px' }}
      />
      <Card.Body>
        <Card.Title as="div">
          <strong>
            {name}
            {' '}
          </strong>
        </Card.Title>
        <Card.Text as="div">
          <div className="my-3">{author.name}</div>
        </Card.Text>
        <Card.Text as="div">
          <Rating value={rating} />
        </Card.Text>
        <Card.Text as="h3">
          <div>
            {price}
            &#8381;
          </div>
        </Card.Text>
      </Card.Body>
    </Link>
  </Card>
);

Book.propTypes = {
  image: PropTypes.arrayOf(PropTypes.object).isRequired,
  price: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  author: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.number.isRequired,
};

export default Book;
