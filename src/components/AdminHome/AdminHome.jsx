import React from 'react';
import { Link } from 'react-router-dom';
import { FaTools, FaPlusCircle, FaArrowLeft, FaClipboardList } from 'react-icons/fa';
import './AdminHome.css';

const AdminHome = () => (
  <section className="admin-home container">
    <div className="admin-card bg-white rounded shadow-sm p-4">
      <div className="d-flex align-items-center gap-3 mb-3">
        <FaTools className="text-primary" size={28} />
        <h1 className="h3 mb-0 admin-home-title">Panel de administración</h1>
      </div>
      <p className="text-muted mb-4">
        Gestiona el catálogo creando nuevos productos o regresando al catálogo para revisarlos.
      </p>
      <div className="d-flex flex-wrap gap-3">
        <Link className="btn btn-primary d-inline-flex align-items-center gap-2" to="/admin/new">
          <FaPlusCircle />
          Nuevo producto
        </Link>
        <Link className="btn btn-outline-primary d-inline-flex align-items-center gap-2" to="/admin/manage">
          <FaClipboardList />
          Editar o eliminar productos
        </Link>
        <Link className="btn btn-outline-secondary d-inline-flex align-items-center gap-2" to="/">
          <FaArrowLeft />
          Volver al catálogo
        </Link>
      </div>
    </div>
  </section>
);

export default AdminHome;
