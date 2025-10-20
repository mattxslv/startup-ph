import { ws } from 'lib';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transformTags } from '../transformers';
import { useEffect } from 'react';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<TAssessmentTags[]>(
      {
        url: `/api/v2/common/assessment_tags`,
        params,
        transform: ({ data }) => (data?.data ?? []).map(transformTags),
      },
      { signal }
    );

const useAssessmentTagList = (params?: any) => {
  const query = useQuery({
    queryKey: ['STARTUP/assessment_tag'],
    queryFn: fetchList(params),
  });
  useEffect(() => {
    query.refetch();
  }, [JSON.stringify(params)]);

  return query;
};

export default useAssessmentTagList;
