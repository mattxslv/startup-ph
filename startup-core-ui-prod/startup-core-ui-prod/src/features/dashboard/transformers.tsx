export const transform = (raw: any): TAddress => ({
  ...(raw?.code && { code: raw.code }),
  ...(raw?.region_code && { region_code: raw.region_code }),
  ...(raw?.province_code && { province_code: raw.province_code }),
  ...(raw?.name && { name: raw.name }),
});

export const transformStartupByAddress = (raw: any): TStartupByAddress => ({
  total: raw?.total || 0,
  key: raw?.regions
    ? 'regions'
    : raw?.provinces
    ? 'provinces'
    : raw?.municipalities
    ? 'municipalities'
    : 'barangays',
  list:
    raw?.regions ||
    raw?.provinces ||
    raw?.municipalities ||
    raw?.barangays ||
    [],
  selected:
    raw?.region || raw?.province || raw?.municipality || raw?.barangay || {},
});

export const transformStats = (raw: any): TStatistics => ({
  query_filter: raw?.query?.filter || '',
  for_verification_prev_period:
    raw?.statistics?.for_verification_startups?.previous?.period || '',
  for_verification_prev_count:
    raw?.statistics?.for_verification_startups?.previous?.count || 0,
  for_verification_current_period:
    raw?.statistics?.for_verification_startups?.current?.period || '',
  for_verification_current_count:
    raw?.statistics?.for_verification_startups?.current?.count || 0,
  for_verification_trend_value:
    raw?.statistics?.for_verification_startups?.trend_percentage?.value || 0,
  for_verification_trend_formatted_value:
    raw?.statistics?.for_verification_startups?.trend_percentage
      ?.formatted_value || '',
  for_verification_trend:
    raw?.statistics?.for_verification_startups?.trend_percentage?.trend || '',
  programs_prev_period: raw?.statistics?.programs?.previous?.period || '',
  programs_prev_count: raw?.statistics?.programs?.previous?.count || 0,
  programs_current_period: raw?.statistics?.programs?.current?.period || '',
  programs_current_count: raw?.statistics?.programs?.current?.count || 0,
  programs_trend_value: raw?.statistics?.programs?.trend_percentage?.value || 0,
  programs_trend_formatted_value:
    raw?.statistics?.programs?.trend_percentage?.formatted_value || '',
  programs_trend: raw?.statistics?.programs?.trend_percentage?.trend || '',
  startups_prev_period: raw?.statistics?.startups?.previous?.period || '',
  startups_prev_count: raw?.statistics?.startups?.previous?.count || 0,
  startups_current_period: raw?.statistics?.startups?.current?.period || '',
  startups_current_count: raw?.statistics?.startups?.current?.count || 0,
  startups_trend_value: raw?.statistics?.startups?.trend_percentage?.value || 0,
  startups_trend_formatted_value:
    raw?.statistics?.startups?.trend_percentage?.formatted_value || '',
  startups_trend: raw?.statistics?.startups?.trend_percentage?.trend || '',
  verified_prev_period:
    raw?.statistics?.verified_startups?.previous?.period || '',
  verified_prev_count: raw?.statistics?.verified_startups?.previous?.count || 0,
  verified_current_period:
    raw?.statistics?.verified_startups?.current?.period || '',
  verified_current_count:
    raw?.statistics?.verified_startups?.current?.count || 0,
  verified_trend_value:
    raw?.statistics?.verified_startups?.trend_percentage?.value || 0,
  verified_trend_formatted_value:
    raw?.statistics?.verified_startups?.trend_percentage?.formatted_value || '',
  verified_trend:
    raw?.statistics?.verified_startups?.trend_percentage?.trend || '',
});

export const transformReturnStartups = (raw: any) => ({
  total: raw?.total || 0,
  list: raw?.by_assessment_tags || [],
});
