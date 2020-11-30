/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/Auth/Profile';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const isAuth = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/is-verify', {
        method: 'GET',
        headers: { Authorization: localStorage.token },
      });
      const parsRes = await response.json();
      // eslint-disable-next-line no-unused-expressions
      parsRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    isAuth();
  });
  return (
    <>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (!isAuthenticated ? (
              <Login {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            ))}
          />
          <Route
            exact
            path="/login"
            render={(props) => (!isAuthenticated ? (
              <Login {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/profile" />
            ))}
          />
          <Route
            exact
            path="/register"
            render={(props) => (!isAuthenticated ? (
              <Register {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            ))}
          />
          <Route
            exact
            path="/profile"
            render={(props) => (isAuthenticated ? (
              <Profile {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            ))}
          />
        </Switch>
      </Router>
    </>
  );
};

const mapStateToProps = (store) => ({
  store,
});

export default connect(mapStateToProps)(App);
