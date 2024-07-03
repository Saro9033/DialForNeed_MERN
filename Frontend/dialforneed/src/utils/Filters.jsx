import React from 'react';

const Filters = React.memo(({ item, isSelected, onCheckboxChange }) => {
  return (
    <li className='d-flex align-items-center' style={{ cursor: 'pointer', listStyleType: 'none' }}>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onCheckboxChange(item._id)}
      /> &nbsp;
      {item.title}
    </li>
  );
});

export default Filters;
