import React from 'react';
import {
  Navbar, Form, FormControl, Button, Nav,
} from 'react-bootstrap';

const Navigation = () => (
  <Navbar bg="dark" variant="dark" className="rounded mb-1">
    <Navbar.Brand href="/">Bookstore</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/login">Login</Nav.Link>
      <Nav.Link href="/profile">Profile</Nav.Link>
      <Nav.Link href="#pricing">
        Cart:(0)
        Total:(0)
      </Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
);

export default Navigation;
