import InputRadio from '@/ui/form/InputRadio';
import React, { SyntheticEvent } from 'react';
import { AGENCY_OPTIONS, YES_NO } from '../../constants';
import Accordion, { AccordionGroup } from '@/ui/accordion/Accordion';
import { HiPlus, HiX } from 'react-icons/hi';
import { useFormContext } from '@/ui/form/hooks';
import { isEmpty } from 'lodash';
import { TFunding, TStartup } from '@/feature/startup/types';
import Button from '@/ui/button/Button';
import * as yup from 'yup';
import Form from '@/ui/form/Form';
import useMyStartup from '@/feature/startup/hooks/useMyStartup';
import { useSaveStartup } from '@/feature/startup/hooks/useStartupMutate';
import MultipleFileUploader from '@/ui/file-uploader/MultipleFileUploader';
import Select from '@/ui/select/Select';
import clsx from 'clsx';

interface IProps {
  onClose: () => void;
}

const validationSchema = yup.object().shape({
  has_funding: yup
    .mixed()
    .required('Required')
    .test('is-0-or-1', 'Value must be either 0 or 1', (value) => {
      return value === 0 || value === 1 || value === '0' || value === '1';
    }),
  fundings: yup.array().when('has_funding', {
    is: (val: string | number) => val === 1 || val === '1',
    then: () =>
      yup
        .array()
        .of(
          yup.object().shape({
            agency: yup.string().required('Required'),
            document_urls: yup
              .array()
              .of(yup.string())
              .min(1, 'At least one document is required')
              .required('Required'),
          })
        )
        .min(1, 'At least one funding record is required'),
    otherwise: () => yup.array().nullable(),
  }),
});

const Funding = ({ onClose }: IProps) => {
  const { data } = useMyStartup();
  const mutator = useSaveStartup();

  const initValues = {
    has_funding: data?.has_funding,
    fundings: data?.fundings,
  };

  const handleSubmit = (payload: Partial<TStartup>) => {
    const hasFunding = payload.has_funding;

    const newPayload = {
      ...data,
      ...(hasFunding ? payload : { ...payload, fundings: [] }),
    };

    mutator.mutate({ payload: newPayload }, { onSuccess: () => onClose() });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      initialValues={initValues}
      validationSchema={validationSchema}
      className='flex flex-col gap-5'
    >
      <>
        <p className='text-muted text-sm mb-3'>
          This section contains important details about your startup. It is only visible to you and
          will not be shared publicly.
        </p>

        <FundingForm onClose={onClose} mutator={mutator} />
      </>
    </Form>
  );
};

export default Funding;

const FundingForm = ({ onClose, mutator }: IProps & { mutator: any }) => {
  const { values, setFieldValue, errors, dirty } = useFormContext();
  const fundingList = values['fundings'];
  const hasFunding = values['has_funding'];
  const fundingErrors = errors?.['fundings'] as any;
  const maxFiles = 5;

  const handleAdd = () => {
    const newFunding: TFunding = {
      agency: '',
      document_urls: [],
    };

    fundingList.push(newFunding);
    setFieldValue('fundings', fundingList);
  };

  const handleRemove = (index: number) => {
    const newFundingList = fundingList.filter((_: TFunding, i: number) => i !== index);
    setFieldValue('fundings', newFundingList);
  };

  const handleChange = (e: SyntheticEvent, index: number) => {
    const { name, value } = e.target as HTMLInputElement;
    const updatedFundings = fundingList.map((funding: TFunding, idx: number) =>
      idx === index ? { ...funding, [name]: value } : funding
    );
    setFieldValue('fundings', updatedFundings);
  };

  const handleFilesChange = (urls: string[], index: number) => {
    const currentUrls = fundingList[index]?.document_urls || [];
    const updatedUrls = [...currentUrls, ...urls];
    setFieldValue(`fundings.${index}.document_urls`, updatedUrls);
  };

  const handleFileRemove = (fundingIndex: number, urlIndex: number) => {
    const currentUrls = fundingList[fundingIndex]?.document_urls || [];
    const updatedUrls = currentUrls.filter((_: string, i: number) => i !== urlIndex);
    setFieldValue(`fundings.${fundingIndex}.document_urls`, updatedUrls);
  };

  return (
    <>
      <InputRadio
        name='has_funding'
        options={YES_NO}
        label='Have you received funding from any of the ISA agencies?'
        required
      />

      {!isEmpty(fundingList) && hasFunding ? (
        <AccordionGroup allowMultiple={false}>
          {fundingList.map((funding: TFunding, index: number) => (
            <Accordion
              title={`Fund Granted Information ${index + 1}`}
              id={`fund-${index + 1}`}
              key={`${funding.agency}-${index}`}
              index={index}
              error={
                fundingErrors?.[index]?.['agency'] || fundingErrors?.[index]?.['document_urls']
              }
            >
              <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-1'>
                  <label className='text-muted font-medium'>Agency</label>
                  <Select
                    name='agency'
                    label='Agency'
                    options={AGENCY_OPTIONS}
                    required
                    onChange={(e: SyntheticEvent) => handleChange(e, index)}
                    value={funding.agency}
                    error={fundingErrors?.[index]?.['agency']}
                  />
                  <div
                    className={clsx(
                      'text-xs -translate-y-1 mt-2',
                      fundingErrors?.[index]?.['agency'] ? 'text-danger' : 'text-muted'
                    )}
                  >
                    {fundingErrors?.[index]?.['agency']
                      ? fundingErrors?.[index]?.['agency']
                      : 'Select the agency that provide the fund'}
                  </div>
                </div>

                <div className='flex flex-col gap-1'>
                  <label className='text-muted font-medium'>Proof of Funding</label>
                  <MultipleFileUploader
                    accept={[
                      'application/pdf',
                      'image/png',
                      'image/jpg',
                      'image/jpeg',
                      'application/msword',
                      'application/ms-doc',
                      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    ]}
                    maxSize={50 * 1024 * 1024} // 50MB
                    maxFiles={maxFiles}
                    onUploadComplete={(e) => handleFilesChange(e, index)}
                    value={funding.document_urls}
                    error={fundingErrors?.[index]?.['document_urls']}
                    onFileRemove={(urlIndex) => handleFileRemove(index, urlIndex)}
                    endpoint="/api/v2/upload"
                  />
                </div>
              </div>

              <Button
                variant='link'
                size='sm'
                className='ml-auto text-danger mt-5'
                onClick={() => handleRemove(index)}
              >
                <div className='inline-flex gap-1 items-center'>
                  <HiX /> Delete
                </div>
              </Button>
            </Accordion>
          ))}
        </AccordionGroup>
      ) : fundingErrors ? (
        <div className='text-xs -translate-y-1 mt-2 text-danger'>{fundingErrors}</div>
      ) : null}

      {hasFunding === 1 ? (
        <Button variant='primary' size='sm' className='mr-auto' onClick={handleAdd}>
          <div className='inline-flex gap-1 items-center'>
            <HiPlus /> Add
          </div>
        </Button>
      ) : null}

      <div className='flex items-center justify-end gap-4 mt-5'>
        <Button variant='link' onClick={onClose} disabled={mutator.isLoading}>
          Cancel
        </Button>
        <Button variant='primary' type='submit' disabled={!dirty || mutator.isLoading}>
          {mutator.isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </>
  );
};
