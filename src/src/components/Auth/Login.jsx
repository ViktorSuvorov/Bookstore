import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSumbitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      localStorage.setItem('token', parseRes.token);
      setAuth(true);
    } catch (error) {
      console.error(error.mesage);
    }
  };

  return (
    <>
      <div className="container">
        <Form onSubmit={onSumbitForm}>
          <h1 style={{ textAlign: 'center', marginTop: '10px' }}>Login</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={onChange}
            />
            <Form.Text className="text-muted">
              We`ll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </Form.Group>
          <Button variant="outline-primary" type="submit" block>
            Submit
          </Button>
          <Link to="/register">register</Link>
        </Form>
      </div>
    </>
  );
};

Login.propTypes = {
  setAuth: PropTypes.bool.isRequired,
};

export default Login;
