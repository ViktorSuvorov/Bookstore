/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import AllBooks from '../Books/AllBooks';
import Header from '../Header/Header';
import FilterBy from '../FilterBy/FilterBy';

const Profile = ({ setAuth }) => {
  const [name, setName] = useState('');

  const getName = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: { Authorization: localStorage.token },
      });
      setName(response.data.name);
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
      </div>
    </>
  );
};

Profile.propTypes = {
  setAuth: PropTypes.func.isRequired,
};

export default Profile;
