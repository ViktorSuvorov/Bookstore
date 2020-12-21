/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import {
  Form, Button, Row, Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { getUserDetails, updateUserProfile, userUpdateProfileReset } from '../Redux/actions/userActions';
import Message from '../components/Message';
import Favorite from '../components/Favorite';

const ProfilePage = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const userDetails = useSelector((state) => state.userDetails);
  const { isLoading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  console.log(success);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!user || !user.name || success) {
      dispatch(userUpdateProfileReset());
      dispatch(getUserDetails('profile'));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(updateUserProfile({
        id: user.id,
        name,
        email,
        password,
      }));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h1>User Profile</h1>
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message>Profile updated</Message>}
        {error && <Message>{error}</Message>}
        {isLoading && <Loading />}
        <Form onSubmit={(e) => submitHandler(e)}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="password ">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password "
              placeholder="Enter password "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword ">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password "
              placeholder="Confirm password "
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h3>Favorite books</h3>
        <Route render={({ match }) => <Favorite history={history} match={match} />} />
      </Col>
    </Row>
  );
};

export default ProfilePage;
