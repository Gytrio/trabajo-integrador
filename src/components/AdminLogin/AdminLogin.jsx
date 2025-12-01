import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FaLock,
  FaSignInAlt,
  FaArrowLeft,
  FaSignOutAlt,
  FaArrowRight,
} from 'react-icons/fa';
import { PopupMessage } from '../PopupMessage/popupMessage.js';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const redirectPath = useMemo(() => location.state?.from?.pathname || '/admin', [location.state]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('isAdmin', 'true');
      PopupMessage.success('Acceso de administrador concedido');
      navigate(redirectPath, { replace: true });
    } else {
      PopupMessage.error('Usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    PopupMessage.info('Sesión de administrador cerrada');
    navigate('/', { replace: true });
  };

  const handleGoToAdmin = () => {
    navigate('/admin');
  };

  return (
    <section className="admin-login container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <FaLock size={24} className="text-primary" />
                <h1 className="h4 mb-0">Acceso administrador</h1>
              </div>
              <p className="text-muted mb-4">Ingresa con las credenciales provistas para gestionar el catálogo.</p>
              {isAdmin && (
                <div className="alert alert-info d-flex align-items-center gap-2" role="alert">
                  Ya tienes una sesión de administrador activa.
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary ms-auto d-flex align-items-center gap-2"
                    onClick={handleGoToAdmin}
                  >
                    <FaArrowRight />
                    Ir al panel
                  </button>
                </div>
              )}
              <form className="admin-login-form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Usuario</label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    className="form-control"
                    autoComplete="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="form-control"
                    autoComplete="current-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2">
                  <FaSignInAlt />
                  Ingresar
                </button>
              </form>
              <div className="d-flex flex-wrap gap-2 mt-4">
                <Link className="btn btn-outline-secondary d-flex align-items-center gap-2" to="/">
                  <FaArrowLeft />
                  Volver al catálogo
                </Link>
                <button
                  type="button"
                  className="btn btn-outline-danger d-flex align-items-center gap-2 ms-auto"
                  onClick={handleLogout}
                  disabled={!isAdmin}
                >
                  <FaSignOutAlt />
                  Cerrar sesión admin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
