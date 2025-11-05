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
import { feature as topoFeature } from 'topojson-client';
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
  selectedRegionCode?: string;
  selectedProvinceCode?: string;
  selectedCityCode?: string;
}

const MapWithRegions = ({ 
  regions, 
  className, 
  selectedRegionCode,
  selectedProvinceCode,
  selectedCityCode 
}: MapWithRegionsProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const vectorSourceRef = useRef<VectorSource | null>(null);
  const [tooltipData, setTooltipData] = useState<{
    region: string;
    count: number;
  } | null>(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Mapping from TopoJSON region names to API region names
  const REGION_NAME_MAPPING: { [key: string]: string } = {
    'Region I (Ilocos Region)': 'REGION I (ILOCOS REGION)',
    'Region II (Cagayan Valley)': 'REGION II (CAGAYAN VALLEY)',
    'Region III (Central Luzon)': 'REGION III (CENTRAL LUZON)',
    'Region IV-A (CALABARZON)': 'REGION IV-A (CALABARZON)',
    'MIMAROPA Region': 'REGION IV-B (MIMAROPA)',
    'Region V (Bicol Region)': 'REGION V (BICOL REGION)',
    'Region VI (Western Visayas)': 'REGION VI (WESTERN VISAYAS)',
    'Region VII (Central Visayas)': 'REGION VII (CENTRAL VISAYAS)',
    'Region VIII (Eastern Visayas)': 'REGION VIII (EASTERN VISAYAS)',
    'Region IX (Zamboanga Peninsula)': 'REGION IX (ZAMBOANGA PENINSULA)',
    'Region X (Northern Mindanao)': 'REGION X (NORTHERN MINDANAO)',
    'Region XI (Davao Region)': 'REGION XI (DAVAO REGION)',
    'Region XII (SOCCSKSARGEN)': 'REGION XII (SOCCSKSARGEN)',
    'Region XIII (Caraga)': 'REGION XIII (CARAGA)',
    'National Capital Region (NCR)': 'NCR (NATIONAL CAPITAL REGION)',
    'Cordillera Administrative Region (CAR)': 'CAR (CORDILLERA ADMINISTRATIVE REGION)',
    'Bangsamoro Autonomous Region In Muslim Mindanao (BARMM)': 'BARMM (BANGSAMORO AUTONOMOUS REGION IN MUSLIM MINDANAO)',
    'Bangsamoro Autonomous Region in Muslim Mindanao (BARMM)': 'BARMM (BANGSAMORO AUTONOMOUS REGION IN MUSLIM MINDANAO)',
    'BARMM': 'BARMM (BANGSAMORO AUTONOMOUS REGION IN MUSLIM MINDANAO)',
    'Autonomous Region in Muslim Mindanao (ARMM)': 'BARMM (BANGSAMORO AUTONOMOUS REGION IN MUSLIM MINDANAO)',
  };

  // Mapping from region code to region name
  const REGION_CODE_TO_NAME: { [key: string]: string } = {
    '010000000': 'REGION I (ILOCOS REGION)',
    '020000000': 'REGION II (CAGAYAN VALLEY)',
    '030000000': 'REGION III (CENTRAL LUZON)',
    '040000000': 'REGION IV-A (CALABARZON)',
    '170000000': 'REGION IV-B (MIMAROPA)',
    '050000000': 'REGION V (BICOL REGION)',
    '060000000': 'REGION VI (WESTERN VISAYAS)',
    '070000000': 'REGION VII (CENTRAL VISAYAS)',
    '080000000': 'REGION VIII (EASTERN VISAYAS)',
    '090000000': 'REGION IX (ZAMBOANGA PENINSULA)',
    '100000000': 'REGION X (NORTHERN MINDANAO)',
    '110000000': 'REGION XI (DAVAO REGION)',
    '120000000': 'REGION XII (SOCCSKSARGEN)',
    '160000000': 'REGION XIII (CARAGA)',
    '130000000': 'NCR (NATIONAL CAPITAL REGION)',
    '140000000': 'CAR (CORDILLERA ADMINISTRATIVE REGION)',
    '1900000000': 'BARMM (BANGSAMORO AUTONOMOUS REGION IN MUSLIM MINDANAO)', // 10 digits
    '150000000': 'BARMM (BANGSAMORO AUTONOMOUS REGION IN MUSLIM MINDANAO)', // Old ARMM code
  };

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
    'CAR (CORDILLERA ADMINISTRATIVE REGION)': { fill: '#f97316', stroke: '#ea580c' },
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
    if (range === 0) return 0.85; // Increased from 0.6
    const normalizedCount = (count - minCount) / range;
    return Math.max(0.7, Math.min(0.95, normalizedCount)); // Increased from 0.3-0.8 to 0.7-0.95
  };

  // Initialize map once (only on mount)
  useEffect(() => {
    if (!mapRef.current || !tooltipRef.current || isMapInitialized) return;

    const initMap = async () => {
      try {
        // Load TopoJSON data
        const response = await fetch('/ph-country.json');
        const topoData = await response.json();
        
        // Convert TopoJSON to GeoJSON
        const geoJson: any = topoFeature(topoData, topoData.objects['PH_Adm1_Regions.shp']);
        
        // Create a lookup map for region counts
        const regionCountMap: { [key: string]: number } = {};
        regions.forEach((region) => {
          regionCountMap[region.region] = region.count;
        });

        // Create overlay for tooltip
        const overlay = new Overlay({
          element: tooltipRef.current!,
          autoPan: false,
          positioning: 'bottom-center',
          stopEvent: false,
          offset: [0, -10],
        });
        overlayRef.current = overlay;

        // Create vector source for polygons
        const vectorSource = new VectorSource();
        vectorSourceRef.current = vectorSource;

        // Add features for each region from TopoJSON
        if (geoJson.type === 'FeatureCollection') {
          geoJson.features.forEach((feature: any) => {
            const topoRegionName = feature.properties.adm1_en;
            const mappedRegionName = REGION_NAME_MAPPING[topoRegionName] || topoRegionName;
            const regionCount = regionCountMap[mappedRegionName] || 0;
            const regionColors = getRegionColor(mappedRegionName);

            // Debug logging for BARMM
            if (topoRegionName && topoRegionName.toLowerCase().includes('muslim') || topoRegionName && topoRegionName.toLowerCase().includes('barmm') || topoRegionName && topoRegionName.toLowerCase().includes('armm')) {
              console.log('🔍 BARMM/ARMM Region Found:', {
                topoRegionName,
                mappedRegionName,
                regionCount
              });
            }

            // Helper function to convert hex to rgba
            const hexToRgba = (hex: string, alpha: number) => {
              const r = parseInt(hex.slice(1, 3), 16);
              const g = parseInt(hex.slice(3, 5), 16);
              const b = parseInt(hex.slice(5, 7), 16);
              return `rgba(${r}, ${g}, ${b}, ${alpha})`;
            };

            // Calculate initial opacity based on count
            const opacity = getFillOpacity(regionCount);

            // Convert GeoJSON geometry to OpenLayers geometry
            let olFeatures: Feature[] = [];
            
            if (feature.geometry.type === 'Polygon') {
              const coordinates = feature.geometry.coordinates.map((ring: number[][]) =>
                ring.map((coord: number[]) => fromLonLat(coord))
              );
              const polygon = new Polygon(coordinates);
              const olFeature = new Feature({
                geometry: polygon,
                region: mappedRegionName,
                count: regionCount,
              });
              // Apply initial style
              olFeature.setStyle(
                new Style({
                  fill: new Fill({
                    color: hexToRgba(regionColors.fill, opacity),
                  }),
                  stroke: new Stroke({
                    color: hexToRgba(regionColors.fill, Math.min(opacity + 0.1, 1)),
                    width: 1.5,
                  }),
                })
              );
              olFeatures.push(olFeature);
            } else if (feature.geometry.type === 'MultiPolygon') {
              feature.geometry.coordinates.forEach((polygonCoords: number[][][]) => {
                const coordinates = polygonCoords.map((ring: number[][]) =>
                  ring.map((coord: number[]) => fromLonLat(coord))
                );
                const polygon = new Polygon(coordinates);
                const olFeature = new Feature({
                  geometry: polygon,
                  region: mappedRegionName,
                  count: regionCount,
                });
                // Apply initial style
                olFeature.setStyle(
                  new Style({
                    fill: new Fill({
                      color: hexToRgba(regionColors.fill, opacity),
                    }),
                    stroke: new Stroke({
                      color: hexToRgba(regionColors.fill, Math.min(opacity + 0.1, 1)),
                      width: 1.5,
                    }),
                  })
                );
                olFeatures.push(olFeature);
              });
            }

            // Add features to source with initial styling
            olFeatures.forEach((olFeature) => {
              vectorSource.addFeature(olFeature);
            });
          });
        }

        // Create vector layer
        const vectorLayer = new VectorLayer({
          source: vectorSource,
        });

        // Create the map
        const map = new Map({
          target: mapRef.current!,
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
        setIsMapInitialized(true);

        // Handle mouse move for tooltip (will be updated by filter effect)
        map.on('pointermove', (evt) => {
          const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
          
          if (feature) {
            const properties = feature.getProperties();
            setTooltipData({
              region: properties.region,
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
      } catch (error) {
        console.error('Error loading TopoJSON:', error);
      }
    };

    initMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        setIsMapInitialized(false);
      }
    };
  }, []); // Empty dependency array - only initialize once

  // Update region counts when regions data changes
  useEffect(() => {
    if (!isMapInitialized || !vectorSourceRef.current) return;

    const vectorSource = vectorSourceRef.current;
    
    // Create a lookup map for region counts
    const regionCountMap: { [key: string]: number } = {};
    regions.forEach((region) => {
      regionCountMap[region.region] = region.count;
    });

    // Update count property on all features
    vectorSource.getFeatures().forEach((feature) => {
      const regionName = feature.get('region');
      const count = regionCountMap[regionName] || 0;
      feature.set('count', count);
      
      // Update style based on new count if no filter is active
      if (!selectedRegionCode && !selectedProvinceCode && !selectedCityCode) {
        const regionColors = getRegionColor(regionName);
        const opacity = getFillOpacity(count);
        
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
              color: hexToRgba(regionColors.fill, Math.min(opacity + 0.1, 1)),
              width: 1.5,
            }),
          })
        );
      }
    });
  }, [regions, isMapInitialized, selectedRegionCode, selectedProvinceCode, selectedCityCode]);

  // Update styles and zoom when filters change
  useEffect(() => {
    if (!isMapInitialized || !mapInstanceRef.current || !vectorSourceRef.current) return;

    const map = mapInstanceRef.current;
    const vectorSource = vectorSourceRef.current;
    const overlay = overlayRef.current;
    const selectedRegionName = selectedRegionCode ? REGION_CODE_TO_NAME[selectedRegionCode] : null;
    const hasFilter = !!(selectedRegionCode || selectedProvinceCode || selectedCityCode);
    
    setIsFiltered(hasFilter);

    let selectedFeatures: Feature[] = [];

    // Debug logging
    if (selectedRegionName) {
      console.log('🎯 Selected Region:', {
        selectedRegionCode,
        selectedRegionName,
        hasFilter
      });
    }

    // Helper function to convert hex to rgba
    const hexToRgba = (hex: string, alpha: number) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    // Update styles for all features
    vectorSource.getFeatures().forEach((olFeature) => {
      const properties = olFeature.getProperties();
      const mappedRegionName = properties.region;
      const regionCount = properties.count;
      const regionColors = getRegionColor(mappedRegionName);
      const isSelected = selectedRegionName === mappedRegionName;

      // Debug logging for BARMM matching
      if (selectedRegionName && (selectedRegionName.includes('BARMM') || selectedRegionName.includes('MUSLIM'))) {
        console.log('🔄 Checking feature:', {
          mappedRegionName,
          selectedRegionName,
          isSelected,
          match: mappedRegionName === selectedRegionName
        });
      }

      // Determine styling based on filter state
      let fillOpacity, strokeOpacity, strokeWidth;
      
      if (selectedRegionName) {
        if (isSelected) {
          // Selected region: full vibrant color
          fillOpacity = 0.9;
          strokeOpacity = 1;
          strokeWidth = 2.5;
          // Collect all features for this region
          selectedFeatures.push(olFeature);
        } else {
          // Other regions: very faded
          fillOpacity = 0.08;
          strokeOpacity = 0.15;
          strokeWidth = 0.5;
        }
      } else {
        // No filter: use count-based opacity
        const opacity = getFillOpacity(regionCount);
        fillOpacity = opacity;
        strokeOpacity = Math.min(opacity + 0.1, 1);
        strokeWidth = 1.5;
      }

      // Apply new style
      olFeature.setStyle(
        new Style({
          fill: new Fill({
            color: hexToRgba(regionColors.fill, fillOpacity),
          }),
          stroke: new Stroke({
            color: hexToRgba(regionColors.fill, strokeOpacity),
            width: strokeWidth,
          }),
        })
      );
    });

    // Update hover behavior
    // Remove old listeners if they exist
    if ((map as any)._hoverHandler) {
      map.un('pointermove', (map as any)._hoverHandler);
    }
    if ((map as any)._cursorHandler) {
      map.un('pointermove', (map as any)._cursorHandler);
    }
    
    const hoverHandler = (evt: any) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
      
      if (feature) {
        const properties = feature.getProperties();
        const featureRegion = properties.region;
        
        // Only show tooltip if no filter OR if hovering over the selected region
        if (!hasFilter || featureRegion === selectedRegionName) {
          setTooltipData({
            region: properties.region,
            count: properties.count,
          });
          overlay?.setPosition(evt.coordinate);
        } else {
          // Hide tooltip when hovering over faded regions
          setTooltipData(null);
          overlay?.setPosition(undefined);
        }
      } else {
        setTooltipData(null);
        overlay?.setPosition(undefined);
      }
    };

    const cursorHandler = (evt: any) => {
      const pixel = map.getEventPixel(evt.originalEvent);
      const feature = map.forEachFeatureAtPixel(pixel, (f) => f);
      const target = map.getTarget();
      
      if (target && typeof target !== 'string') {
        if (feature) {
          const properties = feature.getProperties();
          const featureRegion = properties.region;
          // Only show pointer if no filter OR if hovering over the selected region
          target.style.cursor = (!hasFilter || featureRegion === selectedRegionName) ? 'pointer' : '';
        } else {
          target.style.cursor = '';
        }
      }
    };

    (map as any)._hoverHandler = hoverHandler;
    (map as any)._cursorHandler = cursorHandler;
    
    map.on('pointermove', hoverHandler);
    map.on('pointermove', cursorHandler);

    // Zoom to selected region with progressive levels
    if (selectedFeatures.length > 0) {
      console.log('✅ Zooming to region, features found:', selectedFeatures.length);
      
      // Calculate combined extent from all features of the selected region
      let combinedExtent: any = null;
      selectedFeatures.forEach((feature) => {
        const extent = feature.getGeometry()?.getExtent();
        if (extent) {
          if (!combinedExtent) {
            combinedExtent = extent;
          } else {
            // Extend the combined extent to include this feature's extent
            combinedExtent = [
              Math.min(combinedExtent[0], extent[0]),
              Math.min(combinedExtent[1], extent[1]),
              Math.max(combinedExtent[2], extent[2]),
              Math.max(combinedExtent[3], extent[3]),
            ];
          }
        }
      });

      if (combinedExtent) {
        let zoomLevel = 9; // Default for region
        let padding = [50, 50, 50, 50];
        
        if (selectedCityCode) {
          // City selected: zoom in closest
          zoomLevel = 13;
          padding = [30, 30, 30, 30];
        } else if (selectedProvinceCode) {
          // Province selected: medium zoom
          zoomLevel = 11;
          padding = [40, 40, 40, 40];
        }
        
        map.getView().fit(combinedExtent, {
          padding,
          duration: 800,
          maxZoom: zoomLevel,
        });
      }
    } else {
      // Reset to default view when no filter
      if (selectedRegionName) {
        console.log('⚠️ No features found for selected region:', selectedRegionName);
      }
      
      map.getView().animate({
        center: fromLonLat([121.774, 12.8797]),
        zoom: 6,
        duration: 800,
      });
    }

    // Cleanup function to remove event listeners
    return () => {
      if ((map as any)._hoverHandler) {
        map.un('pointermove', (map as any)._hoverHandler);
      }
      if ((map as any)._cursorHandler) {
        map.un('pointermove', (map as any)._cursorHandler);
      }
    };
  }, [selectedRegionCode, selectedProvinceCode, selectedCityCode, isMapInitialized]);

  return (
    <div className={className} style={{ position: 'relative' }}>
      <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden shadow-md" />
      <div
        ref={tooltipRef}
        className={`absolute bg-gradient-to-br from-blue-900 to-blue-800 text-white shadow-2xl rounded-xl border-2 border-blue-400 transition-all duration-200 ${
          tooltipData ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
        }`}
        style={{ padding: '14px 18px', minWidth: '220px' }}
      >
        {tooltipData && (
          <div className="space-y-2">
            <p className="font-bold text-base text-blue-50 border-b border-blue-400 pb-2">{tooltipData.region}</p>
            <div className="flex justify-between items-center">
              <span className="text-blue-200 text-sm">Total Startups:</span>
              <span className="font-bold text-xl text-white bg-blue-700 px-3 py-1 rounded-md">{tooltipData.count}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapWithRegions;
