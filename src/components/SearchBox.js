import React from 'react';

const SearchBox = ({ onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by Student ID, Name, or Major"
      onChange={onSearchChange}
    />
  );
};

export default SearchBox;

