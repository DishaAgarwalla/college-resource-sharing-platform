/**
 * Export data to CSV format
 * @param {Array} data - Array of objects to export
 * @param {string} filename - Name of the file (without extension)
 * @param {Array} headers - Optional custom headers
 */
export const exportToCSV = (data, filename = 'export', headers = null) => {
  if (!data || data.length === 0) {
    throw new Error('No data to export');
  }

  const headerKeys = headers || Object.keys(data[0]);
  const csvRows = [
    headerKeys.join(','),
    ...data.map(row => 
      headerKeys.map(key => {
        const value = row[key] || '';
        // Handle strings with commas
        if (typeof value === 'string' && (value.includes(',') || value.includes('"') || value.includes('\n'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(',')
    )
  ];

  const csvString = csvRows.join('\n');
  const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${filename}.csv`);
};

/**
 * Export data to JSON format
 */
export const exportToJSON = (data, filename = 'export') => {
  if (!data || data.length === 0) {
    throw new Error('No data to export');
  }

  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  downloadBlob(blob, `${filename}.json`);
};

/**
 * Export data to Excel (CSV with proper formatting)
 */
export const exportToExcel = (data, filename = 'export') => {
  // Excel can open CSV files, but we add proper formatting
  if (!data || data.length === 0) {
    throw new Error('No data to export');
  }

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join('\t'), // Use tab for Excel compatibility
    ...data.map(row => 
      headers.map(key => {
        const value = row[key] || '';
        return typeof value === 'string' ? value.replace(/\t/g, ' ') : value;
      }).join('\t')
    )
  ];

  const csvString = csvRows.join('\n');
  const blob = new Blob(['\uFEFF' + csvString], { 
    type: 'application/vnd.ms-excel;charset=utf-8' 
  });
  downloadBlob(blob, `${filename}.xls`);
};

/**
 * Download blob as file
 */
const downloadBlob = (blob, filename) => {
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Format data for export
 */
export const formatExportData = (data, fields) => {
  if (!data || !fields) return [];
  
  return data.map(item => {
    const formatted = {};
    fields.forEach(field => {
      formatted[field.label] = field.format ? field.format(item[field.key]) : item[field.key] || '';
    });
    return formatted;
  });
};

export default {
  exportToCSV,
  exportToJSON,
  exportToExcel,
  formatExportData
};