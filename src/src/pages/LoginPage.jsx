/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { loginUser } from '../Redux/actions/userActions';
import FormContainer from '../components/FormContainer';

const LoginPage = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const redirect = location.search ? location.search.split('=')[1] : '/register';
  console.log('loginredirect', redirect);
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { isLoading, error, userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
    console.log(loginUser);
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <FormContainer>
      <h1>Sign In </h1>
      {error && <h3>{error}</h3> }
      {isLoading && <Loading />}
      <Form onSubmit={(e) => submitHandler(e)}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="password ">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password " placeholder="Enter password " value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button type="submit" variant="primary">Sing In</Button>
      </Form>
      <Row className="py-3">
        <Col>
          New ?
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginPage;
