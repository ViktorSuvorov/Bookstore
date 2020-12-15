/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const FormContainer = ({ children }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <Container>
    <Row className="justify-content-md-center">
      <Col xs={12} md={6}>
        {children}
      </Col>
    </Row>
  </Container>
);

export default FormContainer;
