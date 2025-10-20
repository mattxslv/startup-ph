import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { IProgram } from '../types';
import { transform } from '../transformers';
import { ws } from 'lib';

const fetch =
  (id: string) =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<IProgram>(
      {
        url: `/api/v2/administrator/programs/${id}`,
        transform: ({ data }) => transform(data?.data),
      },
      { signal }
    );

const useProgramById = (id: string) => {
  return useQuery({
    queryKey: ['PROGRAM', id],
    queryFn: fetch(id),
  });
};

export default useProgramById;
