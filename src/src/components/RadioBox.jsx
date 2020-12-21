/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);
  const handleChange = (e) => {
    handleFilters(e.target.value);
    setValue(e.target.value);
  };

  return (prices.map((price) => (
    <div key={price.id}>
      <input
        onChange={handleChange}
        type="radio"
        name={price}
        className="form-check-input"
        value={`${price.id}`}
      />
      <label className="form-check-label">{price.name}</label>
    </div>
  )));
};

export default RadioBox;
