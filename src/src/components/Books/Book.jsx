import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes, { object } from 'prop-types';
import './Book.css';

const Book = ({ allBooks }) => (
  <div className="grid">
    {allBooks.map((book) => (
      <Card key={book.id}>
        <img src={book.image} alt="book-covers" className="grid__img" />
        <Card.Body className="text-truncate">
          <Card.Title>{book.name}</Card.Title>
          <Card.Text>
            {book.description}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button variant="outline-primary">Add to bag</Button>
        </Card.Footer>
      </Card>
    ))}
  </div>
);

Book.propTypes = {
  allBooks: PropTypes.arrayOf([object]).isRequired,
};

export default Book;
