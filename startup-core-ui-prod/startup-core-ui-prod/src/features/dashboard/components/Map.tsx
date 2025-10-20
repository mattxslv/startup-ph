import GoogleMap from 'ui/components/google-map/GoogleMap';
import { PH_BOUNDS } from '../constants';
import { LayerGroup, LayersControl, Polygon, Tooltip } from 'react-leaflet';
import useStartupByAddressList from '../hooks/useStartupByAddressList';
import { useMemo } from 'react';

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

const filter = {
  per_page: 1000,
  level: 'all',
};

const Map = () => {
  const { data, isFetching: isFetchingStartup } =
    useStartupByAddressList(filter);
  const list = getList(data?.list);

  const getMinMaxCount = useMemo(() => {
    let minCount = Infinity;
    let maxCount = 0;
    list.forEach((region) => {
      if (region.count < minCount) {
        minCount = region.count;
      }
      if (region.count > maxCount) {
        maxCount = region.count;
      }
    });
    return { minCount, maxCount };
  }, [list]);

  const getFillOpacity = (count: number) => {
    const { minCount, maxCount } = getMinMaxCount;
    const range = maxCount - minCount;
    if (range === 0) {
      return 0.8; // Default opacity if all values are the same
    }
    const normalizedCount = (count - minCount) / range;
    return normalizedCount - 0.2;
  };

  return (
    <GoogleMap>
      <LayersControl position="topright">
        {list.map((region) => (
          <LayersControl.Overlay
            checked
            name={region.region}
            key={region.region}
          >
            <LayerGroup>
              {region.provinces.map((province) => (
                <Polygon
                  key={province.name}
                  positions={province.coords}
                  pathOptions={{
                    color: 'red',
                    weight: 1,
                    fillOpacity: getFillOpacity(region.count),
                  }}
                >
                  <Tooltip>
                    <p className="font-semibold">{region.region}</p>
                    <p className="text-gray-600 text-xs">
                      Total Startup Count:{' '}
                      <span className="font-semibold">{region.count}</span>
                    </p>
                    <p className="text-gray-600 text-xs">
                      Province:{' '}
                      <span className="font-semibold">{province.name}</span>
                    </p>
                  </Tooltip>
                </Polygon>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        ))}
      </LayersControl>
    </GoogleMap>
  );
};

export default Map;
