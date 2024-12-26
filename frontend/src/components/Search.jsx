import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-container">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search songs..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default Search;
