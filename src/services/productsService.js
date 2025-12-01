const API_URL = import.meta.env.VITE_API_URL || 'https://65fd64b39fc4425c6531985c.mockapi.io/api/products';
const LOCAL_DATA_URL = '/data/products.json';

const normalizeProduct = (product) => {
  if (!product) return product;
  const platformsRaw = product.platforms ?? product.platform ?? [];
  const platforms = Array.isArray(platformsRaw)
    ? platformsRaw
    : (platformsRaw ? platformsRaw.split(',').map((p) => p.trim()) : []);
  const image = product.image ?? product.imageUrl ?? '';
  return {
    ...product,
    image,
    platforms,
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Error al comunicarse con la API');
  }
  return response.json();
};

const fetchLocalProducts = async () => {
  const response = await fetch(LOCAL_DATA_URL);
  const data = await handleResponse(response);
  return Array.isArray(data) ? data.map(normalizeProduct) : [];
};

export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await handleResponse(response);
    return Array.isArray(data) ? data.map(normalizeProduct) : [];
  } catch (error) {
    console.warn('Falling back to local products.json', error);
    return fetchLocalProducts();
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await handleResponse(response);
    return normalizeProduct(data);
  } catch (error) {
    console.warn('Falling back to local products.json', error);
    const localProducts = await fetchLocalProducts();
    const local = localProducts.find((item) => String(item.id) === String(id));
    if (!local) {
      throw error;
    }
    return normalizeProduct(local);
  }
};

export const createProduct = async (payload) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

export const updateProduct = async (id, payload) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
};

export const deleteProduct = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  return handleResponse(response);
};
