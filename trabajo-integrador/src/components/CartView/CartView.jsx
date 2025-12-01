import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import useCartContext from '../../context/CartContext/useCartContext.js';
import './CartView.css';

const CartView = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCartContext();

  const handleCheckout = () => {
    const confirmed = window.confirm('¿Está seguro de finalizar la compra?');
    if (!confirmed) return;

    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="cart-empty text-center py-5">
        <p className="lead mb-3 cart-empty-text">Tu carrito está vacío.</p>
        <Link className="btn btn-primary" to="/">Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className="cart-view card p-3 shadow-sm">
      <div className="cart-view-header d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Carrito</h3>
        <button type="button" className="btn btn-outline-danger d-flex align-items-center gap-2" onClick={clearCart}>
          <FaTrash />
          Vaciar carrito
        </button>
      </div>
      <ul className="list-group list-group-flush">
        {items.map((item) => (
          <li key={item.id} className="cart-view-item list-group-item d-flex flex-column flex-md-row align-items-md-center justify-content-between">
            <div className="cart-view-item-body">
              <h5 className="mb-1">{item.name}</h5>
              <p className="mb-1 text-muted">${Number(item.price).toFixed(2)}</p>
              <div className="d-flex align-items-center gap-2">
                <label htmlFor={`quantity-${item.id}`} className="form-label mb-0">Cantidad:</label>
                <input
                  id={`quantity-${item.id}`}
                  type="number"
                  min="1"
                  className="form-control"
                  style={{ width: '80px' }}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                />
              </div>
            </div>
            <div className="text-md-end mt-2 mt-md-0">
              <p className="mb-1">Subtotal: ${(item.quantity * Number(item.price)).toFixed(2)}</p>
              <button type="button" className="btn btn-link text-danger" onClick={() => removeItem(item.id)}>
                <FaTrash className="me-1" /> Quitar
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-view-footer d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mt-3">
        <div className="d-flex flex-column flex-md-row align-items-md-center gap-3">
          <p className="mb-0 d-flex align-items-center gap-2"><FaShoppingCart /> Items: {totalItems}</p>
          <p className="fw-bold mb-0">Total: ${totalPrice.toFixed(2)}</p>
        </div>
        <button type="button" className="btn btn-success cart-view-checkout" onClick={handleCheckout}>
          Finalizar compra
        </button>
      </div>
    </div>
  );
};

export default CartView;
