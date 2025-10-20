import { ws } from '@/lib';
import { useInfiniteQuery } from '@tanstack/react-query';

export interface IPublicStartup {
  id?: string;
  slug: string;
  sectors: string[];
  name: string;
  short_description?: string;
  description: string;
  founder: string;

  address_label: string;
  address_geoloc: string;

  region_code?: string;
  _region_name?: string;
  province_code?: string;
  _province_name?: string;
  municipality_code?: string;
  _municipality_name?: string;
  barangay_code?: string;
  _barangay_name?: string;
  street?: string;
  postal_code?: string;

  icon_url?: string;
  photo_url?: string;
  video_url?: string;
  presentation_url?: string;
}

const transformStartup = (raw: any): IPublicStartup => ({
  id: raw?.id,
  slug: raw?.slug,
  sectors: raw?.sectors || [],
  name: raw?.name,
  short_description: raw?.short_description,
  description: raw?.description,
  founder: raw?.founder,
  address_label: raw?.address_label || raw?.display_address,
  address_geoloc: raw?.address_geoloc,
  region_code: raw?.region_code,
  _region_name: raw?.region_name,
  province_code: raw?.province_code,
  _province_name: raw?.province_name,
  municipality_code: raw?.municipality_code,
  _municipality_name: raw?.municipality_name,
  barangay_code: raw?.barangay_code,
  _barangay_name: raw?.barangay_name,
  street: raw?.street,
  postal_code: raw?.postal_code,

  icon_url: raw?.icon_url,
  photo_url: raw?.photo_url,
  video_url: raw?.video_url,
  presentation_url: raw?.presentation_url,
});

export const fetchStartupBySlug = async (slug: string) => {
  try {
    const data = await ws.get({
      url: `/api/v1/public/startups/${slug}`,
      transform: ({ data }) => {
        return transformStartup(data?.data);
      },
    });
    return data;
  } catch (err) {
    return null;
  }
};

export const useInfiniteStartupList = () => {
  return useInfiniteQuery({
    queryKey: ['INFINITE_STARTUP'],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await ws.get<{ list: IPublicStartup[]; pager: TPager }>({
        url: `/api/v1/public/startups?paginate=1&page=${pageParam}&per_page=12`,
        transform: ({ data }) => ({
          list: (data?.data || []).map(transformStartup),
          pager: data?.meta,
        }),
      });
      return res;
    },
    getPreviousPageParam: (x) => {
      const prev = (x?.pager?.current_page ?? 1) - 1;
      return prev > 0 ? prev : undefined;
    },
    getNextPageParam: (x) => {
      const next = (x?.pager?.current_page ?? 1) + 1;
      return next <= x?.pager?.last_page ? next : undefined;
    },
  });
};
