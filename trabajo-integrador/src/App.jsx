import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Nav from './components/Nav/Nav.jsx';
import AllProductos from './components/AllProductos/AllProductos.jsx';
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer.jsx';
import CartView from './components/CartView/CartView.jsx';
import ProductFormContainer from './components/ProductFormContainer/ProductFormContainer.jsx';
import PopupMessage from './components/PopupMessage/PopupMessage.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import AdminHome from './components/AdminHome/AdminHome.jsx';
import AdminLogin from './components/AdminLogin/AdminLogin.jsx';
import AdminProducts from './components/AdminProducts/AdminProducts.jsx';

const App = () => (
  <>
    <Helmet>
      <title>GameVerse | Catálogo</title>
      <meta name="description" content="E-commerce de juegos PS5, Xbox y Switch con carrito y CRUD" />
    </Helmet>
    <Nav />
    <main className="app-main container py-4">
      <Routes>
        <Route path="/" element={<AllProductos />} />
        <Route path="/category/:categoryId" element={<ItemListContainer />} />
        <Route path="/item/:id" element={<ItemDetailContainer />} />
        <Route path="/cart" element={<CartView />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={(
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin/manage"
          element={(
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin/new"
          element={(
            <ProtectedRoute>
              <ProductFormContainer />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/admin/edit/:id"
          element={(
            <ProtectedRoute>
              <ProductFormContainer />
            </ProtectedRoute>
          )}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
    <PopupMessage />
  </>
);

export default App;
