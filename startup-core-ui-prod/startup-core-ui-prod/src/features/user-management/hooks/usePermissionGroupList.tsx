import { ws } from 'lib';
import { IPagination } from 'types';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { transformRole } from 'features/role-permissions/transformers';
import { IRole } from 'features/role-permissions/types';

const fetchList =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<{ list: IRole[]; pager?: IPagination }>(
      {
        url: '/api/v2/administrator/permission_groups',
        params,
        transform: ({ data }) => ({
          list: (data?.data ?? []).map(transformRole),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const usePermissionGroupList = (params?: any) => {
  return useQuery({
    queryKey: ['PERMISSION_GROUP/list', JSON.stringify(params)],
    queryFn: fetchList(params),
  });
};

export default usePermissionGroupList;
