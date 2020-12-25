/* eslint-disable no-shadow */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ImageUploader from 'react-images-upload';
import Message from '../components/Message';
import Loading from '../components/Loading';
import FormContainer from '../components/FormContainer';
import { bookUpdateReset, getBookDetails, updateBook } from '../Redux/actions/bookActions';

const BookEditPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const bookId = Number(match.params.id);

  // ИЗМЕНИТЬ НА useReducer, когда закончу с функционалом.
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [pictures, setPictures] = useState('');
  const [upload, setUpload] = useState(false);
  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading, error, book } = bookDetails;

  const bookUpdate = useSelector((state) => state.bookUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = bookUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch(bookUpdateReset());
      history.push('/admin/booklist');
    } else if (!book.name || book.id !== bookId) {
      dispatch(getBookDetails(bookId));
    } else {
      setName(book.name);
      setPrice(book.price);
      setAuthor(book.author.name);
      setGenre(book.genre.name);
      setDescription(book.description);
    }
  }, [dispatch, history, bookId, book, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateBook({
      id: bookId,
      name,
      price,
      image,
      author,
      genre,
      description,
    }));
  };

  const onDrop = (picture) => {
    setPictures(picture);
  };

  const upimg = (e) => {
    const uploadPictures = pictures.map((item) => {
      const formData = new FormData();
      formData.append('image', item, item.name);
      return axios.post('http://localhost:5000/api/upload', formData);
    });
    axios.all(uploadPictures).then((results) => {
      const test = results.map((item) => item.data);
      setImage(test[0]);
      setUpload(true);
    })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Link to="/admin/booklist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Book</h1>
        {loadingUpdate && <Loading />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </Form.Group> */}

            <Form.Group controlId="genre">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter genre name"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update the book
            </Button>
          </Form>
        )}
      </FormContainer>

      <>
        {upload ? <Message className="text-align-center">SUCCESS</Message> : (
          <>
            <ImageUploader
              withIcon
              buttonText="Choose images"
              withPreview="true"
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
              maxFileSize={5242880}
            />
            <div className="d-flex justify-content-center">
              {pictures.length === 0 ? (<Button type="submit" onClick={upimg} disabled>PLEASE ADD IMAGES</Button>) : (
                <Button onClick={upimg}>UPLOAD</Button>
              )}
            </div>
          </>
        )}

      </>

    </>

  );
};

export default BookEditPage;
