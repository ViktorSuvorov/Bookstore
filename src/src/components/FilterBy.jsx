/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import { getBooksAuthors, getBooksGenres } from '../Api/Book/bookApi';
import Checkbox from './Checkbox';

const FilterBy = ({ handleSetFilter }) => {
  const [type, setType] = useState({
    price: '',
    rating: '',
  });
  const [myFilters, setMyFilters] = useState({
    filters: {},
  });
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);

  const getAuthors = async () => {
    const { data } = await getBooksAuthors();
    setAuthors(data);
  };

  const getGenres = async () => {
    const { data } = await getBooksGenres();
    setGenres(data);
  };

  useEffect(() => {
    getAuthors();
    getGenres();
    handleSetFilter(myFilters);
  }, [myFilters]);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters, ...type };
    newFilters.filters[filterBy] = filters;
    setMyFilters(newFilters);
    handleSetFilter(newFilters);
    console.log(myFilters);
  };

  console.log('type', type);
  const onClickHandler = (event) => {
    console.log('asdas', event.target.name);
    console.log('work');
    setType({
      [event.target.getAttribute('name')]: event.target.getAttribute('value'),
    });
  };

  return (
    <>
      <ListGroup as="ul">
        <ListGroup.Item onClick={handleSetFilter(type, '')}>
          <ListGroup.Item
            name="price"
            as="li"
            active={type.price === 'price up'}
            value="price up"
            onClick={onClickHandler}
          >
            Price Up
          </ListGroup.Item>
          <ListGroup.Item
            name="price"
            value="price down"
            active={type.price === 'price down'}
            onClick={onClickHandler}
          >
            Price down
          </ListGroup.Item>
          <ListGroup.Item
            name="rating"
            value="rating up"
            active={type.rating === 'rating up'}
            onClick={onClickHandler}
          >
            Rating Up
          </ListGroup.Item>
          <ListGroup.Item
            name="rating"
            value="rating down"
            active={type.rating === 'rating down'}
            onClick={onClickHandler}
          >
            Rating down
          </ListGroup.Item>
        </ListGroup.Item>
        <ListGroup.Item>
          <h4>Authors</h4>
          <ul>
            <Checkbox
              filterList={authors}
              handleFilters={(filters) => handleFilters(filters, 'authorId')}
            />
          </ul>
        </ListGroup.Item>
        <ListGroup.Item>
          <h4>Genres</h4>
          <ul>
            <Checkbox
              filterList={genres}
              handleFilters={(filters) => handleFilters(filters, 'genreId')}
            />
          </ul>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default FilterBy;
