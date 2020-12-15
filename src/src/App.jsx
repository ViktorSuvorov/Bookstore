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

import { Container } from 'react-bootstrap';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Main from './components/MainPage';
import CurrentBook from './components/CurrentBook';
import Header from './components/Header';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  return (
    <Router>
      <Header />
      <Container>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Main />}
          />
          <Route
            exact
            path="/login"
            component={
              LoginPage
            }
          />
          <Route
            exact
            path="/register"
            component={
              RegisterPage
            }
          />
          <Route
            exact
            path="/cart/:id?"
            render={(props) => <CartPage {...props} />}
          />
          <Route
            exact
            path="/profile"
            render={(props) => <Profile {...props} setAuth={setAuth} />}
          />
          <Route exact path="/book/:id" render={(props) => <CurrentBook {...props} />} />

        </Switch>
      </Container>
    </Router>
  );
};

export default App;
