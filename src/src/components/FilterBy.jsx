/* eslint-disable no-restricted-syntax */
/* eslint-disable radix */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { ListGroup, NavDropdown } from 'react-bootstrap';
import { getBooksAuthors } from '../Api/Book/bookApi';
import Checkbox from './Checkbox';
import RadioBox from './RadioBox';
import prices from './PriceRanges';

const FilterBy = ({ handleSetFilter }) => {
  const [myFilters, setMyFilters] = useState({
    filters: { author: [], price: [] },
  });
  const [authors, setAuthors] = useState([]);

  const getAuthors = async () => {
    const { data } = await getBooksAuthors();
    console.log(data);
    setAuthors(data);
  };

  useEffect(() => getAuthors(), []);

  const onInputChange = (event) => {
    handleSetFilter({
      [event.target.getAttribute('name')]: event.target.getAttribute('value'),
    });
  };

  const handlePrice = (value) => {
    const data = prices;
    let arr = [];
    for (const key in data) {
      if (data[key].id === parseInt(value)) {
        arr = data[key].array;
      }
    }
    return arr;
  };

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === 'price') {
      const priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }

    setMyFilters(newFilters);
    handleSetFilter(newFilters);
    console.log(myFilters);
  };

  return (
    <>
      <ListGroup as="ul">
        {/* <ListGroup.Item
          name="all"
          as="li"
          active={filter === 'all'}
          action
          variant="light"
          value=""
          onClick={(event) => onInputChange(event)}
        >
          All
        </ListGroup.Item> */}
        <ListGroup.Item>
          <NavDropdown title="Authors">
            <ul>
              <Checkbox
                authors={authors}
                handleFilters={(filters) => handleFilters(filters, 'authorId')}
              />
            </ul>
          </NavDropdown>
        </ListGroup.Item>
        <ListGroup.Item>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, 'price')}
            />
          </div>
        </ListGroup.Item>
      </ListGroup>
    </>
  );
};

export default FilterBy;
