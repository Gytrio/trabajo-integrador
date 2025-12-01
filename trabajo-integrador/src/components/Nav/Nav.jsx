import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import useCartContext from '../../context/CartContext/useCartContext.js';
import './Nav.css';

const Nav = () => {
  const { totalItems } = useCartContext();

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">GameVerse</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/category/ps5">PS5</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/category/xbox">Xbox</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/category/switch">Switch</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2 flex-wrap flex-lg-nowrap">
            <li className="nav-item">
              <NavLink className="nav-link position-relative" to="/cart">
                <FaShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                    {totalItems}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Nav;
