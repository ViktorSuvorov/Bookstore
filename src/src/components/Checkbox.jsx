/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const Checkbox = ({ filterList, handleFilters }) => {
  const [checked, setChecked] = useState([]);
  const handleToggle = (item) => () => {
    const currentItemId = checked.indexOf(item);
    const newCheckedItemId = [...checked];
    if (currentItemId === -1) {
      newCheckedItemId.push(item);
    } else {
      newCheckedItemId.splice(currentItemId, 1);
    }
    setChecked(newCheckedItemId);
    handleFilters(newCheckedItemId);
  };

  return filterList.map((iten) => (
    <li className="list-unstyled" key={iten.id}>
      <input
        onChange={handleToggle(iten.id)}
        type="checkbox"
        className="form-check-input"
        value={checked.indexOf(iten.id === -1)}
      />
      <label className="form-check-label">{iten.name}</label>
    </li>
  ));
};

export default Checkbox;
