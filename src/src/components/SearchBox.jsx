/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  console.log(keyword);

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

export default SearchBox;
