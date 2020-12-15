import React, { useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import HomeScreen from '../pages/HomePage';
import FilterBy from './FilterBy';

const Main = () => {
  const [filter, setFilter] = useState({
    name: '',
    author: '',
    genre: '',
    priceMin: '',
    priceMax: '',
    search: '',
  });
  console.log('Mainpage', filter);
  const handleSetFilter = (result) => {
    setFilter(result);
    console.log('result', result);
  };

  return (
    <Container>
      <Row>

        <Col sm={3}><FilterBy handleSetFilter={(result) => handleSetFilter(result)} /></Col>
        <Col sm={9}><HomeScreen filter={filter} /></Col>

      </Row>
    </Container>
  );
};

export default Main;
