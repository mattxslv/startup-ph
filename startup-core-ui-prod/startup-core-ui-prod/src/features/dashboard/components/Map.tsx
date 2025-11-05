import MapWithRegions from './MapWithRegions';
import { PH_BOUNDS } from '../constants';
import useStartupByAddressList from '../hooks/useStartupByAddressList';
import { useFormContext } from 'ui/forms';

const getList = (array: TList[] | undefined) => {
  if (!array) return [];
  return PH_BOUNDS.map((i) => {
    const obj = array.find((v) => v.label === i.region);
    return {
      region: i.region,
      provinces: i.provinces,
      count: obj?.count || 0,
    };
  });
};

const Map = () => {
  const { values } = useFormContext();
  const { data, isFetching: isFetchingStartup } = useStartupByAddressList();
  const list = getList(data?.list);

  // Get selected region, province, and city codes from form
  const selectedRegionCode = values?.region_code;
  const selectedProvinceCode = values?.province_code;
  const selectedCityCode = values?.municipality_code;

  return (
    <MapWithRegions 
      regions={list} 
      selectedRegionCode={selectedRegionCode}
      selectedProvinceCode={selectedProvinceCode}
      selectedCityCode={selectedCityCode}
      className="w-full h-full" 
    />
  );
};

export default Map;
