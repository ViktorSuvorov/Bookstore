/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Header from './Header';

const Profile = ({ setAuth }) => {
  const [name, setName] = useState('');

  const getName = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/profile', {
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
    <h1>Profile page</h1>
  );
};

Profile.propTypes = {
  setAuth: PropTypes.func.isRequired,
};

export default Profile;
