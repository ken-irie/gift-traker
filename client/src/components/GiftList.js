import React, { useState } from 'react';

const GiftList = ({ gifts, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (gift) => {
    setEditingId(gift.id);
    setEditData(gift);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = (id) => {
    onEdit(id, editData);
    setEditingId(null);
    setEditData({});
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('ja-JP');
  };

  if (gifts.length === 0) {
    return <div className="empty-message">プレゼントはまだ登録されていません</div>;
  }

  return (
    <div className="gift-list">
      <table className="gifts-table">
        <thead>
          <tr>
            <th>プレゼント名</th>
            <th>受け取った日</th>
            <th>送り主</th>
            <th>カテゴリ</th>
            <th>メモ</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {gifts.map(gift => (
            <tr key={gift.id} className={editingId === gift.id ? 'editing' : ''}>
              {editingId === gift.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleEditChange('name', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={editData.date}
                      onChange={(e) => handleEditChange('date', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.giver}
                      onChange={(e) => handleEditChange('giver', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.category}
                      onChange={(e) => handleEditChange('category', e.target.value)}
                    />
                  </td>
                  <td>
                    <textarea
                      value={editData.notes}
                      onChange={(e) => handleEditChange('notes', e.target.value)}
                      rows="2"
                    />
                  </td>
                  <td className="actions">
                    <button onClick={() => saveEdit(gift.id)} className="btn-save">保存</button>
                    <button onClick={cancelEdit} className="btn-cancel">キャンセル</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{gift.name}</td>
                  <td>{formatDate(gift.date)}</td>
                  <td>{gift.giver}</td>
                  <td>{gift.category || '-'}</td>
                  <td>{gift.notes || '-'}</td>
                  <td className="actions">
                    <button onClick={() => startEdit(gift)} className="btn-edit">編集</button>
                    <button onClick={() => onDelete(gift.id)} className="btn-delete">削除</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GiftList;
