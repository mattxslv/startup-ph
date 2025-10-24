import InputDatasetSelect from '@/feature/dataset/InputDatasetSelect';
import useMyStartup from '@/feature/startup/hooks/useMyStartup';
import { useSaveStartup } from '@/feature/startup/hooks/useStartupMutate';
import { TStartup } from '@/feature/startup/types';
import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';
import InputDateV2 from '@/ui/form/InputDateV2';
import InputFileV2 from '@/ui/form/InputFileV2';
import InputMask from '@/ui/form/InputMask';
import InputYear from '@/ui/form/InputYear';
import formatDate from '@/utils/formatDate';
import React from 'react';
import { HiUpload } from 'react-icons/hi';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  business_name: yup.string().required('Required'),
  founding_year: yup.string().required('Required'),
  tin: yup.string().required('Required'),
  registration_no: yup.string().required('Required'),
  proof_of_registration_url: yup.string().required('Required'),
  business_classification: yup.string().required('Required'),
  business_certificate_expiration_date: yup.string().required('Required'),
});

interface IProps {
  onClose: () => void;
}

const Startup = ({ onClose }: IProps) => {
  const { data } = useMyStartup();
  const mutator = useSaveStartup();

  const handleSubmit = (payload: TStartup) => {
    const formattedPayload = {
      ...payload,
      business_certificate_expiration_date: formatDate(
        payload.business_certificate_expiration_date,
        'YYYY-MM-DD'
      ),
    };
    mutator.mutate({ payload: formattedPayload }, { onSuccess: () => onClose() });
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
          <p className='text-muted text-sm mb-3'>
            This section contains important details about your startup. It is only visible to you
            and will not be shared publicly. Field that has (*) is required to verify your Startup.
          </p>

          <Input name='business_name' label='Registered Business/SEC Name *' required />

          <InputYear
            name='founding_year'
            label='Founding Year *'
            required
            min={new Date(1900, 1, 1)}
            max={new Date()}
          />

          <InputMask
            name='tin'
            label='Taxpayer Identification Number (TIN) *'
            mask='999-999-999-999'
            placeholder='XXX-XXX-XXX-000'
            required
          />

          <InputDatasetSelect
            code='business-classification'
            name='business_classification'
            label='Business Classification *'
            required
          />

          <div className='flex gap-5'>
            <Input
              name='registration_no'
              label='DTI/SEC Registration Number *'
              placeholder='Enter DTI or SEC number'
              note='Please enter your DTI Registration Number or SEC Number. Ensure this matches your proof of registration document.'
              required
            />

            <InputDateV2
              name='business_certificate_expiration_date'
              label='Expiration Date *'
              required
              minDate={new Date()}
            />
          </div>

          <InputFileV2
            accept={[
              'application/pdf',
              'image/png',
              'image/jpg',
              'image/jpeg',
              'application/msword',
              'application/ms-doc',
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ]}
            name='proof_of_registration_url'
            placeholder={
              <div className='flex items-center justify-center w-full text-gray-400 text-xs'>
                <HiUpload className='w-5 h-5 mr-1' />
                Choose file to upload
              </div>
            }
            note='*PDF, JPG, PNG, DOCX (max. 5mb)'
            inputLabel='Upload Proof or Registration/Government Accreditation *'
            className='w-40'
            required
          />

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

export default Startup;
