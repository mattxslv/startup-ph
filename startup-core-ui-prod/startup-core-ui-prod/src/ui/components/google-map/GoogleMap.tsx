import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
  zoom?: number;
  scrollWheelZoom?: boolean;
  defaultCenter?: LatLngTuple;
  children?: React.ReactNode;
}

const OpenLayerMap = ({
  className,
  zoom = 6,
  scrollWheelZoom = true,
  defaultCenter = [12.8797, 121.774], // PH default center,
  children,
}: Props) => {
  return (
    <MapContainer
      center={defaultCenter}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      className={twMerge(className, 'w-full h-full z-0')}
      attributionControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
      />
      {children}
    </MapContainer>
  );
};

export default OpenLayerMap;
