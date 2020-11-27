import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Logo from './Logo';

const Header = ({ logout, name }) => (
  <>
    <div className="container d-inline-flex justify-content-between mb-1">
      <Logo />
      <div className="container d-inline-flex mb-1">
        <h3>
          Добро пожаловать,
          {' '}
          {name}
        </h3>
        <Button onClick={logout} variant="outline-primary" size="sm">
          logout
        </Button>
      </div>
    </div>
  </>
);
Header.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
export default Header;
