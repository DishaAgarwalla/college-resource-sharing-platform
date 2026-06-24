import { useState } from 'react';
import './ExportButton.css';

const ExportButton = ({ data, filename, format = 'csv', onExport }) => {
  const [isExporting, setIsExporting] = useState(false);

  const exportCSV = (data, filename) => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header] || '';
          return typeof value === 'string' && value.includes(',') 
            ? `"${value}"` 
            : value;
        }).join(',')
      )
    ];

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${filename || 'export'}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportJSON = (data, filename) => {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${filename || 'export'}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    setIsExporting(true);
    try {
      if (format === 'csv') {
        exportCSV(data, filename);
      } else if (format === 'json') {
        exportJSON(data, filename);
      }
      
      if (onExport) onExport(format);
      
      setTimeout(() => {
        setIsExporting(false);
      }, 1000);
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export data');
      setIsExporting(false);
    }
  };

  return (
    <button 
      className={`export-btn ${isExporting ? 'exporting' : ''}`}
      onClick={handleExport}
      disabled={!data || data.length === 0 || isExporting}
    >
      <span className="export-icon">📊</span>
      <span className="export-label">
        {isExporting ? 'Exporting...' : 'Export'}
      </span>
    </button>
  );
};

export default ExportButton;