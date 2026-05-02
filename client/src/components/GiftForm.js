import React, { useState } from 'react';

const GiftForm = ({ onSubmit, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    giver: '',
    category: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.date || !formData.giver) {
      alert('名前、日付、送り主は必須です');
      return;
    }
    onSubmit(formData);
    setFormData({
      name: '',
      date: '',
      giver: '',
      category: '',
      notes: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="gift-form">
      <div className="form-group">
        <label htmlFor="name">プレゼント名 *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="例: 時計、本"
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">受け取った日 *</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="giver">送り主 *</label>
        <input
          type="text"
          id="giver"
          name="giver"
          value={formData.giver}
          onChange={handleChange}
          placeholder="例: 親友太郎"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">カテゴリ</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">カテゴリを選択</option>
          <option value="ファッション">ファッション</option>
          <option value="本">本</option>
          <option value="電子機器">電子機器</option>
          <option value="その他">その他</option>
          {categories.map(cat => (
            cat && !['ファッション', '本', '電子機器', 'その他'].includes(cat) && (
              <option key={cat} value={cat}>{cat}</option>
            )
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="notes">メモ</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="その他の情報"
          rows="3"
        />
      </div>

      <button type="submit" className="btn-submit">追加</button>
    </form>
  );
};

export default GiftForm;
