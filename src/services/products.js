const API_URL = import.meta.env.VITE_API_URL || 'https://6927a728b35b4ffc50129c2e.mockapi.io/GameVerse/products';

const normalizeProduct = (product) => {
  if (!product) return product;

  const { image, imageUrl, imgUrl, imgURL, platform, platforms, plataform } = product;

  const platformSource = platform ?? platforms ?? plataform ?? [];
  const platformList = Array.isArray(platformSource)
    ? platformSource
    : (platformSource ? platformSource.split(',').map((p) => p.trim()) : []);

  const normalizedImageUrl = imageUrl ?? imgUrl ?? imgURL ?? image ?? '';

  return {
    id: product.id ?? '',
    name: product.name ?? '',
    price: Number(product.price ?? 0),
    description: product.description ?? '',
    imageUrl: normalizedImageUrl,
    platform: platformList,
  };
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Error al comunicarse con la API');
  }
  return response.json();
};

export const fetchProducts = async () => {
  const response = await fetch(API_URL);
  const data = await handleResponse(response);
  return Array.isArray(data) ? data.map(normalizeProduct) : [];
};

export const fetchProductById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  const data = await handleResponse(response);
  return normalizeProduct(data);
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
