import { ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transformInvestorRequirements } from '../transformers';
import { IRequirements } from '../types';

const fetchList =
  (investorId: string) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: IRequirements[]; pager?: IPagination }>(
      {
        url: `/api/mng/investment/${investorId}/attachment`,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transformInvestorRequirements),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useInvestorRequirementsList = (investorId: string) => {
  return useQuery({
    queryKey: ['INVESTOR/requirements_list', investorId],
    queryFn: fetchList(investorId),
    enabled: !!investorId,
  });
};

export default useInvestorRequirementsList;
