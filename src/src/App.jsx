/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import Main from './components/MainPage';
import CurrentBook from './components/CurrentBook';
import Header from './components/Header';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import UserListPage from './pages/UserListPage';

const App = () => (
  <Router>
    <Header />
    <main className="py-3">
      <Container>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/cart/:id?" component={CartPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/book/:id" component={CurrentBook} />
          <Route exact path="/admin/userlist" component={UserListPage} />
        </Switch>
      </Container>
    </main>
  </Router>
);

export default App;
