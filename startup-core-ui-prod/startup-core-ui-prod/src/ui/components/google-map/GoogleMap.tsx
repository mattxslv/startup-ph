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

const GoogleMap = ({
  className,
  zoom = 5,
  scrollWheelZoom = false,
  defaultCenter = [12.8797, 121.774], // PH default center,
  children,
}: Props) => {
  return (
    <MapContainer
      center={defaultCenter}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      className={twMerge(className, 'w-full h-full z-0')}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

export default GoogleMap;
