import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transformStartupApplications } from '../transformers';
import { ws } from 'lib';
import { TStartupApplications } from '../startup';
import { IPagination } from 'types';

const fetch =
  (id: string) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: TStartupApplications[]; pager?: IPagination }>(
      {
        url: `/api/v2/administrator/startups/${id}/applications`,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transformStartupApplications),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useStartupApplications = (id: string) => {
  return useQuery({
    queryKey: ['STARTUP/applications', id],
    queryFn: fetch(id),
  });
};

export default useStartupApplications;
