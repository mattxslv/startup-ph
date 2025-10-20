import { queryClient, ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transformApplication } from '../transformers';
import { IApplication } from '../types';
import { useEffect } from 'react';

export function refreshProgramApplications(programId: string) {
  queryClient.invalidateQueries(['PROGRAM', programId, 'applications']);
}

const fetchList =
  (programId: string, params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: IApplication[]; pager?: IPagination }>(
      {
        url: `/api/v2/administrator/applications`,
        params: {
          ...params,
          program_id: programId,
        },
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transformApplication),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useProgramApplications = (programId: string, params?: any) => {
  const query = useQuery({
    queryKey: ['PROGRAM', programId, 'applications'],
    queryFn: fetchList(programId, params),
  });
  useEffect(() => {
    query.refetch();
  }, [programId, JSON.stringify(params)]);

  return query;
};

export default useProgramApplications;
