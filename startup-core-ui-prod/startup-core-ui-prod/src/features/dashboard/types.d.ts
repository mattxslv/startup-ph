type TAddress = {
  code: string;
  region_code: string;
  province_code: string;
  name: string;
};

type TStatistics = {
  query_filter: string;
  /* for_verification_startups */
  for_verification_prev_period: string;
  for_verification_prev_count: number;
  for_verification_current_period: string;
  for_verification_current_count: number;
  for_verification_trend_value: number;
  for_verification_trend_formatted_value: string;
  for_verification_trend: string;
  /* END for_verification_startups */

  /* programs */
  programs_prev_period: string;
  programs_prev_count: number;
  programs_current_period: string;
  programs_current_count: number;
  programs_trend_value: number;
  programs_trend_formatted_value: string;
  programs_trend: string;
  /* END programs */

  /* startups */
  startups_prev_period: string;
  startups_prev_count: number;
  startups_current_period: string;
  startups_current_count: number;
  startups_trend_value: number;
  startups_trend_formatted_value: string;
  startups_trend: string;
  /* END startups */

  /* verified_startups */
  verified_prev_period: string;
  verified_prev_count: number;
  verified_current_period: string;
  verified_current_count: number;
  verified_trend_value: number;
  verified_trend_formatted_value: string;
  verified_trend: string;
  /*  END verified_startups */
};

// type TStats = {
//   previous: TDateRange;
//   current: TDateRange;
//   trend_percentage: TTrend;
// };

// type TDateRange = {
//   period: string;
//   count: number;
// };

// type TTrend = {
//   value: number;
//   formatted_value: string;
//   trend: string;
// };

type TStartupByAddress = {
  key: string;
  total: number;
  list: TList[];
  selected: TSelected | undefined;
};

type TList = {
  label: string;
  value: string;
  count: number;
};

type TSelected = {
  code: string;
  name: string;
};

type TAdressKey = 'region_code' | 'province_code' | 'municipality_code';

type TPhBounds = {
  region: string;
  provinces: TProvince[];
};

type TProvince = {
  name: string;
  coords: Array<Array<[number, number]>>;
};
