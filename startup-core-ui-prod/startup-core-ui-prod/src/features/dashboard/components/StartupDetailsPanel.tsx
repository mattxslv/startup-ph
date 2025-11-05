import { useFormContext } from 'ui/forms';
import useStartupByAddressList from '../hooks/useStartupByAddressList';
import { HiOfficeBuilding, HiLocationMarker, HiCalendar, HiUser, HiTag } from 'react-icons/hi';

const StartupDetailsPanel = () => {
  const { values } = useFormContext();
  const { data, isFetching } = useStartupByAddressList({
    ...(values?.region_code && { region_code: values.region_code }),
    ...(values?.province_code && { province_code: values.province_code }),
    ...(values?.municipality_code && { municipality_code: values.municipality_code }),
  });
  
  const regions = data?.list || [];
  const total = data?.total || 0;
  const startups = (data as any)?.startups || [];
  const hasFilter = !!(values?.region_code || values?.province_code || values?.municipality_code);
  
  // Determine the header text based on filter level
  const getHeaderText = () => {
    if (values?.municipality_code) return 'STARTUPS IN SELECTED CITY/MUNICIPALITY';
    if (values?.province_code) return 'STARTUPS IN SELECTED PROVINCE';
    if (values?.region_code) return 'STARTUPS IN SELECTED REGION';
    return 'REGIONS';
  };

  const getSubHeaderText = () => {
    if (hasFilter) {
      return `Showing ${startups.length} startup${startups.length !== 1 ? 's' : ''}`;
    }
    return `Total: ${total} | Regions: ${regions.length}`;
  };
  
  return (
    <div className="flex flex-col h-full rounded-lg border border-gray-200 shadow-lg overflow-hidden bg-white">
      <div className="px-4 py-3 flex flex-col gap-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <p className="font-bold text-base">
          {getHeaderText()}
        </p>
        <small className="text-xs font-medium">
          {getSubHeaderText()}
        </small>
      </div>
      
      <div className="relative flex-1">
        <div className="flex flex-col absolute w-full h-full overflow-y-auto">
          {isFetching ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-2"></div>
                <p className="text-gray-500 text-sm">Loading...</p>
              </div>
            </div>
          ) : hasFilter && startups.length > 0 ? (
            // Display startup details when region is selected
            <div className="divide-y divide-gray-100">
              {startups.map((startup: any, index: number) => (
                <div 
                  key={index} 
                  className="p-4 hover:bg-blue-50 transition-colors duration-200"
                >
                  <div className="flex items-start gap-3">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                      {startup.logo_url ? (
                        <img
                          src={startup.logo_url}
                          alt={startup.name}
                          className="w-14 h-14 rounded-lg object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center border border-gray-200">
                          <HiOfficeBuilding className="w-7 h-7 text-blue-600" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Name and Status */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-sm text-gray-900 line-clamp-2">
                          {startup.name}
                        </h3>
                        {startup.status && (
                          <span className={`
                            flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium
                            ${startup.status === 'VERIFIED' 
                              ? 'bg-green-100 text-green-700 border border-green-200' 
                              : startup.status === 'FOR VERIFICATION'
                              ? 'bg-yellow-100 text-yellow-700 border border-yellow-200'
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                            }
                          `}>
                            {startup.status}
                          </span>
                        )}
                      </div>

                      {/* ID */}
                      {startup.startup_number && (
                        <p className="text-xs text-blue-600 font-medium mb-2">
                          ID: {startup.startup_number}
                        </p>
                      )}

                      {/* Sectors */}
                      {startup.sectors && startup.sectors.length > 0 && (
                        <div className="flex items-center gap-1 mb-2 flex-wrap">
                          <HiTag className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          <div className="flex flex-wrap gap-1">
                            {startup.sectors.slice(0, 2).map((sector: string, idx: number) => (
                              <span 
                                key={idx}
                                className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-medium"
                              >
                                {sector}
                              </span>
                            ))}
                            {startup.sectors.length > 2 && (
                              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">
                                +{startup.sectors.length - 2}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Location */}
                      <div className="flex items-start gap-1.5 mb-1.5">
                        <HiLocationMarker className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-gray-600 line-clamp-1">
                          {[startup.municipality_name, startup.province_name, startup.region_name]
                            .filter(Boolean)
                            .join(', ')}
                        </p>
                      </div>

                      {/* Founder */}
                      {startup.founder_name && (
                        <div className="flex items-center gap-1.5 mb-1.5">
                          <HiUser className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">Founder:</span> {startup.founder_name}
                          </p>
                        </div>
                      )}

                      {/* Founding Year */}
                      {startup.founding_year && (
                        <div className="flex items-center gap-1.5">
                          <HiCalendar className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                          <p className="text-xs text-gray-600">
                            <span className="font-medium">Founded:</span> {startup.founding_year}
                          </p>
                        </div>
                      )}

                      {/* Development Phase & Business Classification */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {startup.development_phase && (
                          <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-200 font-medium">
                            {startup.development_phase}
                          </span>
                        )}
                        {startup.business_classification && (
                          <span className="text-xs px-2 py-0.5 bg-teal-50 text-teal-700 rounded border border-teal-200 font-medium">
                            {startup.business_classification}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : hasFilter && startups.length === 0 ? (
            <div className="flex items-center justify-center h-full p-4">
              <div className="text-center">
                <HiOfficeBuilding className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No startups found</p>
                <p className="text-gray-400 text-sm mt-1">Try selecting a different region</p>
              </div>
            </div>
          ) : (
            // Display regions list when no region is selected
            <div className="divide-y divide-gray-100">
              {regions.map((region: any, index: number) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <p className="text-sm text-gray-700 font-medium">
                    {region.label || region.name || 'Unknown Region'}
                  </p>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {region.count || 0}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm bg-gradient-to-r from-blue-50 to-blue-100 font-bold text-blue-800 px-4 py-3 border-t border-blue-200">
        <p>TOTAL STARTUPS</p>
        <p className="text-lg">{hasFilter ? startups.length : total}</p>
      </div>
    </div>
  );
};

export default StartupDetailsPanel;
