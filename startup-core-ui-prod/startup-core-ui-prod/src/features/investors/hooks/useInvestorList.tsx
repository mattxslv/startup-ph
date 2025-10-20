import { ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { omit } from 'lodash';
import { transformInvestor } from '../transformers';
import { IInvestor } from '../types';
import removeEmptyValues from 'utils/removeEmptyValues';
import { useEffect } from 'react';

const formatFilter = (filter: any) =>
  removeEmptyValues({
    ...omit(filter, ['status']),
    'status[]': filter?.status || '',
  });

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: IInvestor[]; pager?: IPagination }>(
      {
        url: '/api/mng/investment',
        params: formatFilter(params),
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transformInvestor),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useInvestorList = (params?: any) => {
  const query = useQuery({
    queryKey: ['INVESTOR/list'],
    queryFn: fetchList(params),
    enabled: params !== false,
  });
  useEffect(() => {
    query.refetch();
  }, [params]);
  return query;
};

export default useInvestorList;
