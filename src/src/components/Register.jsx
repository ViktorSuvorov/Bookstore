import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
  });
  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSumbitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await axios.post('http://localhost:5000/api/user/register',
        body);
      const parseRes = await response.data;
      localStorage.setItem('token', parseRes.token);
      setAuth(true);
    } catch (error) {
      console.error(error.mesage);
    }
  };

  return (
    <>
      <Form onSubmit={onSumbitForm}>
        <h1 style={{ textAlign: 'center', marginTop: '10px' }}>Register</h1>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={(e) => onChange(e)}
            value={email}
          />
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => onChange(e)}
            value={password}
          />
        </Form.Group>
        <Form.Group controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="name"
            name="name"
            onChange={(e) => onChange(e)}
            value={name}
          />
        </Form.Group>
        <Button type="submit" variant="outline-primary" block>
          Submit
        </Button>
      </Form>
      <Link to="/login">Login</Link>
    </>
  );
};

Register.propTypes = {
  setAuth: PropTypes.func.isRequired,
};

export default Register;
