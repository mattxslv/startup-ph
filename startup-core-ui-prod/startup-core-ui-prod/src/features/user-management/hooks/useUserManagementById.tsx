import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { IUser } from '../types';
import { transformUser } from '../transformers';
import { ws } from 'lib';

const fetch =
  (id: string) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<IUser>(
      {
        url: `/api/v2/administrator/administrators/${id}`,
        transform: ({ data }) => transformUser(data?.data),
      },
      { signal }
    );

const useUserManagementById = (id: string) => {
  return useQuery({
    queryKey: ['USER_MANAGEMENT', id],
    queryFn: fetch(id),
  });
};

export default useUserManagementById;
