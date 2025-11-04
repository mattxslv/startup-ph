import MapWithRegions from './MapWithRegions';
import { PH_BOUNDS } from '../constants';
import useStartupByAddressList from '../hooks/useStartupByAddressList';

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
  const { data, isFetching: isFetchingStartup } = useStartupByAddressList();
  const list = getList(data?.list);

  return <MapWithRegions regions={list} className="w-full h-full" />;
};

export default Map;
