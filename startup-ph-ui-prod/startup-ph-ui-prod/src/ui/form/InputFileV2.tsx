import InputShell from '@/ui/form/InputShell';
import React, { ReactNode, useEffect, useState } from 'react';
import { useFormContext } from '@/ui/form/hooks';
import { ErrorMessage, Field } from 'formik';
import clsx from 'clsx';
import FormError from './FormError';
import GCSFileUploader from '@/ui/file-uploader/GCSFileUploader';
import Toast from '../toast/Toast';

type TFile = {
  name: string;
  url: string;
};

type Props = {
  inputLabel?: string;
  accept?: Array<string>;
  placeholder?: string | ReactNode;
  name: string;
  note?: string;
  disabled?: boolean;
  className?: string;
  maxFileSize?: number;
  onUploadSuccess?: () => void;
  required?: boolean;
  customRender?: ReactNode | JSX.Element;
  options?: Array<'file' | 'camera'>;
  imageOnly?: boolean;
};

function InputFileV2({
  inputLabel,
  placeholder,
  accept,
  name,
  note,
  disabled,
  className,
  maxFileSize = 52428800, // Default 50mb
  onUploadSuccess,
  required,
  customRender,
  options = ['file'],
  imageOnly,
}: Props) {
  const { values, setFieldValue, errors } = useFormContext();
  const value = values?.[name] as string;
  const error = errors?.[name] as string;
  // const [file, setFile] = useState<any>(null);

  // useEffect(() => {
  //   if (value) {
  //     setFile({ url: value });
  //   }
  // }, []);

  const handleChange = (e: any) => {
    if (!e?.target?.value?.url) {
      Toast.error('Invalid file type');
      return;
    }
    const { url, file_name, mime_type } = e.target.value;
    setFieldValue(name, url);
    // setFile({ url, mime_type, file_name });
    typeof onUploadSuccess === 'function' && Boolean(url) && onUploadSuccess();
  };

  const handleDelete = () => {
    setFieldValue(name, null);
    // setFile(null);
  };

  return (
    <InputShell label={inputLabel} note={error ?? note} error={error} optional={!required}>
      <GCSFileUploader
        options={options}
        className={className}
        disabled={disabled}
        file={value ? { url: value } : null}
        maxFileSize={maxFileSize}
        onChange={handleChange}
        handleDelete={handleDelete}
        accept={imageOnly ? ['image/png', 'image/jpeg', 'image/jpg'] : accept}
        customRender={customRender}
        placeholder={placeholder}
      />
    </InputShell>
  );
};

export default InputFileV2;
