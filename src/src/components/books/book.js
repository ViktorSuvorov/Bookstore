/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const Book = ({ allBooks }) => (
  <>
    <div className="container d-flex flex-wrap justify-content-between">
      {allBooks.map((item) => (
        <Card
          border="primary"
          key={item.name.toString()}
          style={{
            width: '12rem', marginBottom: '10px', marginLeft: '5px', marginRight: '5px',
          }}
        >
          <Card.Img
            variant="top"
            src={item.image}
            style={{
              maxHeight: '200px',
            }}
          />
          <Card.Body className="mb-1">
            <Card.Title className="text-truncate">{item.name}</Card.Title>
            <Card.Text className="text-truncate">
              {item.description}
            </Card.Text>
          </Card.Body>
          <Button variant="primary">ADD TO BAG</Button>
        </Card>
      ))}
    </div>
  </>
);

export default Book;
