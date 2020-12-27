/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import {
  Form, Button, Row, Col, Image, OverlayTrigger,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import {
  getUserDetails,
  updateUserProfile,
  userUpdateProfileReset,
} from '../Redux/actions/userActions';
import uploadImage from '../Api/Upload/uploadApi';
import Message from '../components/Message';
import Favorite from '../components/Favorite';
import RenderTooltip from '../components/Tooltip';

const ProfilePage = ({ history }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { isLoading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!user || !user.name || success) {
      dispatch(userUpdateProfileReset());
      dispatch(getUserDetails('profile'));
    } else {
      setName(user.name);
      setEmail(user.email);
      setImage(user.image);
    }
  }, [dispatch, history, userInfo, user, success]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const { data } = await uploadImage(formData);
      setImage(data);
      setUploading(false);
    } catch (err) {
      console.error(err);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      dispatch(
        updateUserProfile({
          id: user.id,
          name,
          email,
          password,
          image,
        }),
      );
    }
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <h1>User Profile</h1>
          {message && <Message variant="danger">{message}</Message>}
          {success && <Message>Profile updated</Message>}
          {error && <Message>{error}</Message>}
          {isLoading && <Loading />}
          <Image
            src={user?.image}
            className="my-1"
            alt="user avatar"
            rounded
            fluid
          />
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

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              >
                {uploading && <Loading />}
              </Form.File>
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
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={RenderTooltip}
            >
              <Button type="submit" variant="primary">
                Update
              </Button>
            </OverlayTrigger>
          </Form>
        </Col>
        <Col md={9}>
          <h3>Favorite books</h3>
          <Route
            render={({ match }) => <Favorite history={history} match={match} />}
          />
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
