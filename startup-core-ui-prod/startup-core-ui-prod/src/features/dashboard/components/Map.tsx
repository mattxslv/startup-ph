import OpenLayerMap from 'ui/components/google-map/GoogleMap';
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

const Map = () => {
  const { data, isFetching: isFetchingStartup } =
    useStartupByAddressList();
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
      return 0.5; // Default opacity if all values are the same
    }
    const normalizedCount = (count - minCount) / range;
    return Math.max(0.2, Math.min(0.8, normalizedCount));
  };

  return (
    <OpenLayerMap>
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
                    color: '#dc2626',
                    weight: 1,
                    fillColor: '#ef4444',
                    fillOpacity: getFillOpacity(region.count),
                  }}
                >
                  <Tooltip sticky>
                    <div className="p-1">
                      <p className="font-semibold text-sm">{region.region}</p>
                      <p className="text-gray-600 text-xs">
                        Province: <span className="font-semibold">{province.name}</span>
                      </p>
                      <p className="text-gray-600 text-xs">
                        Total Startups: <span className="font-semibold">{region.count}</span>
                      </p>
                    </div>
                  </Tooltip>
                </Polygon>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        ))}
      </LayersControl>
    </OpenLayerMap>
  );
};

export default Map;
