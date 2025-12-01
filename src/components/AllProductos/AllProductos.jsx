import React from 'react';
import { Helmet } from 'react-helmet-async';
import ItemListContainer from '../ItemListContainer/ItemListContainer.jsx';
import './AllProductos.css';

const AllProductos = () => (
  <div className="all-productos">
    <Helmet>
      <title>GameVerse | Todos los juegos</title>
      <meta
        name="description"
        content="Explora juegos de PS5, Xbox y Switch con búsqueda, paginación y un carrito siempre accesible."
      />
      <meta name="keywords" content="juegos PS5, juegos Xbox, juegos Switch, catálogo de videojuegos" />
    </Helmet>

    <div className="catalogo-wrapper">
      <ItemListContainer />
    </div>
  </div>
);

export default AllProductos;
