import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <nav aria-label="Paginación de productos">
    <ul className="pagination justify-content-center mt-3">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button type="button" className="page-link" onClick={() => onPageChange(currentPage - 1)} aria-label="Página anterior">
          Anterior
        </button>
      </li>
      {Array.from({ length: totalPages }).map((_, index) => (
        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
          <button type="button" className="page-link" onClick={() => onPageChange(index + 1)}>
            {index + 1}
          </button>
        </li>
      ))}
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button type="button" className="page-link" onClick={() => onPageChange(currentPage + 1)} aria-label="Página siguiente">
          Siguiente
        </button>
      </li>
    </ul>
  </nav>
);

export default Pagination;
