/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AwesomeSlider from 'react-awesome-slider';
import { Link } from 'react-router-dom';
import {
  Button, Row, Col, Image, ListGroup, Card, Form,
} from 'react-bootstrap';
import 'react-awesome-slider/dist/styles.css';
import Rating from './Rating';
import { getBookDetails } from '../Redux/actions/bookActions';
import Loading from './Loading';

const CurrentBook = ({ history, match }) => {
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading, error, book } = bookDetails;

  useEffect(() => {
    dispatch(getBookDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">Go back</Link>
      {loading ? <Loading />
        : (
          <Row>
            <Col md={6}>
              <Image src={book.image} alt={book.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Title:
                  <h3>{book.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  Author:
                  <h4>
                    {' '}
                    {book.author}
                    {' '}
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating value={book.rating} />
                </ListGroup.Item>
                <ListGroup.Item>
                  Price:
                  {book.price}
                  {' '}
                  &#8381;
                </ListGroup.Item>
                <ListGroup.Item>
                  Description:
                  <p>
                    {' '}
                    {book.description}
                  </p>

                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Price:
                      </Col>
                      <Col>
                        <strong>{book.price}</strong>
                        &#8381;
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        Qty :
                      </Col>
                      <Col>
                        <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                          {[0, 1, 2, 3, 4].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1 }
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button className="btn-block" type="button" onClick={addToCartHandler}>
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
    </>
  );
};

CurrentBook.propTypes = {
  match: PropTypes.object.isRequired,
};

export default CurrentBook;
