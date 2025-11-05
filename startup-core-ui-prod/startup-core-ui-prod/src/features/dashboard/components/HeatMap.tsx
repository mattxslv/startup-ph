import { Button, Card } from 'ui/components';
import StartupDetailsPanel from './StartupDetailsPanel';
import { Form, useFormContext } from 'ui/forms';
import Map from './Map';
import InputAddressOptions from './InputAddressOptions';
import { useState } from 'react';

const HeatMap = () => {
  return (
    <Card>
      <Form initialValues={{}} onSubmit={() => {}} className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
          <p className="font-bold text-lg text-gray-800">Startup Distribution Map</p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-3">
          <HeatMapForm />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px]">
          <div className="w-full lg:w-[65%] h-[500px] lg:h-full bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-2 shadow-inner">
            <Map />
          </div>

          <div className="w-full lg:w-[35%]">
            <StartupDetailsPanel />
          </div>
        </div>
      </Form>
    </Card>
  );
};

export default HeatMap;

const HeatMapForm = () => {
  const { values, setValues } = useFormContext();
  const [prevValues, setPrevValues] = useState<any | null>(null);
  const isCleared = !values.region_code && !values.province_code && !values.municipality_code;

  return (
    <>
      <InputAddressOptions
        type="regions"
        name="region_code"
        placeholder="All Regions"
        FILTER={{ per_page: 1000 }}
      />
      <InputAddressOptions
        type="provinces"
        name="province_code"
        placeholder="All Provinces"
        isDisabled={!values.region_code}
        FILTER={{ per_page: 1000, region_code: values.region_code || '' }}
      />
      <InputAddressOptions
        type="municipalities"
        name="municipality_code"
        placeholder="All Cities/Municipalities"
        isDisabled={!values.province_code}
        FILTER={{
          per_page: 1000,
          province_code: values.province_code || '',
        }}
      />

      <Button
        variant="primary"
        className="w-40"
        onClick={() => {
          if (isCleared && prevValues) {
            setValues(prevValues);
            setPrevValues(null);
          } else {
            setPrevValues(values);
            setValues({});
          }
        }}
      >
        {isCleared ? 'Clear' : 'Clear'}
      </Button>
    </>
  );
};
