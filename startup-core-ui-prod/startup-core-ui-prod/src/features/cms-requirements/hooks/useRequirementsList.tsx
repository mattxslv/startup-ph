import { ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transformRequirement } from '../transformers';
import { IRequirement } from '../types';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: IRequirement[]; pager?: IPagination }>(
      {
        url: '/api/v2/administrator/misc/requirements',
        params,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transformRequirement),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useRequirementsList = (params?: any) => {
  return useQuery({
    queryKey: ['REQUIREMENT/list', JSON.stringify(params)],
    queryFn: fetchList(params),
  });
};

export default useRequirementsList;
