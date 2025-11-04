import { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { twMerge } from 'tailwind-merge';
import 'ol/ol.css';

interface Props {
  className?: string;
  zoom?: number;
  scrollWheelZoom?: boolean;
  defaultCenter?: [number, number]; // [longitude, latitude]
  children?: React.ReactNode;
}

const OpenLayerMap = ({
  className,
  zoom = 6,
  scrollWheelZoom = true,
  defaultCenter = [121.774, 12.8797], // PH default center [lng, lat]
  children,
}: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Create the map instance
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM({
            attributions: [],
          }),
        }),
      ],
      view: new View({
        center: fromLonLat(defaultCenter),
        zoom: zoom,
      }),
      controls: [],
    });

    // Enable/disable mouse wheel zoom
    const interactions = map.getInteractions();
    interactions.forEach((interaction) => {
      if (interaction.constructor.name === 'MouseWheelZoom') {
        interaction.setActive(scrollWheelZoom);
      }
    });

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      map.setTarget(undefined);
    };
  }, [defaultCenter, zoom, scrollWheelZoom]);

  return (
    <div className={twMerge('w-full h-full z-0', className)} style={{ position: 'relative' }}>
      <div ref={mapRef} className="w-full h-full" />
      {children}
    </div>
  );
};

export default OpenLayerMap;
