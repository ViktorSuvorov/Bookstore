import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import CurrentBook from './components/CurrentBook';
import Header from './components/Header';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import BookListPage from './pages/BookListPage';
import BookEditPage from './pages/BookEditPage';
import HomePage from './pages/HomePage';
import { PrivateRoute } from './components/PrivateRout';

const App = () => (
  <Router>
    <Header />
    <main className="py-3">
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/cart/:id?" component={CartPage} />
          <PrivateRoute exact path="/profile/:id?" component={ProfilePage} />
          <Route exact path="/book/:id" component={CurrentBook} />
          <Route exact path="/admin/userlist" component={UserListPage} />
          <Route exact path="/admin/user/:id/edit" component={UserEditPage} />
          <Route exact path="/admin/booklist" component={BookListPage} />
          <Route exact path="/admin/booklist/:pageNumber" component={BookListPage} />
          <Route exact path="/admin/book/:id/edit" component={BookEditPage} />
          <Route exact path="/page/:pageNumber" component={HomePage} />
          <Route exact path="/search/:keyword/" component={HomePage} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomePage}
            exact
          />
          {/* <Route exact path="/search/:keyword/" component={HomePage} /> */}
        </Switch>
      </Container>
    </main>
  </Router>
);

export default App;
