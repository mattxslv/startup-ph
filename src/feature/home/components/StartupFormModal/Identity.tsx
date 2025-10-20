import { showStartupDevelopmentModal } from '@/components/my-startup/StartupDevelopmentModal';
import InputDatasetSelect from '@/feature/dataset/InputDatasetSelect';
import InputDatasetTags from '@/feature/dataset/InputDatasetTags';
import useMyStartup from '@/feature/startup/hooks/useMyStartup';
import { useSaveStartup } from '@/feature/startup/hooks/useStartupMutate';
import { TStartup } from '@/feature/startup/types';
import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';
import InputFileV2 from '@/ui/form/InputFileV2';
import InputTextArea from '@/ui/form/InputTextArea';
import React from 'react';
import { HiInformationCircle, HiUpload } from 'react-icons/hi';
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
      {({ dirty }) => (
        <>
          <div className='flex justify-center pb-4'>
            <InputFileV2
              name='logo_url'
              placeholder={
                <div className='flex items-center justify-center w-full text-gray-400 text-xs'>
                  <HiUpload className='w-5 h-5 mr-1' />
                  Select Logo
                </div>
              }
              className='w-32 mx-auto'
              imageOnly
              required
            />
          </div>

          <div className='flex flex-col gap-5'>
            <Input name='name' label='Startup Name' required />

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
            <Button variant='link' onClick={onClose}>
              Cancel
            </Button>
            <Button variant='primary' type='submit' disabled={!dirty}>
              Save
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};

export default Identity;
