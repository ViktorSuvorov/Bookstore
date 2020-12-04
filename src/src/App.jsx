/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Profile from './components/Profile/Profile';
import Main from './components/Main/index';
import CurrentBook from './components/Books/CurrentBook';

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
            render={() => <Main />}
          />
          <Route
            exact
            path="/login"
            render={(props) => (!isAuthenticated ? (
              <Login {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/" />
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
          {/* <Route
            exact
            path="/profile"
            render={(props) => (isAuthenticated ? (
              <Profile {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            ))}
          /> */}
          {/* <Route
            exact
            path="/profile"
            render={(props) => (isAuthenticated ? (
              <Profile {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/login" />
            ))}
          /> */}
          <Route
            exact
            path="/profile"
            render={(props) => <Profile {...props} setAuth={setAuth} />}
          />
          <Route exact path="/book/:id" render={(props) => <CurrentBook {...props} />} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
