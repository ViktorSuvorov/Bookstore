/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Table, Button, Row, Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loading from '../components/Loading';
import {
  getBooksList,
  deleteBook,
  createBook,
  bookCreateReset,
} from '../Redux/actions/bookActions';
import Pagin from '../components/Pagin';

const BookListPage = ({ history, match }) => {
  const dispatch = useDispatch();
  const { pageNumber } = match.params || 1;

  const bookList = useSelector((state) => state.bookList);

  const {
    isLoading, error, books, page, pages,
  } = bookList;

  const bookDelete = useSelector((state) => state.bookDelete);
  const {
    isLoading: isLoadingDelete,
    error: errorDelete,
    success: successDelete,
  } = bookDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const bookCreate = useSelector((state) => state.bookCreate);
  const {
    isLoading: isLoadingCreate,
    error: errorCreate,
    success: successCreate,
    book: createdBook,
  } = bookCreate;

  useEffect(() => {
    dispatch(bookCreateReset());
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/login');
    }
    if (successCreate) {
      history.push(`/admin/book/${createdBook.id}/edit`);
    } else {
      dispatch(getBooksList('', pageNumber, ''));
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdBook,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    dispatch(deleteBook(id));
  };

  const createBookHandler = () => {
    dispatch(createBook());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Books</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createBookHandler}>
            <i className="fas fa-plus" />
            {' '}
            Create Book
          </Button>
        </Col>
      </Row>
      {isLoadingDelete && <Loading />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {isLoadingCreate && <Loading />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>GENRE</th>
                <th>AUTHOR</th>
                <th>DESCRIPTION</th>
                <th>EDIT/DELETE</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.name}</td>
                  <td>{book.price}</td>
                  <td>{book.genre.name}</td>
                  <td>{book.author.name}</td>
                  <td>{book.description}</td>
                  <td>
                    <LinkContainer to={`/admin/book/${book.id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(book.id)}
                    >
                      <i className="fas fa-trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagin pages={pages} page={page} isAdmin />
        </>
      )}
    </>
  );
};

export default BookListPage;
