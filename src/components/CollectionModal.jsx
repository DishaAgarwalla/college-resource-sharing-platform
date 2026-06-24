import { useState } from 'react';
import './CollectionModal.css';

const CollectionModal = ({ isOpen, onClose, onSave, initialData = null }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [color, setColor] = useState(initialData?.color || '#4f46e5');
  const [isPublic, setIsPublic] = useState(initialData?.isPublic || false);
  const [error, setError] = useState('');

  const colors = [
    '#4f46e5', '#7c3aed', '#2563eb', '#06b6d4', '#10b981', 
    '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#14b8a6'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError('Collection name is required');
      return;
    }

    onSave({
      name: name.trim(),
      description: description.trim(),
      color,
      isPublic,
      id: initialData?.id || Date.now()
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="collection-modal-overlay" onClick={onClose}>
      <div className="collection-modal" onClick={(e) => e.stopPropagation()}>
        <div className="collection-modal-header">
          <h3>{initialData ? '✏️ Edit Collection' : '📁 Create Collection'}</h3>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Collection Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., My Favorite Resources"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description (Optional)</label>
            <textarea
              className="form-input"
              placeholder="What is this collection about?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Color</label>
            <div className="color-picker">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`color-option ${color === c ? 'selected' : ''}`}
                  style={{ background: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label visibility-label">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
              />
              Make collection public
            </label>
            <span className="visibility-hint">
              {isPublic ? 'Anyone can view this collection' : 'Only you can view this collection'}
            </span>
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {initialData ? '💾 Update' : '📁 Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectionModal;