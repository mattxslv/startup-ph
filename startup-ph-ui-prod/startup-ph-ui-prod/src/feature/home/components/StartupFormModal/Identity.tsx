import { showStartupDevelopmentModal } from '@/components/my-startup/StartupDevelopmentModal';
import InputDatasetSelect from '@/feature/dataset/InputDatasetSelect';
import InputDatasetTags from '@/feature/dataset/InputDatasetTags';
import useMyStartup from '@/feature/startup/hooks/useMyStartup';
import { useSaveStartup } from '@/feature/startup/hooks/useStartupMutate';
import { TStartup } from '@/feature/startup/types';
import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';
import InputTextArea from '@/ui/form/InputTextArea';
import LogoUploader from '@/ui/file-uploader/LogoUploader';
import React from 'react';
import { HiInformationCircle } from 'react-icons/hi';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  logo_url: yup.string().required('Required'),
  name: yup.string().required('Required'),
  sectors: yup.array().of(yup.string()).min(1, 'Select at least one sector').required('Required'),
});

interface IProps {
  onClose: () => void;
}

const Identity = ({ onClose }: IProps) => {
  const { data } = useMyStartup();
  const mutator = useSaveStartup();

  const handleSubmit = (payload: TStartup) => {
    mutator.mutate({ payload }, { onSuccess: () => onClose() });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={data}
      validationSchema={validationSchema}
      className='flex flex-col gap-5'
    >
      {({ dirty, values, setFieldValue }) => (
        <>
          <div className='flex justify-center pb-4'>
            <LogoUploader
              value={values?.logo_url}
              onChange={(url) => setFieldValue('logo_url', url)}
              maxFileSize={52428800}
            />
          </div>

          <div className='flex flex-col gap-5'>
            <Input name='name' label='Startup Name' required />
            
            <Input 
              name='business_name' 
              label='Corporation/Business Name (Legal Entity)' 
              placeholder='Enter official DTI/SEC registered name'
              note='Enter the official corporation or business name as registered with DTI/SEC if different from your startup name'
            />

            <InputDatasetTags code='sector' name='sectors' label='Startup Sector' required />

            <InputDatasetSelect
              code='development-phase'
              name='development_phase'
              label={
                <div className='flex items-center gap-1'>
                  <p>Startup Development Phase</p>
                  <button type='button' onClick={() => showStartupDevelopmentModal()}>
                    <HiInformationCircle className='text-primary h-4 w-4' />
                  </button>
                </div>
              }
              fallbackOptions={[
                { label: 'Ideation Stage', value: 'Ideation Stage' },
                { label: 'Validation Stage', value: 'Validation Stage' },
                { label: 'Early Stage', value: 'Early Stage' },
                { label: 'Growth Stage', value: 'Growth Stage' },
                { label: 'Expansion Stage', value: 'Expansion Stage' },
                { label: 'Maturity Stage', value: 'Maturity Stage' }
              ]}
            />

            <Input
              name='short_description'
              label='Short Description or Startup One-liner'
              note='Indicate the problem that your startup is trying to solve and your startup’s solution to the program.'
              maxLength={250}
              showCounter
            />

            <InputTextArea name='description' label='Description' />
          </div>

          <div className='flex items-center justify-end gap-4 mt-5'>
            <Button variant='link' onClick={onClose} disabled={mutator.isLoading}>
              Cancel
            </Button>
            <Button variant='primary' type='submit' disabled={!dirty || mutator.isLoading}>
              {mutator.isLoading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};

export default Identity;
