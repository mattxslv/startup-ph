import { ws } from '@/lib';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

export interface TStartup {
  id?: string;
  sectors: [];
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

const transformItem = (raw: any): TStartup => ({
  id: raw?.id,
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

const fetch =
  () =>
  async ({ signal }: QueryFunctionContext) =>
    await ws.get<{ list: TStartup[]; pager: TPager }>(
      {
        url: '/api/v1/public/startups/featured',
        transform: ({ data }) => ({
          list: (data?.data || []).map(transformItem).filter((x: any, i: number) => i < 6),
          pager: data?.meta,
        }),
      },
      { signal }
    );

const useFeaturedList = () => {
  return useQuery({
    queryKey: ['FEATURED_LIST'],
    queryFn: fetch(),
  });
};

export default useFeaturedList;
