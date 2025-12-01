import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchProductById } from '../../services/products.js';
import ItemDetail from '../ItemDetail/ItemDetail.jsx';
import { categoryBackground } from '../../utils/platformColors.js';
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message || 'No pudimos cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const primaryPlatform = Array.isArray(product?.platform)
    ? product.platform[0]?.toLowerCase()
    : (product?.platform || '').toLowerCase();
  const background = categoryBackground(primaryPlatform);

  return (
    <div className="item-detail-container p-4 rounded-3" style={{ background }}>
      <button
        type="button"
        className="btn btn-outline-light mb-3"
        onClick={() => navigate(-1)}
      >
        Volver
      </button>
      {product && (
        <Helmet>
          <title>{`${product.name} | GameVerse`}</title>
          <meta name="description" content={product.description?.slice(0, 150)} />
        </Helmet>
      )}
      {loading && <p className="item-detail-container-status text-white">Cargando producto...</p>}
      {error && <p className="item-detail-container-status text-warning">{error}</p>}
      {!loading && !error && product && (
        <ItemDetail product={product} />
      )}
    </div>
  );
};

export default ItemDetailContainer;
