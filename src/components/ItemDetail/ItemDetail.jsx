import React from 'react';
import { FaCartPlus } from 'react-icons/fa';
import useCartContext from '../../context/CartContext/useCartContext.js';
import { platformColors } from '../../utils/platformColors.js';
import { PopupMessage } from '../PopupMessage/popupMessage.js';
import './ItemDetail.css';

const ItemDetail = ({ product }) => {
  const { addItem } = useCartContext();
  const { name, description, price, imageUrl, platform } = product;
  const platformArray = Array.isArray(platform) ? platform : (platform ? platform.split(',').map((p) => p.trim()) : []);

  const handleAdd = () => {
    addItem(product);
    PopupMessage.success(`${name} agregado al carrito`);
  };

  return (
    <div className="item-detail card border-0 shadow-lg overflow-hidden">
      {imageUrl && (
        <img src={imageUrl} className="card-img-top item-detail-image" alt={name} />
      )}
      <div className="card-body">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3">
          <div>
            <h3 className="card-title mb-1">{name}</h3>
          </div>
          <div className="text-md-end">
            <p className="fs-3 fw-bold mb-1">${Number(price).toFixed(2)}</p>
            <button type="button" className="btn btn-primary btn-lg d-flex align-items-center gap-2" onClick={handleAdd}>
              <FaCartPlus />
              Agregar al carrito
            </button>
          </div>
        </div>
        <p className="lead">{description}</p>
        <div className="d-flex flex-wrap gap-2">
          {platformArray.map((platformItem) => (
            <span key={platformItem} className="badge" style={{ backgroundColor: platformColors(platformItem) }}>
              {platformItem}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
