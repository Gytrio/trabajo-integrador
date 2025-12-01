export const platformColors = (platform) => {
  const normalized = platform?.toString().toLowerCase();
  if (normalized?.includes('ps')) return '#1f4ea8';
  if (normalized?.includes('xbox')) return '#1c9c4b';
  if (normalized?.includes('switch')) return '#e11d48';
  return '#6b7280';
};

export const categoryBackground = (category) => {
  const normalized = category?.toString().toLowerCase();
  if (normalized?.includes('ps5')) return 'linear-gradient(135deg, #0b3d91, #1d4ed8)';
  if (normalized?.includes('xbox')) return 'linear-gradient(135deg, #0b8a3c, #22c55e)';
  if (normalized?.includes('switch')) return 'linear-gradient(135deg, #b91c1c, #ef4444)';
  return 'linear-gradient(135deg, #0f172a, #1e293b)';
};
