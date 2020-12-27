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

  return filterList.map((item) => (
    <li className="list-unstyled" key={item.id}>
      <input
        id="checkboxId"
        onChange={handleToggle(item.id)}
        type="checkbox"
        className="form-check-input"
        value={checked.indexOf(item.id === -1)}
      />
      <label htmlFor="checkboxId" className="form-check-label">
        {item.name}
      </label>
    </li>
  ));
};

export default Checkbox;
