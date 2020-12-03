import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AllBooks from '../Books/AllBooks';
import Header from '../Header/Header';
import FilterBy from '../FilterBy/FilterBy';

const Main = () => (
  <>
    <div className="container">
      <Header />
      <Row>
        <Col sm={3}><FilterBy /></Col>
        <Col sm={9}><AllBooks /></Col>
      </Row>
    </div>
  </>
);

export default Main;
