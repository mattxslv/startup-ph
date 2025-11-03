import { ws } from 'lib';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transformStartupByAddress } from '../transformers';
import removeEmptyValues from 'utils/removeEmptyValues';
import { useEffect } from 'react';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<TStartupByAddress>(
      {
        url: `/api/v2/administrator/dashboard/startup_by_regions`,
        params: removeEmptyValues(params),
        transform: ({ data }) =>
          transformStartupByAddress(data?.statistics || {}),
      },
      { signal }
    );

const useStartupByAddressList = (params?: any) => {
  const query = useQuery({
    queryKey: [`STATISTICS_REGIONS`, JSON.stringify(params)],
    queryFn: fetchList(params),
  });

  useEffect(() => {
    query.refetch();
  }, [JSON.stringify(params)]);

  return query;
};

export default useStartupByAddressList;
