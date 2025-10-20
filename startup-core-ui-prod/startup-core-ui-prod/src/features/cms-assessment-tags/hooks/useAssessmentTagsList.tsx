import { ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { IDataset } from '../../cms-dataset/types';
import { transformAssessmentTags } from '../transformers';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: IDataset[]; pager?: IPagination }>(
      {
        url: `/api/v2/administrator/misc/assessment_tags`,
        params,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transformAssessmentTags),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useAssessmentTagsList = (params?: any) => {
  return useQuery({
    queryKey: ['ASSESSMENT_TAGS/list'],
    queryFn: fetchList({ ...params }),
  });
};

export default useAssessmentTagsList;
