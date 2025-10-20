// import { ws } from '@/lib'
import { Section } from '@/components/input-campaign/types';
import { ws } from '@/lib';
import formatDate from '@/utils/formatDate';
import removeEmptyValues from '@/utils/removeEmpty';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

export interface IResources {
  id: string;
  title: string;
  sub_title: string;
  publish_date: string;
  publish_by: string;
  thumbnail_url: string;
  body: Array<Section>;
  tags: string[];
}

const transform = (raw: any): IResources => ({
  id: String(raw?.id),
  title: raw?.title,
  sub_title: raw?.sub_title,
  publish_date: formatDate(raw?.publish_date, 'MMM DD, YYYY'),
  publish_by: raw?.publish_by,
  thumbnail_url: raw?.thumbnail_url,
  body: Array.isArray(raw?.body) ? raw?.body : [],
  tags: Array.isArray(raw?.tags) ? raw?.tags : [],
});

const fetch =
  (params: any) =>
  async ({ signal }: QueryFunctionContext) =>
    await ws.get<{ list: IResources[]; pager: TPager }>(
      {
        url: `/api/v2/public/resources`,
        params: removeEmptyValues(params),
        transform: ({ data }) => ({
          list: (data?.data || []).map(transform),
          pager: data?.meta,
        }),
      },
      { signal }
    );

export const useFeaturedResourcesList = (filter: any) => {
  return useQuery({
    queryKey: ['FEATURED_RESOURCES_LIST', JSON.stringify(filter)],
    queryFn: fetch(filter),
  });
};

export const useResourcesList = (filter: any) => {
  return useQuery({
    queryKey: ['RESOURCES_LIST', JSON.stringify(filter)],
    queryFn: fetch(filter),
  });
};

export const useLatestResources = (filter: any) => {
  return useQuery({
    queryKey: ['LATEST_RESOURCES', JSON.stringify(filter)],
    queryFn: fetch(filter),
  });
};

export const fetchResourcesById = (id: string): Promise<IResources> =>
  ws.get({
    url: `/api/v2/public/resources/${id}`,
    transform: ({ data }) => transform(data?.data),
  });
