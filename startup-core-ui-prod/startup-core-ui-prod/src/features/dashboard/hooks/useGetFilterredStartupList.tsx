import useStartupByAddressList from './useStartupByAddressList';

const getFilter = (states: any) => {
  if (!states.region_code) return { level: 'all' };
  if (!states.province_code)
    return { level: 'region', region_code: states.region_code };
  if (!states.municipality_code)
    return { level: 'province', province_code: states.province_code };
  return {
    level: 'municipality',
    municipality_code: states.municipality_code,
  };
};

const useGetFilteredStartupList = (values: any) => {
  const { data, isFetching } = useStartupByAddressList({
    per_page: 1000,
    ...getFilter(values),
    ...(values.sector && { sector: values.sector }),
  });

  return { data, isFetchingStartup: isFetching };
};

export default useGetFilteredStartupList;
