import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { IInvestor } from '../types';
import { transformInvestor } from '../transformers';
import { ws } from 'lib';

const fetch =
  (id: string) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<IInvestor>(
      {
        url: `/api/mng/investment/${id}`,
        transform: ({ data }) => transformInvestor(data?.data),
      },
      { signal }
    );

const useInvestorById = (id: string) => {
  return useQuery({
    queryKey: ['INVESTOR', id],
    queryFn: fetch(id),
  });
};

export default useInvestorById;
