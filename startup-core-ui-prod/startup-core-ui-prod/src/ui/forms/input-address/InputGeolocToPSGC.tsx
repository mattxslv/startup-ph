import React, { useEffect, useState } from 'react';
import { useFormContext } from '../hooks';

interface Props {
  geolocName: string;
}

const regexLat = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
const regexLon = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;

function isGeolocValid(lat: number, lon: number) {
  const validLat = regexLat.test(`${lat}`);
  const validLon = regexLon.test(`${lon}`);
  return validLat && validLon;
}

const psgcTrim = (str: string) => str.slice(2);

function InputGeolocToPSGC({ geolocName }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [label, setLabel] = useState('');
  const { values, setFieldValue } = useFormContext();
  const geoloc = values[geolocName];
  useEffect(() => {
    const [lat, lon] = (geoloc ?? '').split(',');
    if (!lat || !lon) return;
    setIsLoading(true);
    setLabel('');
    if (isGeolocValid(+lat.trim(), +lon.trim())) {
      (async () => {
        try {
          const raw = await fetch(
            `https://ph-geo-map.e.gov.ph/get-address-codes/?geoloc=${geoloc}`
          );
          const res = await raw.json();
          const temp =
            res?.codes?.municipality?.ADM3_EN ||
            res?.codes?.province?.ADM2_EN ||
            res?.codes?.region?.ADM1_EN;
          setLabel(temp);
          setFieldValue(
            'region_code',
            psgcTrim(res?.codes?.region?.ADM1_PCODE || '')
          );
          setFieldValue(
            'province_code',
            psgcTrim(res?.codes?.province?.ADM2_PCODE || '')
          );
          setFieldValue(
            'municipality_code',
            psgcTrim(res?.codes?.municipality?.ADM3_PCODE || '')
          );
          setFieldValue(
            'barangay_code',
            psgcTrim(res?.codes?.barangay?.ADM4_PCODE || '')
          );
          setIsLoading(false);
        } catch (err) {
          setFieldValue('region_code', '');
          setFieldValue('province_code', '');
          setFieldValue('municipality_code', '');
          setFieldValue('barangay_code', '');
          setIsLoading(false);
        }
      })();
    }
    // eslint-disable-next-line
  }, [geoloc]);
  return <div>{isLoading ? 'Loading...' : label}</div>;
}

export default InputGeolocToPSGC;
