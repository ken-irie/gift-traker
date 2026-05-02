import React from 'react';

const FilterBar = ({ searchTerm, onSearchChange, selectedCategory, onCategoryChange, categories }) => {
  return (
    <div className="filter-bar">
      <div className="search-group">
        <input
          type="text"
          placeholder="プレゼント名または送り主で検索..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="category-group">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="category-select"
        >
          <option value="">すべてのカテゴリ</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
