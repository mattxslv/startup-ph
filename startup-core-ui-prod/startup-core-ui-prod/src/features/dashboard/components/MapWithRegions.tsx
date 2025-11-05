import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import Feature from 'ol/Feature';
import Polygon from 'ol/geom/Polygon';
import { Fill, Stroke, Style } from 'ol/style';
import Overlay from 'ol/Overlay';
import 'ol/ol.css';

interface Province {
  name: string;
  coords: number[][][];
}

interface Region {
  region: string;
  provinces: Province[];
  count: number;
}

interface MapWithRegionsProps {
  regions: Region[];
  className?: string;
}

const MapWithRegions = ({ regions, className }: MapWithRegionsProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const [tooltipData, setTooltipData] = useState<{
    region: string;
    province: string;
    count: number;
  } | null>(null);

  // Color palette for different regions
  const REGION_COLORS: { [key: string]: { fill: string; stroke: string } } = {
    'REGION I (ILOCOS REGION)': { fill: '#3b82f6', stroke: '#2563eb' },
    'REGION II (CAGAYAN VALLEY)': { fill: '#8b5cf6', stroke: '#7c3aed' },
    'REGION III (CENTRAL LUZON)': { fill: '#ec4899', stroke: '#db2777' },
    'REGION IV-A (CALABARZON)': { fill: '#f59e0b', stroke: '#d97706' },
    'REGION IV-B (MIMAROPA)': { fill: '#84cc16', stroke: '#65a30d' },
    'REGION V (BICOL REGION)': { fill: '#14b8a6', stroke: '#0d9488' },
    'REGION VI (WESTERN VISAYAS)': { fill: '#06b6d4', stroke: '#0891b2' },
    'REGION VII (CENTRAL VISAYAS)': { fill: '#6366f1', stroke: '#4f46e5' },
    'REGION VIII (EASTERN VISAYAS)': { fill: '#a855f7', stroke: '#9333ea' },
    'REGION IX (ZAMBOANGA PENINSULA)': { fill: '#ef4444', stroke: '#dc2626' },
    'REGION X (NORTHERN MINDANAO)': { fill: '#f97316', stroke: '#ea580c' },
    'REGION XI (DAVAO REGION)': { fill: '#10b981', stroke: '#059669' },
    'REGION XII (SOCCSKSARGEN)': { fill: '#22c55e', stroke: '#16a34a' },
    'REGION XIII (CARAGA)': { fill: '#eab308', stroke: '#ca8a04' },
    'NCR (NATIONAL CAPITAL REGION)': { fill: '#dc2626', stroke: '#b91c1c' },
    'CAR (CORDILLERA ADMINISTRATIVE REGION)': { fill: '#64748b', stroke: '#475569' },
    'BARMM (BANGSAMORO AUTONOMOUS REGION IN MUSLIM MINDANAO)': { fill: '#0ea5e9', stroke: '#0284c7' },
    'OTHERS': { fill: '#94a3b8', stroke: '#64748b' },
  };

  // Get color for region with fallback
  const getRegionColor = (regionName: string) => {
    return REGION_COLORS[regionName] || { fill: '#94a3b8', stroke: '#64748b' };
  };

  // Calculate min and max counts for opacity
  const getMinMaxCount = () => {
    let minCount = Infinity;
    let maxCount = 0;
    regions.forEach((region) => {
      if (region.count < minCount) minCount = region.count;
      if (region.count > maxCount) maxCount = region.count;
    });
    return { minCount, maxCount };
  };

  const getFillOpacity = (count: number) => {
    const { minCount, maxCount } = getMinMaxCount();
    const range = maxCount - minCount;
    if (range === 0) return 0.6;
    const normalizedCount = (count - minCount) / range;
    return Math.max(0.3, Math.min(0.8, normalizedCount));
  };

  useEffect(() => {
    if (!mapRef.current || !tooltipRef.current) return;

    // Create overlay for tooltip
    const overlay = new Overlay({
      element: tooltipRef.current,
      autoPan: false,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -10],
    });
    overlayRef.current = overlay;

    // Create vector source for polygons
    const vectorSource = new VectorSource();

    // Add features for each region's provinces
    regions.forEach((region) => {
      const regionColors = getRegionColor(region.region);
      
      region.provinces.forEach((province) => {
        // Convert coordinates from [lat, lng] to [lng, lat] and project
        const coordinates = province.coords.map((ring) =>
          ring.map((coord) => fromLonLat([coord[1], coord[0]]))
        );

        const polygon = new Polygon(coordinates);
        const feature = new Feature({
          geometry: polygon,
          region: region.region,
          province: province.name,
          count: region.count,
        });

        const opacity = getFillOpacity(region.count);
        
        // Convert hex color to rgba with dynamic opacity
        const hexToRgba = (hex: string, alpha: number) => {
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        };
        
        feature.setStyle(
          new Style({
            fill: new Fill({
              color: hexToRgba(regionColors.fill, opacity),
            }),
            stroke: new Stroke({
              color: regionColors.stroke,
              width: 1.5,
            }),
          })
        );

        vectorSource.addFeature(feature);
      });
    });

    // Create vector layer
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    // Create the map
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM({
            attributions: [],
          }),
        }),
        vectorLayer,
      ],
      overlays: [overlay],
      view: new View({
        center: fromLonLat([121.774, 12.8797]), // PH center
        zoom: 6,
      }),
      controls: [],
    });

    mapInstanceRef.current = map;

    // Handle mouse move for tooltip
    map.on('pointermove', (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
      
      if (feature) {
        const properties = feature.getProperties();
        setTooltipData({
          region: properties.region,
          province: properties.province,
          count: properties.count,
        });
        overlay.setPosition(evt.coordinate);
      } else {
        setTooltipData(null);
        overlay.setPosition(undefined);
      }
    });

    // Change cursor on hover
    map.on('pointermove', (evt) => {
      const pixel = map.getEventPixel(evt.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      const target = map.getTarget();
      if (target && typeof target !== 'string') {
        target.style.cursor = hit ? 'pointer' : '';
      }
    });

    // Cleanup
    return () => {
      map.setTarget(undefined);
    };
  }, [regions]);

  return (
    <div className={className} style={{ position: 'relative' }}>
      <div ref={mapRef} className="w-full h-full" />
      <div
        ref={tooltipRef}
        className={`absolute bg-white shadow-lg rounded-lg border border-gray-200 transition-opacity ${
          tooltipData ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ padding: '8px', minWidth: '150px' }}
      >
        {tooltipData && (
          <div className="p-1">
            <p className="font-semibold text-sm">{tooltipData.region}</p>
            <p className="text-gray-600 text-xs">
              Province: <span className="font-semibold">{tooltipData.province}</span>
            </p>
            <p className="text-gray-600 text-xs">
              Total Startups: <span className="font-semibold">{tooltipData.count}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapWithRegions;
