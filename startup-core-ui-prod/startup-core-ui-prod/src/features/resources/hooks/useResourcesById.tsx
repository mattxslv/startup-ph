import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { IResources } from '../types';
import { transform } from '../transformers';
import { ws } from 'lib';

const fetch =
  (id: string) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<IResources>(
      {
        url: `/api/v2/administrator/misc/resources/${id}`,
        transform: ({ data }) => transform(data?.data),
      },
      { signal }
    );

const useResourcesById = (id: string) => {
  return useQuery({
    queryKey: ['RESOURCES', id],
    queryFn: fetch(id),
  });
};

export default useResourcesById;
