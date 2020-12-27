/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loading from '../components/Loading';
import FormContainer from '../components/FormContainer';
import { reviewUpdateReset, updateReview } from '../Redux/actions/bookActions';

const ReviewEditPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const bookId = match.params.id;
  const { reviewId } = match.params;

  const reviewUpdate = useSelector((state) => state.bookReviewUpdate);
  const { loading, error, success } = reviewUpdate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateReview({
        bookId,
        rating,
        comment,
        reviewId,
      }),
    );
  };

  useEffect(() => {
    if (success) {
      dispatch(reviewUpdateReset());
      history.push(`/book/${match.params.id}`);
    }
  }, [dispatch, history, success]);

  return (
    <>
      <Link to={`/book/${match.params.id}`} className="btn btn-dark my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Review edit</h1>
        {loading && <Loading />}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="comment"
              placeholder="Enter new comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="rating">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              type="number"
              as="select"
              placeholder="Enter new rating"
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
          <Button type="submit" variant="primary">
            Update review
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ReviewEditPage;
