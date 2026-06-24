import { getFileIcon, getFileExtension } from '../utils/helpers';
import './FileIcon.css';

const FileIcon = ({ filename, size = 'medium', className = '' }) => {
  const extension = getFileExtension(filename);
  const icon = getFileIcon(filename);
  
  const getFileColor = (ext) => {
    const colors = {
      pdf: '#ef4444',
      doc: '#3b82f6',
      docx: '#3b82f6',
      xls: '#10b981',
      xlsx: '#10b981',
      ppt: '#f59e0b',
      pptx: '#f59e0b',
      jpg: '#8b5cf6',
      jpeg: '#8b5cf6',
      png: '#8b5cf6',
      gif: '#8b5cf6',
      svg: '#8b5cf6',
      mp4: '#ec4899',
      mp3: '#ec4899',
      zip: '#6b7280',
      rar: '#6b7280',
      txt: '#6b7280',
      js: '#f59e0b',
      jsx: '#f59e0b',
      ts: '#3b82f6',
      tsx: '#3b82f6',
      py: '#10b981',
      java: '#ef4444',
      html: '#f59e0b',
      css: '#3b82f6',
      json: '#6b7280',
      xml: '#6b7280',
      md: '#6b7280'
    };
    return colors[ext] || '#6b7280';
  };

  const sizeMap = {
    small: 'file-icon-small',
    medium: 'file-icon-medium',
    large: 'file-icon-large'
  };

  const getExtensionDisplay = () => {
    const maxLen = 5;
    return extension.length > maxLen ? extension.substring(0, maxLen) : extension;
  };

  return (
    <div 
      className={`file-icon ${sizeMap[size]} ${className}`}
      style={{ '--file-color': getFileColor(extension) }}
    >
      <span className="file-icon-emoji">{icon}</span>
      {extension && (
        <span className="file-icon-extension">{getExtensionDisplay()}</span>
      )}
    </div>
  );
};

export default FileIcon;