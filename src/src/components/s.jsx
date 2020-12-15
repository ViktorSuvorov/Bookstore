/* eslint-disable no-unused-vars */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AwesomeSlider from 'react-awesome-slider';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { getCurrentBook } from '../Api/Book/bookApi';
import Header from './Header';
import 'react-awesome-slider/dist/styles.css';

const CurrentBook = ({ match }) => {
  const [book, setBook] = useState({
    name: '',
    image: '',
    author: '',
    price: +'',
  });

  const getBook = async () => {
    const response = await getCurrentBook(match.params.id);
    setBook(response.data);
  };

  useEffect(() => {
    getBook();
    return () => {
      setBook({});
    };
  }, []);

  return (
    <div className="container">
      <Header />
      <Link className="btn btn-dark my-3" to="/">Go back</Link>
      <BookName>{book.name}</BookName>
      <BookAuthor>
        Автор:
        {book.author}
      </BookAuthor>
      <FullSizeBookCard>
        <FullSizeBookCardLeft {...book}>
          <Img>
            <img style={{ width: '300px' }} src={book.image} alt="book cover img" />
          </Img>
          <AwesomeSlider>
            <div>
              <img
                style={{
                  width: '92%',
                  marginLeft: '10px',
                  marginRight: '10px',
                }}
                src={book.image}
                alt="book cover img"
              />
            </div>
            <div>
              <img
                style={{
                  width: '92%',
                  marginLeft: '10px',
                  marginRight: '10px',
                }}
                src={book.image}
                alt="book cover img"
              />
            </div>
          </AwesomeSlider>
        </FullSizeBookCardLeft>
        <FullSizeBookCardRight>
          <BookPrice>
            {book.price}
            &#8381;
          </BookPrice>
          <Button variant="dark" size="lg" block>В корзину</Button>
          <br />
          <p>Товар можно купить по Книжному абонементу</p>
          <h4>Caмовывоз</h4>
          <p>
            Сегодня в 2 магазинах
            Бесплатно
          </p>
          <h4>Пункты выдачи</h4>
          <p>
            5 декабря
            От 97
          </p>
          <h4>Курьерская доставка</h4>
          <p>
            5-6 декабря
            От 250
          </p>
        </FullSizeBookCardRight>
      </FullSizeBookCard>
      <BookDescription>
        <h2>Описание :</h2>
        <p>{book.description}</p>
      </BookDescription>
    </div>
  );
};

const FullSizeBookCard = styled.div`
width:100%;
margin:20px 20px;
display:flex;
`;

const FullSizeBookCardLeft = styled.div`
width:50%;
border:1px solid black;
box-shadow: -2px -2px 2px 2px grey;
border-radius:3px;
margin:20px 20px;
display:flex;
`;

const FullSizeBookCardRight = styled.div`
width:45%;
margin-left:30px;
`;

const BookPrice = styled.div`
font-size:25px;
font-weight:700;
`;

const Img = styled.div`
width:100%;
display:flex;
justify-content:center;
`;

const ImgLeft = styled.div`
width: 4rem;
min-height: .3125rem;
position: relative;
padding: 1.875rem 0;
`;

const BookDescription = styled.div`
text-align:left;
font-size:15px;
`;

const BookName = styled.h1`
text-align:left`;

const BookAuthor = styled.h1`
text-align:left`;

CurrentBook.propTypes = {
  match: PropTypes.object.isRequired,
};

export default CurrentBook;
