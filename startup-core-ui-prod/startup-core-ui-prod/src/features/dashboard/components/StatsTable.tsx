import { useFormContext } from 'ui/forms';
import useAddressList from '../hooks/useAddressList';
import { useMemo } from 'react';
import useGetFilteredStartupList from '../hooks/useGetFilterredStartupList';
import { isEmpty } from 'lodash';

const getList = (
  array1: TList[] | undefined,
  array2: TAddress[] | undefined
) => {
  if (!array1 || !array2) return [];
  return array2.map((i) => {
    const obj = array1.find((v) => v.value === i.code);

    return {
      label: i.name || 'OTHERS',
      count: obj?.count || 0,
      value: obj?.value || '',
    };
  });
};

const INIT_FILTER = { per_page: 1000 };

const StatsTable = () => {
  const { values } = useFormContext();
  const { data, isFetchingStartup } = useGetFilteredStartupList(values);
  const { data: regions, isFetching: isFetchingRegions } = useAddressList(
    'regions',
    INIT_FILTER
  );
  const { data: provinces, isFetching: isFetchingProvinces } = useAddressList(
    'provinces',
    {
      region_code: values.region_code || '',
      ...INIT_FILTER,
    }
  );
  const { data: municipalities, isFetching: isFetchingMunicipalities } =
    useAddressList('municipalities', {
      province_code: values.province_code || '',
      ...INIT_FILTER,
    });
  const { data: barangays, isFetching: isFetchingBarangays } = useAddressList(
    'barangays',
    {
      municipality_code: values.municipality_code || '',
      ...INIT_FILTER,
    }
  );
  const isLoading =
    isFetchingStartup ||
    isFetchingRegions ||
    isFetchingProvinces ||
    isFetchingMunicipalities ||
    isFetchingBarangays;

  const mapper = {
    regions: regions?.list,
    provinces: provinces?.list,
    municipalities: municipalities?.list,
    barangays: barangays?.list,
  };

  const list = useMemo(() => {
    if (!data || !data?.key) return [];
    const mappedList = getList(
      data?.list,
      mapper[data.key as keyof typeof mapper]
    );
    const othersCount = data.list.map((i) =>
      !i.label || i.label === 'OTHERS' ? i.count : 0
    );
    const othersTotal = !isEmpty(othersCount)
      ? othersCount.reduce((prev, current) => prev + current)
      : 0;
    const others = { label: 'OTHERS', count: othersTotal, value: '' };
    return data.key === 'regions' ? [...mappedList, others] : mappedList;
  }, [data]);

  const regionName = regions?.list?.find(
    (i) => i.code === values.region_code
  )?.name;
  const provinceName = provinces?.list?.find(
    (i) => i.code === values.province_code
  )?.name;
  const municipalityName = municipalities?.list?.find(
    (i) => i.code === values.municipality_code
  )?.name;

  return (
    <div className="flex flex-col h-full rounded-md border">
      <div className="px-4 py-2 flex flex-col gap-1 bg-gray-200 w-full">
        <p className="font-bold text-sm">
          {regionName || 'REGIONS'}{' '}
          <span className="text-gray-600 font-semibold">{provinceName}</span>
        </p>
        <small className="text-xs text-gray-600 font-semibold uppercase">
          {municipalityName
            ? municipalityName
            : provinceName
            ? 'Municipalities'
            : regionName
            ? 'Provinces'
            : ''}
        </small>
      </div>
      <div className="relative flex-1">
        <div className="flex flex-col absolute w-full h-full overflow-y-scroll divide-y">
          {list?.length ? (
            list.map((i, index) => (
              <div className="flex items-center text-xs px-4 py-2" key={index}>
                <p className="w-[70%]">{i.label}</p>
                <p className="w-[30%] text-right">{i.count}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center text-xs px-4 py-2">
              {isLoading ? 'Loading...' : 'No data available.'}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center text-sm bg-blue-200 font-bold text-primary-base px-4 py-2">
        <p className="w-[70%]">TOTAL</p>
        <p className="w-[30%] text-right">{data?.total || 0}</p>
      </div>
    </div>
  );
};

export default StatsTable;
