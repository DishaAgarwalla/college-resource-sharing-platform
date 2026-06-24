import { useState } from 'react';
import { copyToClipboard } from '../utils/helpers';
import './ShareButtons.css';

const ShareButtons = ({ title, url, onShare }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      if (onShare) onShare('copy');
    }
  };

  const handleShare = (platform) => {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    };

    if (platform === 'copy') {
      handleCopy();
      return;
    }

    const shareUrl = shareUrls[platform];
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      if (onShare) onShare(platform);
    }
  };

  const shareButtons = [
    { id: 'twitter', icon: '🐦', label: 'Twitter', color: '#1DA1F2' },
    { id: 'linkedin', icon: '💼', label: 'LinkedIn', color: '#0A66C2' },
    { id: 'facebook', icon: '📘', label: 'Facebook', color: '#1877F2' },
    { id: 'whatsapp', icon: '💬', label: 'WhatsApp', color: '#25D366' },
    { id: 'email', icon: '📧', label: 'Email', color: '#6B7280' },
    { id: 'copy', icon: '📋', label: copied ? 'Copied!' : 'Copy Link', color: '#4F46E5' },
  ];

  return (
    <div className="share-buttons">
      <span className="share-label">Share:</span>
      <div className="share-buttons-grid">
        {shareButtons.map((btn) => (
          <button
            key={btn.id}
            className={`share-btn ${btn.id === 'copy' && copied ? 'copied' : ''}`}
            onClick={() => handleShare(btn.id)}
            title={btn.label}
          >
            <span className="share-btn-icon">{btn.icon}</span>
            <span className="share-btn-label">{btn.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShareButtons;