/* eslint-disable no-console */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
// import axios from 'axios';
import AllBooks from '../Books/AllBooks';
import Header from '../Header/Header';
import FilterBy from '../FilterBy/FilterBy';

const Profile = ({ setAuth }) => {
  const [name, setName] = useState('');

  const getName = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'GET',
        headers: { Authorization: localStorage.token },
      });
      const parsRes = await response.json();
      setName(parsRes.name);
    } catch (error) {
      console.error(console.log(error));
    }
  };

  useEffect(() => {
    getName();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setAuth(false);
  };
  return (
    <>
      <div className="container">
        <Header logout={(e) => logout(e)} name={name} />
        <Row>
          <Col sm={8}><FilterBy /></Col>
          <Col sm={4}><AllBooks /></Col>
        </Row>
      </div>
    </>
  );
};
export default Profile;
