import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useScript } from '@/hooks/useScript';
import { Popover, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useEffect, useRef, useState } from 'react';
import { HiLocationMarker } from 'react-icons/hi';
import Button from '../button/Button';
// import mapStyle from './map-style'
import { useFormContext } from './hooks';
import InputGeolocToPSGC from './InputGeolocToPSGC';
import InputShell from './InputShell';
import Toast from '../toast/Toast';

interface Props {
  geolocName: string;
  valueName: string;
  label: string;
  required?: boolean;
  withPSGC?: boolean;
}

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const parseCenter = (geoloc: string) => {
  try {
    const arr = (geoloc || '').split(',');
    return {
      lat: +(arr[0] || '14.5995').trim(),
      lng: +(arr[1] || '120.9842').trim(),
    };
  } catch (err) {
    return { lat: 14.5995, lng: 120.9842 };
  }
};

const transformCenter = (location: any) => {
  try {
    return `${location.lat()},${location.lng()}`;
  } catch (err) {
    return null;
  }
};

let lastZoom = 13;

const Maps = ({
  name,
  setRef,
  defaultCenter,
  onSetFieldValue,
}: {
  name: string;
  setRef: any;
  defaultCenter: string;
  onSetFieldValue: any;
}) => {
  const mapRef = useRef<any>(null);
  const userFirstAction = useRef(false);
  useEffect(() => {
    // eslint-disable-next-line no-undef
    const g = window.google;
    const map = new g.maps.Map(mapRef.current, {
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      zoom: lastZoom,
      center: parseCenter(defaultCenter),
      zoomControl: true,
      zoomControlOptions: {
        position: g.maps.ControlPosition.RIGHT_TOP,
      },
      fullscreenControl: true,
    });
    // const styledMapType = new g.maps.StyledMapType(mapStyle, {
    //   name: 'Custom'
    // })
    // map.mapTypes.set('styled_map', styledMapType)
    // map.setMapTypeId('styled_map')

    let isDragging = false;
    g.maps.event.addListener(map, 'zoom_changed', () => {
      lastZoom = map.getZoom();
    });
    g.maps.event.addListener(map, 'idle', () => {
      if (!isDragging) {
        // do what you want to
        if (typeof onSetFieldValue === 'function') {
          onSetFieldValue(name, transformCenter(map.getCenter()));
        }
      }
    });
    g.maps.event.addListener(map, 'dragstart', () => {
      userFirstAction.current = true;
      isDragging = true;
    });
    g.maps.event.addListener(map, 'dragend', () => {
      isDragging = false;
      g.maps.event.trigger(this, 'idle', {});
    });

    if (navigator.geolocation && !defaultCenter) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (userFirstAction.current) return;
        const initialLocation = new g.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        map.setCenter(initialLocation);
      });
    }

    setRef(map);
    // eslint-disable-next-line
  }, [name, onSetFieldValue]);
  return (
    <div className='bg-white border rounded-lg mt-[-23px] p-3 relative translate-y-[calc(-100%+-38px)] h-[50svh]'>
      <div className='relative'>
        <div ref={mapRef} className='absolute inset-0 h-[46.7svh] w-full' />
      </div>
      <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-100%]'>
        <HiLocationMarker className='h-10 w-10 text-primary-500' />
      </div>
    </div>
  );
};

function InputAddress({ geolocName, valueName, label, required, withPSGC }: Props) {
  const { values, setFieldValue, errors } = useFormContext();
  const error = errors?.[geolocName] as string;

  const inputRef = useRef<HTMLInputElement>(null);
  const mapRef = useRef<any>(null);

  const [isLoaded] = useScript(
    'google-api-script',
    `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places&region=ph`
  );

  useEffect(() => {
    if (!isLoaded) return;
    try {
      const g = window.google;

      const autocomplete = new g.maps.places.Autocomplete(inputRef.current, {
        types: ['geocode', 'establishment'],
        componentRestrictions: { country: 'ph' },
      });
      autocomplete.addListener('place_changed', () => {
        try {
          const place = autocomplete.getPlace();
          const address = inputRef?.current?.value;
          setFieldValue(valueName, address);
          setFieldValue(geolocName, transformCenter(place.geometry.location));
          mapRef.current.fitBounds(place.geometry.viewport);
          mapRef.current.setCenter(place.geometry.location);
        } catch (err) {
          Toast.warning('Unable to get place!');
        }
      });
      inputRef?.current?.setAttribute('placeholder', 'Enter Address...');
    } catch (err) {
      // DO NOTHING
    }
  }, [isLoaded, setFieldValue, valueName, geolocName]);

  const [show, setShow] = useState(false);
  const myRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(myRef, setShow, 'pac-container pac-logo');
  const handleSetRef = (ref: any) => {
    mapRef.current = ref;
  };
  const handleSetValue = () => {
    setFieldValue(valueName, inputRef?.current?.value);
    setFieldValue(geolocName, sessionStorage.getItem('address_geoloc') || null);
  };

  const note = `Coordinates: ${values[geolocName] || 'n/a'}`;
  return (
    <Popover>
      <div ref={myRef} className='relative w-full'>
        <InputShell
          label={label}
          note={error ?? note}
          optional={withPSGC ? <InputGeolocToPSGC geolocName={geolocName} /> : undefined}
          // optional={!required}
          error={error}
          trailing={
            <>
              {show ? (
                <div className='translate-x-1.5'>
                  <Button size='xs' onClick={() => setShow(false)}>
                    Done
                  </Button>
                </div>
              ) : (
                <div className='pt-0.5'>
                  <HiLocationMarker className='h-5 w-5 text-muted' />
                </div>
              )}
            </>
          }
        >
          <input
            ref={inputRef}
            className={clsx(
              'form-input w-full h-10 rounded',
              'text-sm leading-4',
              'placeholder:text-placeholder focus:ring-outline-active focus:ring-2 focus:border-transparent',
              'disabled:bg-fill-disabled disabled:text-disabled',
              error
                ? 'text-danger bg-danger-light border-danger'
                : 'border-outline focus:bg-primary-light focus:border-primary-base',
              'pr-16'
            )}
            type='text'
            title={label}
            required={required}
            onBlur={handleSetValue}
            onFocus={() => setShow(true)}
            defaultValue={values[valueName] ?? ''}
          />
        </InputShell>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0 translate-y-1'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-0 -translate-y-1'
          show={show && isLoaded}
        >
          <Popover.Panel static className='absolute z-10 inset-x-0 transform shadow-lg h-0'>
            <Maps
              setRef={handleSetRef}
              defaultCenter={values?.[geolocName]}
              name={geolocName}
              onSetFieldValue={setFieldValue}
            />
          </Popover.Panel>
        </Transition>
      </div>
    </Popover>
  );
}

export default InputAddress;
