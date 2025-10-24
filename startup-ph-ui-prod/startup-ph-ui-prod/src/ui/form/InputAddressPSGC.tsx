import InputSelect from './InputSelect';
import Input from './Input';
import useAddressList from '@/hooks/useAddressList';
import { useFormContext } from './hooks';
import { useEffect, useMemo } from 'react';

const filter = {
  per_page: 10000,
  order_by: 'name',
  sort: 'asc',
};

const InputAddressPSGC = () => {
  const { values, setFieldValue } = useFormContext();
  
  const regionCode = values['region_code'];
  const provinceCode = values['province_code'];
  const municipalityCode = values['municipality_code'];
  
  const { data: regions } = useAddressList('regions', filter);
  const { data: provinces } = useAddressList('provinces', {
    region_code: regionCode,
    ...filter,
  });
  const { data: municipalities } = useAddressList('municipalities', {
    province_code: provinceCode,
    ...filter,
  });
  const { data: barangays } = useAddressList('barangays', {
    municipality_code: municipalityCode,
    ...filter,
  });

  const provincesList = useMemo(() => provinces?.list || [], [provinces?.list]);
  const municipalitiesList = useMemo(() => municipalities?.list || [], [municipalities?.list]);

  // Watch for province changes and validate it belongs to the selected region
  useEffect(() => {
    if (provinceCode && regionCode && provincesList.length > 0) {
      const selectedProvince = provincesList.find(p => p.code === provinceCode);
      // If the selected province is not in the current region's list, clear it
      if (!selectedProvince) {
        setFieldValue('province_code', '');
        setFieldValue('municipality_code', '');
        setFieldValue('barangay_code', '');
      }
    }
  }, [regionCode, provincesList, provinceCode, setFieldValue]);

  // Watch for municipality changes and validate it belongs to the selected province
  useEffect(() => {
    if (municipalityCode && provinceCode && municipalitiesList.length > 0) {
      const selectedMunicipality = municipalitiesList.find(m => m.code === municipalityCode);
      // If the selected municipality is not in the current province's list, clear it
      if (!selectedMunicipality) {
        setFieldValue('municipality_code', '');
        setFieldValue('barangay_code', '');
      }
    }
  }, [provinceCode, municipalitiesList, municipalityCode, setFieldValue]);

  const clearValue = (changedField: string) => {
    switch (changedField) {
      case 'region_code':
        setFieldValue('province_code', '');
        setFieldValue('municipality_code', '');
        setFieldValue('barangay_code', '');
        break;
      case 'province_code':
        setFieldValue('municipality_code', '');
        setFieldValue('barangay_code', '');
        break;
      case 'municipality_code':
        setFieldValue('barangay_code', '');
        break;
      default:
        break;
    }
  };
  return (
    <div className='flex flex-col gap-1'>
      <InputSelect
        label='Region'
        name='region_code'
        placeholder='Region'
        options={regions?.list?.map((i) => ({ label: i.name, value: i.code })) || []}
        required
        cb={clearValue}
      />
      <InputSelect
        label='State/Province'
        name='province_code'
        placeholder='State/Province'
        options={provinces?.list?.map((i) => ({ label: i.name, value: i.code })) || []}
        disabled={!values['region_code']}
        required
        cb={clearValue}
      />
      <InputSelect
        label='City/Municipality'
        name='municipality_code'
        placeholder='City/Municipality'
        options={municipalities?.list?.map((i) => ({ label: i.name, value: i.code })) || []}
        disabled={!values['province_code']}
        required
        cb={clearValue}
      />
      <InputSelect
        label='Barangay'
        name='barangay_code'
        placeholder='Barangay'
        options={barangays?.list?.map((i) => ({ label: i.name, value: i.code })) || []}
        disabled={!values['municipality_code']}
        required
      />
      <Input
        name='street'
        label='House No./Bldg./Street Name'
        placeholder='House No./Bldg./Street Name'
        required
      />
      <Input label='Address Line 2' name='street_two' placeholder='Address Line 2 (Optional)' />
      <Input label='Postal Code' name='postal_code' placeholder='Postal Code (Optional)' />
    </div>
  );
};

export default InputAddressPSGC;
