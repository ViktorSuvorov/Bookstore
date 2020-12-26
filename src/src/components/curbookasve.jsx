/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { Link } from 'react-router-dom';
import {
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Form,
} from 'react-bootstrap';
import Rating from './Rating';
import {
  getBookDetails,
  createBookReview,
  bookCreateReviewReset,
} from '../Redux/actions/bookActions';
import Loading from './Loading';
import Message from './Message';

const CurrentBook = ({ history, match }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading, error, book } = bookDetails;
  // console.log(typeof (book.image));
  // const myObject = JSON.parse(book.image);
  // console.log(myObject);
  // const result = book.image.substring(1, book.image.length - 1);
  console.log(book);

  // console.log(result);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const favorite = useSelector((state) => state.favorite);
  const { favoriteItems } = favorite;

  const bookReviewCreate = useSelector((state) => state.bookReviewCreate);
  const {
    success: successBookReview,
    error: errorBookReview,
  } = bookReviewCreate;

  useEffect(() => {
    console.log('FROM USEEFFECT');
    if (successBookReview) {
      setRating(0);
      setComment('');
    }
    if (!book.id || book.id !== match.params.id) {
      dispatch(getBookDetails(match.params.id));
      dispatch(bookCreateReviewReset());
    }
  }, [dispatch, successBookReview, book.id, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const addToFavouriteHandler = () => {
    history.push(`/profile/${match.params.id}`);
  };

  const sumbitHandler = (e) => {
    e.preventDefault();
    dispatch(createBookReview(match.params.id, { rating, comment }));
  };

  const images = book.image?.map((item) => item.url);
  console.log(images);

  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go back
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={book.image?.[0].url} alt={book.name} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  Author:
                  <h4>
                    {' '}
                    {book?.author?.name}
                    {' '}
                  </h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  Genre:
                  <h4>
                    {' '}
                    {book?.genre?.name}
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
                      <Col>Price:</Col>
                      <Col>
                        <strong>{book.price}</strong>
                        &#8381;
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty :</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[0, 1, 2, 3, 4].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h4>Add to favourite</h4>
                    {userInfo && !favoriteItems.includes(match.params.id) ? (
                      <Button
                        variant="outline-warning"
                        className="btn-block"
                        type="button"
                        onClick={addToFavouriteHandler}
                      >
                        {' '}
                        <i className="fa fa-heart" aria-hidden="true" />
                        {' '}
                        Add to
                        favourite
                      </Button>
                    ) : (
                      <ListGroup variant="flush">
                        <ListGroup.Item>
                          <Button
                            className="btn-block"
                            type="button"
                            onClick={addToFavouriteHandler}
                            disabled
                          >
                            {' '}
                            <i className="fa fa-heart" aria-hidden="true" />
                            {' '}
                            Add
                            to favourite
                          </Button>
                        </ListGroup.Item>
                        <Message variant="danger">
                          You must
                          {' '}
                          <Link to="/login">sign in</Link>
                          {' '}
                          to add to
                          favourite
                        </Message>
                      </ListGroup>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {book.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant="flush">
                {book.reviews.map((review) => (
                  <ListGroup.Item key={review.id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Add a review</h2>
                  {errorBookReview && (
                    <Message variant="danger">{errorBookReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={sumbitHandler}>
                      <Form.Group controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>
                      <Button type="sumbit">Submit</Button>
                    </Form>
                  ) : (
                    <Message variant="danger">
                      You must
                      {' '}
                      <Link to="/login">sign in</Link>
                      {' '}
                      to write a
                      review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default CurrentBook;
