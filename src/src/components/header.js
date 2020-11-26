/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'react-bootstrap';
import Logo from './Logo';

const Header = ({ logOut, name }) => (
  <>
    <div className="container d-inline-flex justify-content-between mb-1">
      <Logo />
      <h3>
        Добро пожаловать,
        {name}
      </h3>
    </div>
    <Button onClick={logOut} variant="outline-primary"> logout </Button>
  </>
);

export default Header;
