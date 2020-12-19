/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row, Col, ListGroup, Image, Form, Button, Card,
} from 'react-bootstrap';
import { addToCart, removeFromCart } from '../Redux/actions/cartActions';

const CartPage = ({ match, location, history }) => {
  const dispatch = useDispatch();

  const bookId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (bookId) {
      dispatch(addToCart(bookId, qty));
    }
  }, [dispatch, bookId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <h3>
            Your cart is empty
            {' '}
            <Link to="/">Go back</Link>
          </h3>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.book}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/book/:${item.book}`}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>
                    {item.price}
                    {' '}
                    &#8381;
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => {
                        console.log('value:', e.target.value);
                        console.log('item', item.book);
                        dispatch(addToCart(item.book, Number(e.target.value)));
                      }}
                    >
                      {[0, 1, 2, 3, 4].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1 }
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type="button" variand="light" onClick={() => removeFromCartHandler(item.book)}><i className="fas fa-trash" /></Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                ) items
              </h2>
              {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>To Checkout</Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
