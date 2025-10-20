import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transform } from '../transformers';
import { ws } from 'lib';
import { TStartUp } from '../startup';

const fetch =
  (id: string) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<TStartUp>(
      {
        url: `/api/v2/administrator/startups/${id}`,
        transform: ({ data }) => transform(data?.data),
      },
      { signal }
    );

const useStartupById = (id: string) => {
  return useQuery({
    queryKey: ['STARTUP', id],
    queryFn: fetch(id),
  });
};

export default useStartupById;
