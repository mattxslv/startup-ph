import { Button, Card } from 'ui/components';
import RegionsTable from './RegionsTable';
import { Form, useFormContext } from 'ui/forms';
import { InputDatasetCommonOptions } from 'features/cms-dataset';
import Map from './Map';
import InputAddressOptions from './InputAddressOptions';

const HeatMap = () => {
  return (
    <Card>
      <Form initialValues={{}} onSubmit={() => {}} className="space-y-3">
        <p className="font-semibold text-sm">Startups</p>

        <div className="flex flex-col md:flex-row items-stretch gap-3">
          <HeatMapForm />
        </div>

        <div className="flex flex-col lg:flex-row gap-3 h-auto lg:h-[600px]">
          <div className="w-full lg:w-[65%] h-[500px] lg:h-full">
            <Map />
          </div>

          <div className="w-full lg:w-[35%]">
            <RegionsTable />
          </div>
        </div>
      </Form>
    </Card>
  );
};

export default HeatMap;

const HeatMapForm = () => {
  const { values, setValues } = useFormContext();

  return (
    <>
      <InputAddressOptions
        type="regions"
        name="region_code"
        placeholder="Search Region"
        FILTER={{ per_page: 1000 }}
      />
      <InputAddressOptions
        type="provinces"
        name="province_code"
        placeholder="Search State/Province"
        isDisabled={!values.region_code}
        FILTER={{ per_page: 1000, region_code: values.region_code || '' }}
      />
      <InputAddressOptions
        type="municipalities"
        name="municipality_code"
        placeholder="City/Municipality"
        isDisabled={!values.province_code}
        FILTER={{
          per_page: 1000,
          province_code: values.province_code || '',
        }}
      />
      <InputDatasetCommonOptions
        code="sector"
        name="sector"
        placeholder="Sector"
      />

      <Button variant="primary" className="w-32" onClick={() => setValues({})}>
        Clear
      </Button>
    </>
  );
};
