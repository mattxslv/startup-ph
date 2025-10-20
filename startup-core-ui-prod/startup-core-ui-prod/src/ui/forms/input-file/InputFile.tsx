import clsx from 'clsx';
import React from 'react';
import { CgSpinner } from 'react-icons/cg';
import { HiCheckCircle } from 'react-icons/hi';
import useFileUploader from 'hooks/useFileUploader';
import InputShell from '../input-shell/InputShell';
import { useFormContext } from '../hooks';
import formatNumber from 'utils/formatNumber';

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  name: string;
  label?: string;
  note?: string;
  mode?: 'default' | 'url';
}

function InputFile({ name, label, required, note, mode, ...rest }: Props) {
  const { values, setFieldValue, errors } = useFormContext();
  const [uploader, progress] = useFileUploader();
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0];
    if (mode === 'url') {
      uploader.mutate(
        { payload: { file } },
        {
          onSuccess: (fileUrl: string, x, y) => {
            setFieldValue(name, fileUrl);
          },
          onError: () => {
            const el = document.getElementById(
              `input-${name}`
            ) as HTMLInputElement;
            if (el) el.value = '';
          },
        }
      );
      return;
    }
    setFieldValue(name, file);
  };
  const error = errors?.[name] as string;
  const renderTrailing = () => {
    if (mode === 'default') return undefined;
    if (typeof progress === 'number') {
      return (
        <div className="flex items-center mt-1.5 space-x-1">
          <CgSpinner className="animate-spin" />
          <span className="text-xs text-placeholder">
            Uploading ({formatNumber(progress, 1)}%)...
          </span>
        </div>
      );
    }
    if (values?.[name]) {
      return (
        <div className="flex items-center mt-1.5">
          <HiCheckCircle className="text-success-base" />
        </div>
      );
    }
    return undefined;
  };
  return (
    <InputShell
      label={label}
      note={error ?? note}
      optional={!required}
      error={error}
      trailing={renderTrailing()}
    >
      <input
        id={`input-${name}`}
        className={clsx(
          'form-input w-full h-10 rounded',
          'text-sm leading-4',
          'placeholder:text-placeholder focus:ring-outline-active focus:ring-2 focus:border-transparent',
          'disabled:bg-fill-disabled disabled:text-disabled',
          error
            ? 'text-danger-base bg-danger-light border-danger-base'
            : 'border-outline focus:bg-primary-light focus:border-primary-base',
          typeof progress === 'number' ? 'pr-40' : 'pr-10'
        )}
        type="file"
        title={label}
        required={required}
        onChange={handleChange}
        // value={values?.[name]?.name ?? ''}
        {...rest}
      />
    </InputShell>
  );
}

InputFile.defaultProps = {
  mode: 'default',
};

export default InputFile;
