const uploadImage = async (file) => {
  if (!file) {
    throw new Error('No se seleccionó ninguna imagen');
  }

  const imgbbKey = import.meta.env.VITE_IMGBB_KEY || '26cfecefef1bcee767939a82ee81ecb1';
  const uploadUrl = import.meta.env.VITE_UPLOAD_URL;

  if (imgbbKey) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      if (data?.data?.url) {
        return data.data.url;
      }
    }
  }

  if (uploadUrl) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('No pudimos subir la imagen');
    }

    const data = await response.json();
    return data.url || data.secure_url || '';
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('No pudimos procesar la imagen local'));
    reader.readAsDataURL(file);
  });
};

export default uploadImage;
