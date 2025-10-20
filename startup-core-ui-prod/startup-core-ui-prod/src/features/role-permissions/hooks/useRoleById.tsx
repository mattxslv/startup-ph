import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { ws } from 'lib';
import { transformRole } from '../transformers';
import { IRole } from '../types';

const fetch =
  (id: string) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<IRole>(
      {
        url: `/api/v2/administrator/roles/${id}`,
        transform: ({ data }) => transformRole(data?.data),
      },
      { signal }
    );

const useRoleById = (id: string) => {
  return useQuery({
    queryKey: ['ROLE', id],
    queryFn: fetch(id),
  });
};

export default useRoleById;
