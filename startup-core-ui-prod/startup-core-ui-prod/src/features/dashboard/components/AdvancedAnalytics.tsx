import { useState, useEffect, useCallback } from 'react';
import { Card, Button } from 'ui/components';
import { Form, useFormContext } from 'ui/forms';
import { InputDatasetCommonOptions } from 'features/cms-dataset';
import useComprehensiveStatistics from '../hooks/useComprehensiveStatistics';
import { HiChartBar, HiLocationMarker, HiTrendingUp } from 'react-icons/hi';

interface SectorFilterFormProps {
  onFilterChange: (sector: string) => void;
}

const SectorFilterForm = ({ onFilterChange }: SectorFilterFormProps) => {
  const { values, setFieldValue } = useFormContext();

  // Watch for changes in the sector field and trigger the filter
  useEffect(() => {
    onFilterChange(values?.sector || '');
  }, [values?.sector]); // Remove onFilterChange from dependencies

  const handleClearFilter = () => {
    setFieldValue('sector', '');
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 items-end">
        <div className="flex-1">
          <InputDatasetCommonOptions
            code="sector"
            name="sector"
            placeholder="Filter by Sector (All Sectors)"
          />
        </div>
        <Button
          type="button"
          variant="neutralPrimary"
          size="sm"
          onClick={handleClearFilter}
        >
          Clear Filter
        </Button>
      </div>

      {/* Active Filter Badge */}
      {values?.sector && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HiTrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-semibold text-blue-900">
              Filtered by Sector: {values.sector}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

const AdvancedAnalytics = () => {
  const [filter, setFilter] = useState({ sector: '' });
  
  const handleFilterChange = useCallback((sector: string) => {
    console.log('🔍 Filter changed to:', sector);
    setFilter({ sector });
  }, []); // Empty deps - stable function
  
  // Only pass filter if sector is not empty
  const apiFilter = filter.sector ? { sector: filter.sector } : {};
  console.log('📡 API Filter:', apiFilter);
  
  const { data, isLoading } = useComprehensiveStatistics(apiFilter);
  
  console.log('📊 Data received:', data);

  const topCities = data?.by_city || [];
  const topRegions = data?.by_region || [];
  const topSectors = data?.by_sector || [];

  return (
    <Card>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <HiChartBar className="w-6 h-6 text-primary" />
              Advanced Analytics
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Detailed breakdown of startup distribution by sector, region, and city
            </p>
          </div>
        </div>

        {/* Sector Filter - Using Form with useEffect to watch changes */}
        <Form 
          initialValues={{ sector: '' }} 
          onSubmit={() => {}}
        >
          <SectorFilterForm onFilterChange={handleFilterChange} />
        </Form>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Loading analytics...</p>
          </div>
        )}

        {/* Analytics Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Top Cities */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <HiLocationMarker className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-blue-900">
                  Top 5 Cities {filter.sector && `(${filter.sector})`}
                </h3>
              </div>
              <div className="space-y-2">
                {topCities.length > 0 ? (
                  topCities.slice(0, 5).map((city, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 bg-white rounded p-2 shadow-sm"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-6 h-6 flex-shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-900 text-xs truncate">
                          {city.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="font-bold text-blue-600 text-sm">
                          {city.count}
                        </span>
                        <span className="text-xs text-gray-500">startups</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-xs text-center py-2">
                    No data available
                  </p>
                )}
              </div>
            </div>

            {/* Top Regions */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <HiLocationMarker className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-blue-900">
                  Top 5 Regions {filter.sector && `(${filter.sector})`}
                </h3>
              </div>
              <div className="space-y-2">
                {topRegions.length > 0 ? (
                  topRegions.slice(0, 5).map((region, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 bg-white rounded p-2 shadow-sm"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-6 h-6 flex-shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-900 text-xs truncate" title={region.label}>
                          {region.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="font-bold text-blue-600 text-sm">
                          {region.count}
                        </span>
                        <span className="text-xs text-gray-500">startups</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-xs text-center py-2">
                    No data available
                  </p>
                )}
              </div>
            </div>

            {/* Top Sectors */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <HiChartBar className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-sm text-blue-900">Top 5 Sectors</h3>
              </div>
              <div className="space-y-2">
                {topSectors.length > 0 ? (
                  topSectors.slice(0, 5).map((sector, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 bg-white rounded p-2 shadow-sm"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <div className="w-6 h-6 flex-shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                          {index + 1}
                        </div>
                        <span className="font-medium text-gray-900 text-xs truncate">
                          {sector.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <span className="font-bold text-blue-600 text-sm">
                          {sector.count}
                        </span>
                        <span className="text-xs text-gray-500">startups</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-xs text-center py-2">
                    No data available
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AdvancedAnalytics;
