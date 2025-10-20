import { ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transform } from '../transformers';

const fetchList =
  (type: string, params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: TAddress[]; pager?: IPagination }>(
      {
        url: `/api/v2/common/${type}`,
        params,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transform),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useAddressList = (type: string, params?: any) => {
  const query = useQuery({
    queryKey: ['ADDRESS', type, params],
    queryFn: fetchList(type, params),
    // enabled: checkIsEnabled(),
  });

  // useEffect(() => {
  //   query.refetch();
  // }, [JSON.stringify(params)]);

  return query;
};

export default useAddressList;
