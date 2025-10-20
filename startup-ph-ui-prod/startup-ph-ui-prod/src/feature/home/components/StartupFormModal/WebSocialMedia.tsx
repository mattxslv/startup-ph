import useMyStartup from '@/feature/startup/hooks/useMyStartup';
import { useSaveStartup } from '@/feature/startup/hooks/useStartupMutate';
import { TStartup } from '@/feature/startup/types';
import Button from '@/ui/button/Button';
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';
import React from 'react';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  social_website_url: yup
    .string()
    .url('Please enter a valid URL')
    .matches(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)/, 'Please enter a valid website URL')
    .nullable(),

  social_instagram_url: yup
    .string()
    .matches(
      /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9_\.]+\/?$/,
      'Please enter a valid Instagram URL'
    )
    .nullable(),

  social_facebook_url: yup
    .string()
    .matches(
      /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9_\-\.]+\/?$/,
      'Please enter a valid Facebook URL'
    )
    .nullable(),

  social_linkedin_url: yup
    .string()
    .matches(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(company\/[a-zA-Z0-9_\-]+|in\/[a-zA-Z0-9_\-]+)\/?$/,
      'Please enter a valid LinkedIn URL'
    )
    .nullable(),
});

interface IProps {
  onClose: () => void;
}

const WebSocialMedia = ({ onClose }: IProps) => {
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
          <Input name='social_website_url' label='Website URL' />
          <Input name='social_instagram_url' label='Instagram URL' />
          <Input name='social_facebook_url' label='Facebook URL' />
          <Input name='social_linkedin_url' label='LinkedIn URL' />

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

export default WebSocialMedia;
