import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSave, FaImage } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import { createProduct, deleteProduct, fetchProductById, updateProduct } from '../../services/products.js';
import uploadImage from '../../services/uploadImage.js';
import validateProduct from '../../utils/validateProduct.js';
import { PopupMessage } from '../PopupMessage/popupMessage.js';
import './ProductFormContainer.css';

const emptyProduct = {
  name: '',
  price: '',
  description: '',
  imageUrl: '',
  platform: '',
};

const ProductFormContainer = () => {
  const [product, setProduct] = useState(emptyProduct);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct({
          ...data,
          imageUrl: data.imageUrl || '',
          platform: Array.isArray(data.platform) ? data.platform.join(', ') : data.platform,
        });
      } catch (err) {
        setError(err.message || 'No pudimos cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const validation = validateProduct(product);
    if (!validation.isValid) {
      const firstError = Object.values(validation.errors)[0];
      setError(firstError);
      return;
    }

    const payload = {
      name: product.name,
      price: Number(product.price),
      description: product.description,
      imageUrl: product.imageUrl,
      platform: product.platform.split(',').map((p) => p.trim()).filter(Boolean),
    };

    try {
      setLoading(true);
      setError('');
      if (id) {
        await updateProduct(id, payload);
        PopupMessage.success('Producto actualizado');
      } else {
        await createProduct(payload);
        PopupMessage.success('Producto creado');
      }
      navigate('/');
    } catch (err) {
      setError(err.message || 'No pudimos guardar el producto');
      PopupMessage.error(err.message || 'No pudimos guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    const confirmed = window.confirm('¿Seguro que quieres eliminar este producto?');
    if (!confirmed) return;

    try {
      setDeleting(true);
      await deleteProduct(id);
      PopupMessage.success('Producto eliminado');
      navigate('/');
    } catch (err) {
      const message = err.message || 'No pudimos eliminar el producto';
      setError(message);
      PopupMessage.error(message);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="product-form card shadow-sm">
      <Helmet>
        <title>{id ? 'Editar juego | GameVerse' : 'Nuevo juego | GameVerse'}</title>
        <meta
          name="description"
          content="Gestiona el catálogo agregando o editando juegos con validaciones y subida de imágenes."
        />
      </Helmet>
      <div className="card-body">
        <button
          type="button"
          className="btn btn-outline-secondary mb-3"
          onClick={() => navigate(-1)}
        >
          Volver
        </button>
        <h3 className="card-title mb-3">{id ? 'Editar producto' : 'Alta de producto'}</h3>
        {error && <div className="alert alert-warning">{error}</div>}
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="name">Nombre</label>
            <input id="name" name="name" className="form-control" value={product.name} onChange={handleChange} required />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="price">Precio</label>
            <input id="price" name="price" type="number" min="0" className="form-control" value={product.price} onChange={handleChange} required />
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="description">Descripción</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="3"
              value={product.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="imageUrl">Imagen (URL)</label>
            <input id="imageUrl" name="imageUrl" className="form-control" value={product.imageUrl} onChange={handleChange} />
            <label className="form-label mt-2" htmlFor="imageFile">o subir imagen</label>
            <div className="input-group">
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                className="form-control"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  try {
                    setImageUploading(true);
                    const url = await uploadImage(file);
                    setProduct((prev) => ({ ...prev, imageUrl: url }));
                    PopupMessage.success('Imagen lista para usar');
                  } catch (uploadError) {
                    PopupMessage.error(uploadError.message);
                  } finally {
                    setImageUploading(false);
                  }
                }}
              />
              <span className="input-group-text">
                {imageUploading ? 'Subiendo...' : <FaImage />}
              </span>
            </div>
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="platform">Plataformas (separadas por coma)</label>
            <input
              id="platform"
              name="platform"
              className="form-control"
              value={product.platform}
              onChange={handleChange}
              placeholder="PS5, Xbox, Switch"
            />
          </div>
          <div className="col-12 d-flex justify-content-between align-items-center product-form-actions">
            {id && (
              <button
                type="button"
                className="btn btn-outline-danger d-flex align-items-center gap-2"
                onClick={handleDelete}
                disabled={loading || deleting}
              >
                {deleting ? 'Eliminando...' : 'Eliminar'}
              </button>
            )}
            <div className="ms-auto">
              <button
                type="submit"
                className="btn btn-primary d-flex align-items-center gap-2"
                disabled={loading || deleting}
              >
                <FaSave />
                {loading ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormContainer;
