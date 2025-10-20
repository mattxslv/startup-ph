import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { INews } from '../types';
import { transform } from '../transformers';
import { ws } from 'lib';

const fetch =
  (id: string) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<INews>(
      {
        url: `/api/v2/administrator/misc/news/${id}`,
        transform: ({ data }) => transform(data?.data),
      },
      { signal }
    );

const useNewsById = (id: string) => {
  return useQuery({
    queryKey: ['NEWS', id],
    queryFn: fetch(id),
  });
};

export default useNewsById;
