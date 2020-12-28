import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { addKeywordWord, deleteKeyword, getBooksList } from '../Redux/actions/bookActions';

const SearchBox = () => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState({ keyword: {} });
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      dispatch(getBooksList('', '', keyword));
      dispatch(addKeywordWord(keyword));
    } else {
      dispatch(deleteKeyword());
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

export default SearchBox;
