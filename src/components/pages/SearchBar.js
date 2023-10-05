// SearchBar.js
import React from 'react';
import { useSearch } from './SearchContext';

function SearchBar() {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
}

export default SearchBar;
