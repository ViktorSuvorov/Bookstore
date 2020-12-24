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
import { uploadBookImage } from '../Api/Upload/uploadApi';

const BookEditPage = ({ match, history }) => {
  const dispatch = useDispatch();
  const bookId = Number(match.params.id);

  // ИЗМЕНИТЬ НА useReducer, когда закончу с функционалом.
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [pictures, setPictures] = useState([]);

  const onDrop = (picture) => {
    setPictures(picture);
  };
  console.log(pictures);

  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading, error, book } = bookDetails;
  console.log(book);

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
      setPrice(book.email);
      setImage(book.image);
      setAuthor(book.author);
      setGenre(book.genre);
      setDescription(book.description);
    }
  }, [dispatch, history, bookId, book, successUpdate]);

  const uploadFileHandler = async (e) => {
    console.log(e.target);
    const file = pictures;
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);
    try {
      const { data } = await uploadBookImage(formData);
      setImage(...image, data);
      setUploading(false);
    } catch {
      setUploading(false);
    }
  };
  console.log(image);

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

  const imageUploadSubmitHandler = (e) => {
    setImage(e.target.value);
  };

  const upimg = () => {
    const uploadPictures = pictures.map((item) => {
      const formData = new FormData();
      formData.append('image', item, item.name);
      return axios.post('http://localhost:5000/api/upload', formData);
    });
    axios.all(uploadPictures).then((results) => {
      setImage(...pictures, results);
    })
      .catch((e) => {
        console.log(e);
      });
    setImage(pictures);
    console.log('pictures', pictures);
    console.log('images', image);
    dispatch(updateBook({
      id: bookId,
      name,
      price,
      image,
      description,
    }));
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

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler} />
              <Button type="submit" variant="primary" onSubmit={(e) => imageUploadSubmitHandler(e)}>Upload Images</Button>
              {uploading && <Loading />}
            </Form.Group>
            <Form.Group controlId="author">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                as="select"
                placeholder="Choose author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}

              >
                {[...Array(book.authorId).keys()].map(
                  (x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ),
                )}
              </Form.Control>
            </Form.Group>
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
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
      <ImageUploader
        withIcon
        buttonText="Choose images"
        withPreview="true"
        onChange={onDrop}
        imgExtension={['.jpg', '.gif', '.png', '.jpeg']}
        maxFileSize={5242880}
      />
      <Button onClick={upimg}>UP</Button>
    </>
  );
};

export default BookEditPage;
