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
  defaultCenter?: [number, number]; // [longitude, latitude]
  children?: React.ReactNode;
}

const OpenLayersMap = ({
  className,
  zoom = 6,
  defaultCenter = [121.774, 12.8797], // PH default center [lng, lat]
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

    mapInstanceRef.current = map;

    // Cleanup
    return () => {
      map.setTarget(undefined);
    };
  }, [defaultCenter, zoom]);

  return (
    <div 
      ref={mapRef} 
      className={twMerge('w-full h-full', className)}
      style={{ position: 'relative' }}
    />
  );
};

export default OpenLayersMap;
