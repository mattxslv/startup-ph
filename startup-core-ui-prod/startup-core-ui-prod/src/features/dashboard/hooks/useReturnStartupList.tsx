import { ws } from 'lib';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: TList[]; total: number }>(
      {
        url: `/api/v2/administrator/dashboard/startup_by_assessment_tags`,
        params,
        transform: ({ data }) => ({
          list: data?.statistics?.by_assessment_tags ?? [],
          total: data?.statistics?.total ?? 0,
        }),
      },
      { signal }
    );

const useReturnStartupList = (params?: any) => {
  const query = useQuery({
    queryKey: ['STARTUP_RETURN_COUNTS/list', JSON.stringify(params)],
    queryFn: fetchList(params),
  });

  return query;
};

export default useReturnStartupList;
