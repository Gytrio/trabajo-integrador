const validateProduct = (product) => {
  const errors = {};

  if (!product.name?.trim()) {
    errors.name = 'El nombre es obligatorio';
  }

  if (Number(product.price) <= 0) {
    errors.price = 'El precio debe ser mayor a 0';
  }

  if (!product.description || product.description.trim().length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres';
  }

  if (!product.platform || product.platform.split(',').map((p) => p.trim()).filter(Boolean).length === 0) {
    errors.platform = 'Indica al menos una plataforma';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export default validateProduct;
