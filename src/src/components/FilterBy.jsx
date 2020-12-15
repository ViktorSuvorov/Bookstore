/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { getBooksAuthors } from '../Api/Book/bookApi';

const FilterBy = ({ handleSetFilter }) => {
  const [filter, setActiveFilter] = useState({
    name: '',
    genre: '',
    price: '',
    author: '',
  });
  const [authors, setAuthors] = useState([]);

  const getAuthors = async () => {
    const { data } = await getBooksAuthors();
    setAuthors(data);
  };

  useEffect(() => getAuthors(), []);

  const onInputChange = (event) => {
    handleSetFilter({ [event.target.getAttribute('name')]: event.target.getAttribute('value') });
  };

  return (
    <>
      <ListGroup as="ul">
        <ListGroup.Item name="all" as="li" active={filter === 'all'} action variant="light" value="" onClick={(event) => onInputChange(event)}>All</ListGroup.Item>
        {authors.map((item) => <ListGroup.Item key={item.author} name="author" as="li" active={filter === item.author} action variant="light" value={item.author} onClick={(event) => onInputChange(event)}>{item.author}</ListGroup.Item>)}
      </ListGroup>
    </>
  );
};

export default FilterBy;
