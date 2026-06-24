/**
 * Utility helper functions for the application
 */

/**
 * Format a date to a readable string
 * @param {string|Date} date - The date to format
 * @param {string} format - The format to use (default: 'short')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return 'N/A';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid Date';
  
  const options = {
    short: { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    },
    long: { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    },
    time: {
      hour: '2-digit',
      minute: '2-digit'
    }
  };
  
  return d.toLocaleDateString('en-US', options[format] || options.short);
};

/**
 * Truncate text to a specified length
 * @param {string} text - The text to truncate
 * @param {number} length - Maximum length (default: 100)
 * @param {string} suffix - Suffix to add (default: '...')
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 100, suffix = '...') => {
  if (!text) return '';
  if (text.length <= length) return text;
  return text.substring(0, length) + suffix;
};

/**
 * Capitalize the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Get initials from a name
 * @param {string} name - The full name
 * @param {number} count - Number of initials to return (default: 2)
 * @returns {string} Initials
 */
export const getInitials = (name, count = 2) => {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return parts
    .slice(0, count)
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase();
};

/**
 * Generate a random color based on a string
 * @param {string} str - The string to generate color from
 * @returns {string} Hex color code
 */
export const stringToColor = (str) => {
  if (!str) return '#6366f1';
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

/**
 * Debounce a function call
 * @param {Function} func - The function to debounce
 * @param {number} wait - Wait time in milliseconds (default: 300)
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param {*} value - The value to check
 * @returns {boolean} True if empty, false otherwise
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * Format file size to human readable format
 * @param {number} bytes - File size in bytes
 * @param {number} decimals - Number of decimal places (default: 2)
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Get file extension from filename
 * @param {string} filename - The filename
 * @returns {string} File extension
 */
export const getFileExtension = (filename) => {
  if (!filename) return '';
  return filename.split('.').pop()?.toLowerCase() || '';
};

/**
 * Get file icon based on file type
 * @param {string} filename - The filename
 * @returns {string} Emoji icon
 */
export const getFileIcon = (filename) => {
  const ext = getFileExtension(filename);
  const icons = {
    pdf: '📄',
    doc: '📝',
    docx: '📝',
    xls: '📊',
    xlsx: '📊',
    ppt: '📽️',
    pptx: '📽️',
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
    gif: '🖼️',
    svg: '🖼️',
    mp4: '🎬',
    mp3: '🎵',
    zip: '📦',
    rar: '📦',
    txt: '📃',
    js: '🟨',
    jsx: '🟨',
    ts: '🟦',
    tsx: '🟦',
    py: '🐍',
    java: '☕',
    html: '🌐',
    css: '🎨',
    json: '📋',
    xml: '📋',
    md: '📝',
    default: '📎'
  };
  return icons[ext] || icons.default;
};

/**
 * Get status color for badges
 * @param {string} status - The status string
 * @returns {string} CSS class name for the badge
 */
export const getStatusBadgeClass = (status) => {
  const statusMap = {
    'approved': 'badge-success',
    'pending': 'badge-warning',
    'rejected': 'badge-danger',
    'active': 'badge-success',
    'inactive': 'badge-danger',
    'completed': 'badge-success',
    'in-progress': 'badge-warning',
    'cancelled': 'badge-danger'
  };
  return statusMap[status?.toLowerCase()] || 'badge-info';
};

/**
 * Get status emoji icon
 * @param {string} status - The status string
 * @returns {string} Emoji icon
 */
export const getStatusIcon = (status) => {
  const icons = {
    'approved': '✅',
    'pending': '⏳',
    'rejected': '❌',
    'active': '🟢',
    'inactive': '🔴'
  };
  return icons[status?.toLowerCase()] || 'ℹ️';
};

/**
 * Generate a random ID
 * @param {number} length - Length of the ID (default: 8)
 * @returns {string} Random ID
 */
export const generateId = (length = 8) => {
  return Math.random().toString(36).substring(2, 2 + length);
};

/**
 * Scroll to the top of the page smoothly
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

/**
 * Copy text to clipboard
 * @param {string} text - The text to copy
 * @returns {Promise} Promise that resolves when copied
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
};

/**
 * Detect if the user is on a mobile device
 * @returns {boolean} True if mobile, false otherwise
 */
export const isMobile = () => {
  return window.innerWidth <= 768;
};

/**
 * Get the current time in a readable format
 * @param {Date} date - The date to format (default: now)
 * @returns {string} Formatted time
 */
export const getTimeAgo = (date) => {
  const now = new Date();
  const diff = now - new Date(date);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  const weeks = Math.floor(diff / 604800000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return minutes + 'm ago';
  if (hours < 24) return hours + 'h ago';
  if (days < 7) return days + 'd ago';
  if (weeks < 4) return weeks + 'w ago';
  return formatDate(date);
};

/**
 * Group array by key
 * @param {Array} array - The array to group
 * @param {string} key - The key to group by
 * @returns {Object} Grouped object
 */
export const groupBy = (array, key) => {
  if (!array || !key) return {};
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

/**
 * Check if a string is a valid email
 * @param {string} email - The email to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Check if a string is a valid URL
 * @param {string} url - The URL to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Get file extension from content type
 * @param {string} contentType - MIME type
 * @returns {string} File extension
 */
export const getExtensionFromContentType = (contentType) => {
  const types = {
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'video/mp4': 'mp4',
    'video/webm': 'webm',
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'application/zip': 'zip',
    'application/x-rar-compressed': 'rar',
    'text/plain': 'txt',
    'text/html': 'html',
    'text/css': 'css',
    'application/javascript': 'js',
    'application/json': 'json',
    'application/xml': 'xml',
    'application/octet-stream': 'bin'
  };
  return types[contentType] || 'file';
};

/**
 * Download a file from URL
 * @param {string} url - The file URL
 * @param {string} filename - Optional custom filename
 * @param {Function} onProgress - Optional progress callback
 * @returns {Promise} Promise that resolves when download starts
 */
export const downloadFile = async (url, filename = '', onProgress = null) => {
  try {
    // If it's a local URL (starts with /), prepend the base URL
    let fullUrl = url;
    if (url.startsWith('/')) {
      fullUrl = `http://localhost:8080${url}`;
    }
    
    // Fetch the file
    const response = await fetch(fullUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Get the blob from response
    const blob = await response.blob();
    
    // Get content type
    const contentType = response.headers.get('content-type') || blob.type;
    const extension = getExtensionFromContentType(contentType) || getFileExtension(filename || url);
    
    // Create download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    
    // Set filename
    if (filename) {
      if (!filename.includes('.')) {
        link.download = `${filename}.${extension}`;
      } else {
        link.download = filename;
      }
    } else {
      const urlFilename = url.split('/').pop() || `download.${extension}`;
      link.download = urlFilename;
    }
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the object URL
    setTimeout(() => {
      URL.revokeObjectURL(link.href);
    }, 100);
    
    return true;
  } catch (error) {
    console.error('Download failed:', error);
    throw error;
  }
};

// ===== DOWNLOAD TRACKING FUNCTIONS =====

/**
 * Track download count locally using localStorage
 * @param {number} resourceId - The ID of the resource
 * @returns {number} Total downloads for this resource
 */
export const getLocalDownloadCount = (resourceId) => {
  try {
    const downloads = JSON.parse(localStorage.getItem('resource_downloads') || '{}');
    return downloads[resourceId] || 0;
  } catch {
    return 0;
  }
};

/**
 * Increment download count for a resource
 * @param {number} resourceId - The ID of the resource
 * @returns {number} New download count
 */
export const incrementDownloadCount = (resourceId) => {
  try {
    const downloads = JSON.parse(localStorage.getItem('resource_downloads') || '{}');
    downloads[resourceId] = (downloads[resourceId] || 0) + 1;
    localStorage.setItem('resource_downloads', JSON.stringify(downloads));
    return downloads[resourceId];
  } catch {
    return 0;
  }
};

/**
 * Get all download counts from localStorage
 * @returns {Object} Object with resourceId as keys and download counts as values
 */
export const getAllDownloadCounts = () => {
  try {
    return JSON.parse(localStorage.getItem('resource_downloads') || '{}');
  } catch {
    return {};
  }
};

/**
 * Clear all download counts (for testing)
 */
export const clearDownloadCounts = () => {
  localStorage.removeItem('resource_downloads');
};

export default {
  formatDate,
  truncateText,
  capitalize,
  getInitials,
  stringToColor,
  debounce,
  isEmpty,
  formatFileSize,
  getFileExtension,
  getFileIcon,
  getStatusBadgeClass,
  getStatusIcon,
  generateId,
  scrollToTop,
  copyToClipboard,
  isMobile,
  getTimeAgo,
  groupBy,
  isValidEmail,
  isValidUrl,
  getExtensionFromContentType,
  downloadFile,
  getLocalDownloadCount,
  incrementDownloadCount,
  getAllDownloadCounts,
  clearDownloadCounts
};