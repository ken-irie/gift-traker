import React, { useState, useEffect } from 'react';
import GiftForm from './components/GiftForm';
import GiftList from './components/GiftList';
import FilterBar from './components/FilterBar';
import { loadGifts, saveGifts, addGift, updateGift, deleteGift, getCategories } from './utils/storage';

function App() {
  const [gifts, setGifts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const loadedGifts = loadGifts();
    setGifts(loadedGifts);
    setCategories(getCategories());
  }, []);

  const handleAddGift = (formData) => {
    const newGift = addGift(formData);
    setGifts([...gifts, newGift]);
    const updatedCategories = getCategories();
    setCategories(updatedCategories);
  };

  const handleDeleteGift = (id) => {
    if (window.confirm('このプレゼントを削除してもよろしいですか？')) {
      deleteGift(id);
      setGifts(gifts.filter(g => g.id !== id));
      const updatedCategories = getCategories();
      setCategories(updatedCategories);
    }
  };

  const handleEditGift = (id, updatedData) => {
    updateGift(id, updatedData);
    setGifts(gifts.map(g => g.id === id ? { ...g, ...updatedData } : g));
    const updatedCategories = getCategories();
    setCategories(updatedCategories);
  };

  const filteredGifts = gifts.filter(gift => {
    const matchesSearch =
      gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gift.giver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || gift.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎁 ギフトトラッカー</h1>
        <p>もらったプレゼントを記録・管理しましょう</p>
      </header>

      <main className="app-main">
        <section className="form-section">
          <h2>プレゼントを追加</h2>
          <GiftForm onSubmit={handleAddGift} categories={categories} />
        </section>

        <section className="list-section">
          <h2>プレゼント一覧</h2>
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
          />
          <GiftList
            gifts={filteredGifts}
            onDelete={handleDeleteGift}
            onEdit={handleEditGift}
          />
          <p className="gift-count">合計: {filteredGifts.length}件</p>
        </section>
      </main>
    </div>
  );
}

export default App;
