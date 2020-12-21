/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const Checkbox = ({ authors, handleFilters }) => {
  const [checked, setChecked] = useState([]);
  const handleToggle = (author) => () => {
    const currentAuthorId = checked.indexOf(author);
    const newCheckedAuthorId = [...checked];
    if (currentAuthorId === -1) {
      newCheckedAuthorId.push(author);
    } else {
      newCheckedAuthorId.splice(currentAuthorId, 1);
    }
    setChecked(newCheckedAuthorId);
    handleFilters(newCheckedAuthorId);
  };

  return authors.map((author) => (
    <li className="list-unstyled" key={author.id}>
      <input
        onChange={handleToggle(author.id)}
        type="checkbox"
        className="form-check-input"
        value={checked.indexOf(author.id === -1)}
      />
      <label className="form-check-label">{author.name}</label>
    </li>
  ));
};

export default Checkbox;
