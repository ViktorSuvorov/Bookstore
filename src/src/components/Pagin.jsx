import React from 'react';
import PropTypes from 'prop-types';
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

Pagin.defaultProps = {
  keyword: '',
  isAdmin: false,
};

Pagin.propTypes = {
  pages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool,
  keyword: PropTypes.string,
};

export default Pagin;
