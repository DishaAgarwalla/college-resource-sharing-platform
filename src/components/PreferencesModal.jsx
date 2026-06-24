import { useState } from 'react';
import { usePreferences } from '../context/PreferencesContext';
import './PreferencesModal.css';

const PreferencesModal = ({ isOpen, onClose }) => {
  const { preferences, updatePreference, resetPreferences } = usePreferences();
  const [localPrefs, setLocalPrefs] = useState(preferences);

  if (!isOpen) return null;

  const handleChange = (key, value) => {
    setLocalPrefs(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    Object.keys(localPrefs).forEach(key => {
      if (localPrefs[key] !== preferences[key]) {
        updatePreference(key, localPrefs[key]);
      }
    });
    onClose();
  };

  const handleReset = () => {
    if (confirm('Reset all preferences to default?')) {
      resetPreferences();
      setLocalPrefs({ ...preferences, ...resetPreferences() });
    }
  };

  const sections = [
    {
      title: 'Appearance',
      icon: '🎨',
      fields: [
        { key: 'theme', label: 'Theme', type: 'select', options: ['light', 'dark', 'system'] },
        { key: 'compactMode', label: 'Compact Mode', type: 'checkbox' },
      ]
    },
    {
      title: 'Content',
      icon: '📚',
      fields: [
        { key: 'viewMode', label: 'Default View', type: 'select', options: ['grid', 'list'] },
        { key: 'itemsPerPage', label: 'Items Per Page', type: 'select', options: [6, 12, 24, 48] },
        { key: 'defaultSort', label: 'Default Sort', type: 'select', options: ['newest', 'downloads', 'ratings'] },
      ]
    },
    {
      title: 'Search',
      icon: '🔍',
      fields: [
        { key: 'showSearchHistory', label: 'Show Search History', type: 'checkbox' },
        { key: 'autoSaveSearch', label: 'Auto-save Search', type: 'checkbox' },
      ]
    },
    {
      title: 'Notifications',
      icon: '🔔',
      fields: [
        { key: 'emailNotifications', label: 'Email Notifications', type: 'checkbox' },
        { key: 'resourceNotifications', label: 'Resource Updates', type: 'checkbox' },
        { key: 'soundEnabled', label: 'Sound Alerts', type: 'checkbox' },
      ]
    }
  ];

  return (
    <div className="preferences-modal-overlay" onClick={onClose}>
      <div className="preferences-modal" onClick={(e) => e.stopPropagation()}>
        <div className="preferences-modal-header">
          <h3>⚙️ Preferences</h3>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="preferences-body">
          {sections.map((section) => (
            <div key={section.title} className="preference-section">
              <div className="section-title">
                <span>{section.icon}</span>
                <h4>{section.title}</h4>
              </div>
              <div className="preference-fields">
                {section.fields.map((field) => (
                  <div key={field.key} className="preference-field">
                    <label className="preference-label">{field.label}</label>
                    {field.type === 'checkbox' ? (
                      <input
                        type="checkbox"
                        checked={localPrefs[field.key]}
                        onChange={(e) => handleChange(field.key, e.target.checked)}
                      />
                    ) : field.type === 'select' ? (
                      <select
                        className="form-select"
                        value={localPrefs[field.key]}
                        onChange={(e) => handleChange(field.key, e.target.value)}
                      >
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>
                            {typeof opt === 'string' ? opt.charAt(0).toUpperCase() + opt.slice(1) : opt}
                          </option>
                        ))}
                      </select>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="preferences-actions">
          <button className="btn btn-secondary" onClick={handleReset}>
            ↩️ Reset Defaults
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            💾 Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesModal;