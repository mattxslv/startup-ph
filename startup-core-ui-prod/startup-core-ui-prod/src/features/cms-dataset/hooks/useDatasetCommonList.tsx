import { ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transformDataset } from '../transformers';
import { IDataset } from '../types';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: IDataset[]; pager?: IPagination }>(
      {
        url: `/api/v2/common/${
          params.code === 'assessment-tags' ? 'assessment_tags' : 'datasets'
        }`,
        params,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transformDataset),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useDatasetCommonList = (code: string, params?: any) => {
  return useQuery({
    queryKey: ['DATASET_COMMON/list', code, JSON.stringify(params)],
    queryFn: fetchList({ code, ...params }),
  });
};

export default useDatasetCommonList;
