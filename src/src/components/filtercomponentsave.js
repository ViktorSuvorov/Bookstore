/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { getBooksAuthors, getBooksGenres } from '../Api/Book/bookApi';
import Checkbox from './Checkbox';

const FilterBy = ({ handleSetFilter }) => {
  const [type, setType] = useState({
    price: '',
    rating: '',
  });

  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [myFilters, setMyFilters] = useState(
    {
      authorId: [],
      genreId: [],
    },
  );

  const getAuthors = async () => {
    const { data } = await getBooksAuthors();
    setAuthors(data);
  };

  const getGenres = async () => {
    const { data } = await getBooksGenres();
    setGenres(data);
  };

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters, ...type };
    newFilters[filterBy] = filters;
    setMyFilters(newFilters);
    handleSetFilter(newFilters);
  };

  useEffect(() => {
    getAuthors();
    getGenres();
    // handleFilters(myFilters);
  }, [myFilters, type]);

  const onClickHandler = (event) => {
    setType({
      [event.target.getAttribute('name')]: event.target.getAttribute('value'),
    });
    handleSetFilter({ [event.target.getAttribute('name')]: event.target.getAttribute('value') });
  };

  return (
    <>
      <ListGroup as="ul">
        <ListGroup.Item>
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
