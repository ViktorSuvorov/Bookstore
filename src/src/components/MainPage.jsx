import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import FilterBy from './FilterBy';
import HomePage from '../pages/HomePage';

const Main = () => {
  const [filter, setFilter] = useState({
    name: '',
    author: '',
    genre: '',
    priceMin: '',
    priceMax: '',
    search: '',
  });
  const handleSetFilter = (result) => {
    setFilter(result);
  };

  return (
    <Container>
      <Row>
        <Col sm={3}>
          <FilterBy handleSetFilter={(result) => handleSetFilter(result)} />
        </Col>
        <Col sm={9}>
          <Route
            filter={filter}
            render={({ match }) => <HomePage match={match} />}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
