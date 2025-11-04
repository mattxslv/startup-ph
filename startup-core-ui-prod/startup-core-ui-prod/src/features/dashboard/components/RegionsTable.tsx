import useStartupByAddressList from '../hooks/useStartupByAddressList';

const RegionsTable = () => {
  const { data, isFetching } = useStartupByAddressList();
  
  const regions = data?.list || [];
  const total = data?.total || 0;
  
  console.log('🚀 RegionsTable - Data:', { regions, total, isFetching });
  
  return (
    <div className="flex flex-col h-full rounded-md border">
      <div className="px-4 py-2 flex flex-col gap-1 bg-blue-600 w-full text-white">
        <p className="font-bold text-sm">REGIONS</p>
        <small className="text-xs font-semibold uppercase">
          Total: {total} | Count: {regions.length} | Loading: {isFetching ? 'YES' : 'NO'}
        </small>
      </div>
      
      <div className="relative flex-1">
        <div className="flex flex-col absolute w-full h-full overflow-y-scroll divide-y">
          {isFetching ? (
            <p className="text-gray-400 text-center text-xs px-4 py-2">Loading regions...</p>
          ) : regions.length > 0 ? (
            regions.map((region: any, index: number) => (
              <div className="flex items-center text-xs px-4 py-2" key={index}>
                <p className="w-[70%]">{region.label || region.name || 'Unknown Region'}</p>
                <p className="w-[30%] text-right font-bold">{region.count || 0}</p>
              </div>
            ))
          ) : (
            <div className="px-4 py-2">
              <p className="text-red-500 text-xs font-bold">No regions found</p>
              <p className="text-gray-500 text-xs mt-1">Raw data:</p>
              <pre className="text-xs mt-1 bg-gray-100 p-2 rounded overflow-auto max-h-40">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center text-sm bg-blue-100 font-bold text-blue-800 px-4 py-2">
        <p className="w-[70%]">TOTAL STARTUPS</p>
        <p className="w-[30%] text-right">{total}</p>
      </div>
    </div>
  );
};

export default RegionsTable;
