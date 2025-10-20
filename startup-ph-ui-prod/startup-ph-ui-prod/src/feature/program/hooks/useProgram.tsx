import { useSession } from '@/context/my-auth';
import { ws } from '@/lib';
import formatDate from '@/utils/formatDate';
import removeEmptyValues from '@/utils/removeEmpty';
import { useQuery } from '@tanstack/react-query';

type Response = {
  list: TProgram[];
  pager: any;
};

export type TProgram = {
  id: string;
  agency: string;
  banner_url: string;
  body: string;
  date_human: string;
  description: string;
  is_verified_required: boolean;
  name: string;
  thumbnail_url: string;
  type: string;
  application: TApplication | null;
  requirements: Array<TRequirement>;
  is_open_for_application: 1 | 0;
};

export type TApplication = {
  id: string;
  status: string;
  remarks: string;
};

export type TRequirement = {
  id: string;
  code: string;
  is_required: boolean;
  type: 'INPUT' | 'FILE';
  label: string;
  description: string;
};

const transformApplication = (raw: any): TApplication => ({
  id: raw?.id,
  status: raw?.status,
  remarks: raw?.remarks || '',
});

const transformRequirement = (raw: any): TRequirement => ({
  id: String(raw?.id),
  code: raw?.code,
  is_required: Boolean(raw?.is_required),
  type: raw?.type,
  label: raw?.name,
  description: raw?.meta?.description,
});

const transformProgram = (raw: any): TProgram => {
  return {
    id: String(raw.id),
    agency: raw?.agency,
    banner_url: raw?.banner_url,
    body: raw?.content?.body,
    date_human: `${formatDate(raw?.date_start)} ~ ${formatDate(raw?.date_end)}`,
    description: raw?.description,
    is_verified_required: Boolean(raw?.is_verified_required),
    name: raw?.name,
    thumbnail_url: raw?.thumbnail_url,
    type: raw?.type,
    application: raw?.application ? transformApplication(raw?.application) : null,
    requirements: (raw?.requirements || []).map(transformRequirement),
    is_open_for_application: raw?.is_open_for_application,
  };
};

export const fetchProgramById = async (id: string) => {
  return await ws.get<TProgram>({
    url: `/api/v2/common/programs/${id}`,
    transform: (res) => transformProgram(res?.data?.data),
  });
};

export function useProgramList(filter: any) {
  const session = useSession();
  const query = useQuery({
    queryKey: ['PROGRAM_LIST', JSON.stringify(filter)],
    queryFn: async ({ signal }) => {
      // const isAuthenticated = Boolean(session.data?.token); // TODO: CHECK AUTH
      // if (!isAuthenticated) {
      //   return await ws.get<Response>({
      //     url: '/api/v2/user/startup/available_programs',
      //     transform: (res) => ({
      //       list: (res?.data?.data || []).map(transformProgram),
      //       pager: {}, // NOT IN RESPONSE
      //     }),
      //   }, { signal })
      // }
      return await ws.get<Response>(
        {
          url: '/api/v2/common/programs',
          params: removeEmptyValues(filter),
          transform: (res) => ({
            list: (res?.data?.data || []).map(transformProgram),
            pager: res?.data?.meta, // NOT IN RESPONSE
          }),
        },
        { signal }
      );
    },
    initialData: {
      list: [],
      pager: {},
    },
  });

  return query;
}

export function useProgramById(id: string) {
  const session = useSession();
  const query = useQuery({
    queryKey: ['PROGRAM', id],
    queryFn: async () => {
      return await ws.get({
        url: `/api/v2/user/startup/available_programs/${id}`,
        transform: (res) => {
          return transformProgram(res?.data?.data);
        },
      });
    },
    enabled: Boolean(session.data.token),
  });
  return query;
}
