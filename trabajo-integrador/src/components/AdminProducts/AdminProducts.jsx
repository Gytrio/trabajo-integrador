import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaSync } from 'react-icons/fa';
import { fetchProducts, deleteProduct } from '../../services/products.js';
import { PopupMessage } from '../PopupMessage/popupMessage.js';
import './AdminProducts.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => String(a.name).localeCompare(String(b.name))),
    [products],
  );

  const loadProducts = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError('No se pudieron cargar los productos.');
      PopupMessage.error('No se pudieron cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`¿Deseas eliminar "${name}"?`);
    if (!confirmed) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((item) => String(item.id) !== String(id)));
      PopupMessage.success('Producto eliminado correctamente');
    } catch (err) {
      console.error(err);
      PopupMessage.error('No se pudo eliminar el producto');
    }
  };

  return (
    <section className="admin-products container">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <div>
          <h1 className="h4 mb-1">Gestión de productos</h1>
          <p className="admin-products-subtitle mb-0">Edita o da de baja productos existentes del catálogo.</p>
        </div>
        <div className="d-flex gap-2 flex-wrap align-items-center">
          <Link className="btn btn-outline-secondary" to="/admin">
            Volver
          </Link>
          <button className="btn btn-outline-secondary d-inline-flex align-items-center gap-2" type="button" onClick={loadProducts} disabled={loading}>
            <FaSync className={loading ? 'spin' : ''} />
            Refrescar
          </button>
        </div>
      </div>

      {loading && <div className="alert alert-info">Cargando productos...</div>}
      {error && <div className="alert alert-danger mb-3">{error}</div>}

      {!loading && sortedProducts.length === 0 && (
        <div className="alert alert-warning">No hay productos disponibles.</div>
      )}

      {!loading && sortedProducts.length > 0 && (
        <div className="table-responsive">
          <table className="table align-middle admin-products-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Plataformas</th>
                <th className="text-end">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${Number(product.price || 0).toFixed(2)}</td>
                  <td>
                    {product.platform && product.platform.length > 0
                      ? product.platform.join(', ')
                      : '—'}
                  </td>
                  <td className="text-end">
                    <div className="d-inline-flex gap-2">
                      <Link className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1" to={`/admin/edit/${product.id}`}>
                        <FaEdit />
                        Editar
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger d-inline-flex align-items-center gap-1"
                        type="button"
                        onClick={() => handleDelete(product.id, product.name)}
                      >
                        <FaTrashAlt />
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminProducts;
