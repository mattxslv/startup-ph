import { useState } from 'react';
import { Button } from 'ui/components';
import { HiDownload, HiDocumentText } from 'react-icons/hi';
import storage from 'utils/storage';

interface ExportButtonsProps {
  className?: string;
}

export const ExportButtons = ({ className = '' }: ExportButtonsProps) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportStartupsCSV = async () => {
    setIsExporting(true);
    try {
      // Get the auth token from storage
      const session = storage.get('session', null);
      const token = session?.token;

      if (!token) {
        alert('You must be logged in to export data.');
        return;
      }

      const baseURL = import.meta.env.VITE_WS_ENDPOINT || '';
      const response = await fetch(`${baseURL}/api/v2/administrator/export/startups/csv`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'text/csv',
        },
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `startups_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportStatisticsCSV = async () => {
    setIsExporting(true);
    try {
      // Get the auth token from storage
      const session = storage.get('session', null);
      const token = session?.token;

      if (!token) {
        alert('You must be logged in to export data.');
        return;
      }

      const baseURL = import.meta.env.VITE_WS_ENDPOINT || '';
      const response = await fetch(`${baseURL}/api/v2/administrator/export/statistics/csv`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'text/csv',
        },
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `statistics_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export statistics. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      <Button
        size="sm"
        variant="outline"
        onClick={handleExportStartupsCSV}
        disabled={isExporting}
        leadingIcon={<HiDownload />}
      >
        Export Startups (CSV)
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={handleExportStatisticsCSV}
        disabled={isExporting}
        leadingIcon={<HiDocumentText />}
      >
        Export Statistics (CSV)
      </Button>
    </div>
  );
};
