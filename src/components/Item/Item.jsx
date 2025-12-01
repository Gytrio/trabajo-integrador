import React from 'react';
import { Link } from 'react-router-dom';
import { platformColors } from '../../utils/platformColors.js';
import './Item.css';

const Item = ({ product, currentCategory = 'all' }) => {
  const { id, name, price, imageUrl, platform, description } = product;
  const platformArray = Array.isArray(platform) ? platform : (platform ? platform.split(',').map((p) => p.trim()) : []);
  const mainPlatform = platformArray[0] || 'All';
  const colorContext = currentCategory !== 'all' ? currentCategory : mainPlatform;

  const buttonStyle = {
    backgroundColor: platformColors(colorContext),
    borderColor: platformColors(colorContext),
  };

  return (
    <div className="item col mb-4">
      <div className="card h-100 shadow-sm">
        {imageUrl && (
          <img src={imageUrl} className="card-img-top item-image" alt={name} />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{name}</h5>
          <p className="card-text text-muted">{description?.slice(0, 80)}...</p>
          <div className="mb-2 d-flex flex-wrap gap-2">
            {platformArray.map((platformItem) => (
              <span key={`${id}-${platformItem}`} className="badge" style={{ backgroundColor: platformColors(platformItem) }}>
                {platformItem}
              </span>
            ))}
          </div>
          <div className="mt-auto d-flex flex-column align-items-center gap-2 item-cta">
            <span className="fw-bold fs-5 text-primary">${Number(price).toFixed(2)}</span>
            <Link className="btn view-button" style={buttonStyle} to={`/item/${id}`}>
              Ver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
