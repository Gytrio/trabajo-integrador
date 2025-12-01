import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { fetchProducts } from '../../services/products.js';
import { categoryBackground } from '../../utils/platformColors.js';
import SearchBar from '../SearchBar/SearchBar.jsx';
import ItemList from '../ItemList/ItemList.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import './ItemListContainer.css';

const ITEMS_PER_PAGE = 6;

const ItemListContainer = () => {
  const { categoryId = 'all' } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchProducts();
        const normalized = Array.isArray(data) ? data : [];

        if (normalized.length === 0) {
          setProducts([]);
          setError('No pudimos cargar productos');
          return;
        }

        setProducts(normalized);
      } catch (err) {
        setError(err.message || 'No pudimos cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, categoryId]);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return products.filter((product) => {
      const platformText = Array.isArray(product.platform)
        ? product.platform.join(', ').toLowerCase()
        : (product.platform || '').toLowerCase();
      const matchesSearch = product.name?.toLowerCase().includes(term)
        || product.description?.toLowerCase().includes(term)
        || platformText.includes(term);
      const platforms = Array.isArray(product.platform)
        ? product.platform.map((p) => p.toLowerCase())
        : (product.platform || '').toLowerCase();
      const matchesCategory = categoryId === 'all'
        || platforms.includes(categoryId);
      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryId]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const title = categoryId === 'all' ? 'Catálogo completo' : `Juegos para ${categoryId.toUpperCase()}`;
  const background = categoryBackground(categoryId);

  return (
    <div className="item-list-container p-4 rounded-3" style={{ background }}>
      <Helmet>
        <title>{`${title} | GameVerse`}</title>
        <meta name="description" content="Explora y filtra juegos por plataforma con búsqueda instantánea y paginación." />
      </Helmet>
      <div className="item-list-container-controls d-flex flex-column flex-lg-row align-items-lg-center mb-3 gap-3">
        <h2 className="mb-0 text-white">{title}</h2>
        <div className="ms-lg-auto" style={{ minWidth: '320px' }}>
          <SearchBar value={search} onChange={setSearch} />
        </div>
      </div>
      {loading && <p className="text-white">Cargando productos...</p>}
      {error && <p className="text-warning">{error}</p>}
      {!loading && !error && (
        <>
          <ItemList products={paginated} currentCategory={categoryId} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default ItemListContainer;
