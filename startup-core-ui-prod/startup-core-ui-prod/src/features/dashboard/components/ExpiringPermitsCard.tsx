import React from 'react';
import { useExpiringPermits } from '../hooks/useExpiringPermits';

export const ExpiringPermitsCard: React.FC = () => {
  const { data, isLoading, error } = useExpiringPermits({ 
    days_ahead: 30, 
    status: 'all', 
    per_page: 10 
  });

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Permit Expiration Tracking</h2>
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    console.error('ExpiringPermitsCard error:', error);
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Permit Expiration Tracking</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-700 text-sm">No expiring permits data available</p>
        </div>
      </div>
    );
  }

  // Safety check for data structure
  if (!data.statistics || !data.startups) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Permit Expiration Tracking</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-gray-700 text-sm">Data structure invalid</p>
        </div>
      </div>
    );
  }

  const { statistics, startups } = data;
  const hasExpiringOrExpired = statistics.expired_count > 0 || statistics.expiring_30_days > 0;

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Permit Expiration Tracking</h2>
      
      <div className="space-y-4">
        {/* Statistics Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
            <div className="text-red-600 text-3xl font-bold">{statistics.expired_count || 0}</div>
            <div className="text-red-700 text-sm font-medium opacity-80">Expired</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
            <div className="text-orange-600 text-3xl font-bold">{statistics.expiring_7_days || 0}</div>
            <div className="text-orange-700 text-sm font-medium opacity-80">In 7 Days</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
            <div className="text-yellow-600 text-3xl font-bold">{statistics.expiring_15_days || 0}</div>
            <div className="text-yellow-700 text-sm font-medium opacity-80">In 15 Days</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <div className="text-blue-600 text-3xl font-bold">{statistics.expiring_30_days || 0}</div>
            <div className="text-blue-700 text-sm font-medium opacity-80">In 30 Days</div>
          </div>
        </div>

        {/* Alert for urgent cases */}
        {hasExpiringOrExpired && (
          <div className={`p-4 rounded-lg border-2 ${
            statistics.expired_count > 0 
              ? 'bg-red-50 border-red-300' 
              : 'bg-yellow-50 border-yellow-300'
          }`}>
            <p className={`text-sm font-medium ${
              statistics.expired_count > 0 ? 'text-red-800' : 'text-yellow-800'
            }`}>
              ⚠️ {statistics.expired_count > 0
                ? `${statistics.expired_count} startup(s) have expired permits that need renewal.`
                : `${statistics.expiring_7_days} startup(s) will have their permits expire within 7 days.`}
            </p>
          </div>
        )}

        {/* Recent Expiring Startups List */}
        {startups?.data && startups.data.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-gray-700">Recent Expiring Permits</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {startups.data.map((startup: any) => {
                try {
                  const expiryDate = new Date(startup.business_certificate_expiration_date);
                  const daysUntilExpiry = Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  const isExpired = daysUntilExpiry < 0;
                  
                  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                  const formattedDate = `${months[expiryDate.getMonth()]} ${expiryDate.getDate()}, ${expiryDate.getFullYear()}`;

                  return (
                    <div
                      key={startup.id}
                      className={`p-3 rounded-lg border-2 ${
                        isExpired
                          ? 'bg-red-50 border-red-200'
                          : daysUntilExpiry <= 7
                          ? 'bg-orange-50 border-orange-200'
                          : 'bg-yellow-50 border-yellow-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{startup.name}</div>
                          <div className="text-xs text-gray-600 mt-1">
                            {startup.business_name || 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Expires: {formattedDate}
                          </div>
                        </div>
                        <div className="text-right">
                          <div
                            className={`text-xs font-bold ${
                              isExpired
                                ? 'text-red-600'
                                : daysUntilExpiry <= 7
                                ? 'text-orange-600'
                                : 'text-yellow-600'
                            }`}
                          >
                            {isExpired ? 'EXPIRED' : `${daysUntilExpiry} days`}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                } catch (err) {
                  console.error('Error rendering startup:', startup, err);
                  return null;
                }
              })}
            </div>
            {startups.total > startups.per_page && (
              <div className="text-center text-sm text-gray-500 mt-2">
                Showing {startups.data.length} of {startups.total} startups
              </div>
            )}
          </div>
        )}

        {(!startups?.data || startups.data.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No expiring or expired permits in the next 30 days</p>
          </div>
        )}
      </div>
    </div>
  );
};

  const { statistics, startups } = data;
  const hasExpiringOrExpired = statistics.expired_count > 0 || statistics.expiring_30_days > 0;

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">Permit Expiration Tracking</h2>
      
      <div className="space-y-4">
        {/* Statistics Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200">
            <div className="text-red-600 text-3xl font-bold">{statistics.expired_count}</div>
            <div className="text-red-700 text-sm font-medium opacity-80">Expired</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
            <div className="text-orange-600 text-3xl font-bold">{statistics.expiring_7_days}</div>
            <div className="text-orange-700 text-sm font-medium opacity-80">In 7 Days</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
            <div className="text-yellow-600 text-3xl font-bold">{statistics.expiring_15_days}</div>
            <div className="text-yellow-700 text-sm font-medium opacity-80">In 15 Days</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <div className="text-blue-600 text-3xl font-bold">{statistics.expiring_30_days}</div>
            <div className="text-blue-700 text-sm font-medium opacity-80">In 30 Days</div>
          </div>
        </div>

        {/* Alert for urgent cases */}
        {hasExpiringOrExpired && (
          <div className={`p-4 rounded-lg border-2 ${
            statistics.expired_count > 0 
              ? 'bg-red-50 border-red-300' 
              : 'bg-yellow-50 border-yellow-300'
          }`}>
            <p className={`text-sm font-medium ${
              statistics.expired_count > 0 ? 'text-red-800' : 'text-yellow-800'
            }`}>
              ⚠️ {statistics.expired_count > 0
                ? `${statistics.expired_count} startup(s) have expired permits that need renewal.`
                : `${statistics.expiring_7_days} startup(s) will have their permits expire within 7 days.`}
            </p>
          </div>
        )}

        {/* Recent Expiring Startups List */}
        {startups.data.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-gray-700">Recent Expiring Permits</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {startups.data.map((startup: any) => {
                const expiryDate = new Date(startup.business_certificate_expiration_date);
                const daysUntilExpiry = Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                const isExpired = daysUntilExpiry < 0;

                return (
                  <div
                    key={startup.id}
                    className={`p-3 rounded-lg border-2 ${
                      isExpired
                        ? 'bg-red-50 border-red-200'
                        : daysUntilExpiry <= 7
                        ? 'bg-orange-50 border-orange-200'
                        : 'bg-yellow-50 border-yellow-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{startup.name}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          {startup.business_name || 'N/A'}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Expires: {format(expiryDate, 'MMM dd, yyyy')}
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-xs font-bold ${
                            isExpired
                              ? 'text-red-600'
                              : daysUntilExpiry <= 7
                              ? 'text-orange-600'
                              : 'text-yellow-600'
                          }`}
                        >
                          {isExpired ? 'EXPIRED' : `${daysUntilExpiry} days`}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {startups.total > startups.per_page && (
              <div className="text-center text-sm text-gray-500 mt-2">
                Showing {startups.data.length} of {startups.total} startups
              </div>
            )}
          </div>
        )}

        {startups.data.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-sm">No expiring or expired permits in the next 30 days</p>
          </div>
        )}
      </div>
    </div>
  );
};
