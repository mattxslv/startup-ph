import { ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transform } from '../transformers';
import { IAuditLogs } from '../types';
import { useEffect } from 'react';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: IAuditLogs[]; pager?: IPagination }>(
      {
        url: `/api/v2/administrator/audits`,
        params,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transform),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useAuditLogsList = (params?: any) => {
  const query = useQuery({
    queryKey: ['AUDIT_LOGS/list', JSON.stringify(params)],
    queryFn: fetchList(params),
  });
  useEffect(() => {
    query.refetch();
  }, [JSON.stringify(params)]);

  return query;
};

export default useAuditLogsList;
