/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Pagin = ({
  pages, page, isAdmin = false, keyword,
}) => pages > 1 && (
<Pagination>
  {[...Array(pages).keys()].map((x) => (
    <LinkContainer key={x + 1} to={!isAdmin ? keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}` : `/admin/booklist/${x + 1}`}>
      <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
    </LinkContainer>
  ))}
</Pagination>
);
export default Pagin;
