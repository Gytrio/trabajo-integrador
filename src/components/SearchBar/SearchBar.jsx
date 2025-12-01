import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = 'Buscar juegos...' }) => (
  <div className="search-bar input-group">
    <span className="input-group-text" aria-hidden>
      <FaSearch />
    </span>
    <input
      type="search"
      className="form-control form-control-lg"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Buscar juegos"
    />
  </div>
);

export default SearchBar;
