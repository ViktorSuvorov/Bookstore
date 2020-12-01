import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const FilterBy = () => {
  const [filter, setActiveFilter] = useState();
  const handleItemClick = (e) => {
    setActiveFilter(e.target.innerHTML);
  };

  return (
    <ListGroup as="ul">
      <ListGroup.Item name="All" as="li" active={filter === 'All'} onClick={(e) => handleItemClick(e)}>
        All
      </ListGroup.Item>
      <ListGroup.Item name="Name" as="li" active={filter === 'Name'} onClick={(e) => handleItemClick(e)}>
        Name
      </ListGroup.Item>
      <ListGroup.Item name="Author" as="li" active={filter === 'Author'} onClick={handleItemClick}>Author</ListGroup.Item>
      <ListGroup.Item name="Price-cheap" as="li" active={filter === 'Price-cheap'} onClick={handleItemClick}>
        Price-cheap
      </ListGroup.Item>
      <ListGroup.Item name="Price-expencive" as="li" active={filter === 'Price-exprencive'} onClick={handleItemClick}>
        Price-exprencive
      </ListGroup.Item>
      <ListGroup.Item name="Rating" as="li" active={filter === 'Rating'} onClick={handleItemClick}>Rating</ListGroup.Item>
    </ListGroup>
  );
};

export default FilterBy;
