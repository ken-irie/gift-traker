const STORAGE_KEY = 'gifts_data';

export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const loadGifts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load gifts:', error);
    return [];
  }
};

export const saveGifts = (gifts) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gifts));
    return true;
  } catch (error) {
    console.error('Failed to save gifts:', error);
    return false;
  }
};

export const addGift = (gift) => {
  const gifts = loadGifts();
  const newGift = {
    ...gift,
    id: generateId(),
    createdAt: new Date().toISOString()
  };
  gifts.push(newGift);
  saveGifts(gifts);
  return newGift;
};

export const updateGift = (id, updatedGift) => {
  const gifts = loadGifts();
  const index = gifts.findIndex(g => g.id === id);
  if (index !== -1) {
    gifts[index] = { ...gifts[index], ...updatedGift };
    saveGifts(gifts);
    return gifts[index];
  }
  return null;
};

export const deleteGift = (id) => {
  const gifts = loadGifts();
  const filtered = gifts.filter(g => g.id !== id);
  saveGifts(filtered);
  return true;
};

export const getCategories = () => {
  const gifts = loadGifts();
  return [...new Set(gifts.map(g => g.category).filter(Boolean))];
};
