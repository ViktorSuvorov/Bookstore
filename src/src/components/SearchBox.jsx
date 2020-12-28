/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { getBooksList } from '../Redux/actions/bookActions';
import { getBooks } from '../Api/Book/bookApi';

const SearchBox = ({ history }) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      // dispatch(getBooksList('', '', keyword));
      getBooks('', '', keyword);
      // history.push(`/?search=${keyword}`);
      // history.push(`/${keyword}`);
    } else {
      // dispatch(getBooksList('', '', ''));
      history.push('/');
    }
  };

  useEffect(() => {

  }, [keyword]);

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="search"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter the name of book"
        className="mr-sm-2 ml-sm-5"
      />
      <Button type="Submit" variant="dark" className="p-2">
        Search
      </Button>
    </Form>
  );
};

SearchBox.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default SearchBox;
