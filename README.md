# GameVerse Shop

E-commerce de juegos para PS5, Xbox y Nintendo Switch construido con React + Vite. Incluye carrito con Context API, catálogo consumiendo MockAPI, detalle de producto, búsqueda, paginación y alta/edición de productos.

## Características
- **Rutas y navegación** con React Router: inicio, categorías (PS5, Xbox, Switch), detalle, carrito, panel admin y alta/edición de productos.
- **Contextos**: `CartContext` (agregar, quitar, actualizar, vaciar y totalizar items) para el carrito global.
- **Catálogo conectado a API**: `ItemListContainer` y `ItemDetailContainer` piden productos/1 producto a MockAPI (configurable con `VITE_API_URL`, por defecto https://6927a728b35b4ffc50129c2e.mockapi.io/GameVerse/products). El consumo es online por defecto, sin datasets locales.
- **UI y UX**: fondos temáticos por consola, diseño mobile-first con Bootstrap + styled-components, búsqueda en vivo, paginación, badges de plataformas múltiples, React Icons y notificaciones con PopupMessage (React Toastify).
- **Alta/edición**: formulario controlado con validaciones (nombre, precio > 0, descripción ≥ 10) y soporte de subida de imagen vía Imgbb (clave `VITE_IMGBB_KEY`, valor por defecto incluido) con fallback a `VITE_UPLOAD_URL` o conversión local.
- **SEO básico**: React Helmet ajusta títulos/descripciones por vista (catálogo, detalle y formulario) para mejor visibilidad.
- **Carrito**: `src/context/CartContext` contiene `CartContext.js`, `CartProvider.jsx` y `useCartContext.js`; la app se envuelve con `<CartProvider>` en `src/main.jsx` y los componentes consumen el hook `useCartContext` (sin `CartContext.jsx`).

## Acceso al panel de administración
- Las rutas `/admin`, `/admin/manage`, `/admin/new` y `/admin/edit/:id` están protegidas con un flag local (`localStorage.isAdmin === "true"`) y redirigen automáticamente a `/login` si no hay sesión activa.
- Ingresa a `/login` y usa las credenciales **admin / 1234** para habilitar el acceso; tras el login volverás a la ruta de admin que intentabas abrir. Desde la misma pantalla puedes cerrar la sesión de administrador.

## Configuración
1. Instala dependencias (requiere conexión a npm):
   ```bash
   npm install
   ```
2. Opcional: define tu endpoint de MockAPI en `.env.local` (por defecto ya apunta a `https://6927a728b35b4ffc50129c2e.mockapi.io/GameVerse/products`):
   ```bash
   echo "VITE_API_URL=https://tu-mockapi.io/api/products" > .env.local
   ```
   El proyecto trae un endpoint público de ejemplo para desarrollo rápido.
3. Ejecuta en modo desarrollo:
   ```bash
   npm run dev
   ```
4. Compila para producción y prueba el build:
   ```bash
 npm run build
  npm run preview
  ```
5. Opcional: define tu propia clave de Imgbb si no quieres usar la incluida en el helper (`VITE_IMGBB_KEY=tu-clave`).

## Estructura rápida
- `src/services/products.js`: CRUD contra MockAPI con normalización de plataformas/imágenes.
- `src/services/uploadImage.js`: helper para subir imágenes a Imgbb (con clave por defecto o `VITE_IMGBB_KEY`) o convertirlas localmente.
- `src/utils/validateProduct.js`: validaciones reutilizables para alta/edición.

## Notas
- El carrito se guarda en `localStorage`.
- Cada categoría aplica un fondo acorde a la consola (PS5 azul, Xbox verde, Switch rojo).
- Las portadas incluidas en `public/images` son ilustraciones locales preparadas para uso offline.
