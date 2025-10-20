import clsx from 'clsx';
import React from 'react';
import { useFormContext } from './hooks';
// import { HiCamera } from 'react-icons/hi';
import Uploader from 'egov-upload-widget/avatar';
import 'egov-upload-widget/styles';

type Props = {
  name: string;
  disabled?: boolean;
  placeholder?: string;
};

function InputPhotoV2({ name, disabled = false, placeholder = 'Logo' }: Props) {
  const { values, setFieldValue, errors } = useFormContext();
  const value = values?.[name] || '';
  const error = errors?.[name] as string;

  const handleChange = (e: any) => {
    const value = e.target?.value?.url || '';
    setFieldValue(name, value);
  };
  return (
    <div className='App'>
      <Uploader
        disabled={disabled}
        apiKey={process.env.NEXT_PUBLIC_UPLOADER_API_KEY}
        environment={process.env.NEXT_PUBLIC_UPLOADER_ENVIRONMENT}
        project={process.env.NEXT_PUBLIC_UPLOADER_PROJECT}
        value={value}
        onChange={handleChange}
        onDelete={() => {
          setFieldValue(name, '');
        }}
      >
        {placeholder}
      </Uploader>
      {typeof error === 'string' ? (
        <div className={clsx('text-xs', error ? 'text-danger' : 'text-muted')}>{error}</div>
      ) : null}
    </div>
  );
}

export default InputPhotoV2;
