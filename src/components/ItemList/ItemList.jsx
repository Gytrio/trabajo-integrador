import React from 'react';
import Item from '../Item/Item.jsx';
import './ItemList.css';

const ItemList = ({ products, currentCategory = 'all' }) => (
  <div className="item-list row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
    {products.map((product) => (
      <Item key={product.id} product={product} currentCategory={currentCategory} />
    ))}
  </div>
);

export default ItemList;
