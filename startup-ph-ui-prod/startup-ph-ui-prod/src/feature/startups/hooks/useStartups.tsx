import { TStartup } from '@/feature/startup/types';
import { ws } from '@/lib';
// import { generateDummyStartups } from '@/utils/dummyData';
import removeEmptyValues from '@/utils/removeEmpty';
import { useQuery } from '@tanstack/react-query';

type Response = {
  list: TStartup[];
  pager: any;
};

const transformStartups = (raw: any): Partial<TStartup> => {
  return {
    business_classification: raw?.business_classification || '',
    business_name: raw?.business_name || '',
    description: raw?.description || '',
    development_phase: raw?.development_phase || '',
    display_address: raw?.display_address || '',
    founder_name: raw?.founder_name || '',
    founding_year: raw?.founding_year || '',
    logo_url: raw?.logo_url || '',
    name: raw?.name || '',
    sectors: raw?.sectors || [],
    short_description: raw?.short_description || '',
    slug: raw?.slug || '',
    social_facebook_url: raw?.social_facebook_url || '',
    social_instagram_url: raw?.social_instagram_url || '',
    social_linkedin_url: raw?.social_linkedin_url || '',
    social_website_url: raw?.social_website_url || '',
    status: raw?.status,

    // content
    banner_url: raw?.content?.banner_url || '',
    body: raw?.content?.body || [],
  };
};

export const fetchStartupsById = async (id: string) => {
  return await ws.get<Partial<TStartup>>({
    url: `/api/v2/public/startups/${id}`,
    transform: (res) => transformStartups(res?.data?.data),
  });
};

export function useStartupList(filter: any) {
  const query = useQuery({
    queryKey: ['STARTUP_LIST', JSON.stringify(filter)],
    queryFn: async ({ signal }) => {
      return await ws.get<Response>(
        {
          url: '/api/v2/public/startups',
          params: removeEmptyValues(filter),
          transform: (res) => ({
            list: (res?.data?.data || []).map(transformStartups),
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

  // const query = useQuery({
  //   queryKey: ['STARTUP_LIST', JSON.stringify(filter)],
  //   queryFn: async ({ signal }) => {
  //     // Simulate API delay
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     const page = filter.page || 1;
  //     const limit = filter.limit || 12;

  //     return generateDummyStartups(page, limit);
  //   },
  //   initialData: {
  //     list: [],
  //     meta: {
  //       current_page: 1,
  //       from: 1,
  //       last_page: 1,
  //       per_page: 12,
  //       to: 0,
  //       total: 0,
  //     },
  //   },
  // });

  // return query;
}
