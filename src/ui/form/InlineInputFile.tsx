import { HiCamera, HiCheckCircle, HiTrash } from 'react-icons/hi';
import clsx from 'clsx';
import { useMemo, useRef } from 'react';
import { CgSpinner } from 'react-icons/cg';
import { useFormContext } from './hooks';
import useFileUploader from '@/hooks/useFileUploader';
import InputShell from './InputShell';
import Button from '../button/Button';

interface Props {
  onChange: (newValue: string) => void,
  value?: string,
  label: string,
  note?: string | React.ReactNode,
  error?: any,
}

function InlineInputFile({
  label,
  note,
  onChange,
  value,
  error,
}: Props) {
  const myInput = useRef<HTMLInputElement>(null);
  const [uploader, progress] = useFileUploader()
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const file = target.files?.[0]
    if (!file) return;
    uploader.mutate({ payload: { file } }, {
      onSuccess: (fileUrl: string, x, y) => {
        onChange(fileUrl);
      },
      onError: () => {
        const el = document.getElementById(`input-${name}`) as HTMLInputElement
        if (el) el.value = ''
      }
    })
  }
  const renderDisplay = useMemo(() => {
    if (typeof progress === 'number') return <span className="text-muted text-sm flex items-center space-x-2 animate-pulse"><CgSpinner className="h-5 w-5 text-primary-base animate-spin" /><span className={clsx(value ? '' : 'hidden ', "lg:inline-block")}>Uploading...</span></span>
    if (value) {
      return <span className="text-muted text-sm flex items-center w-full">
        <HiCamera className="h-5 w-5 text-primary-base mr-2" />
        {/* <img className="h-8 w-8 object-center object-cover bg-slate-100 mr-2" src={value} alt="" /> */}
        <span className={clsx(value ? '' : 'hidden ', "lg:inline-block", 'mr-2 text-primary-base')}>File Uploaded</span>
        <div>
          <a href="#" onClick={(e) => {
            e.preventDefault();
            onChange('');
          }}>
            <HiTrash className="h-5 w-5 text-danger" />
          </a>
        </div>
        <HiCheckCircle className="text-success h-5 w-5 ml-auto" />
      </span>
    }
    return <span className="text-muted text-sm flex items-center space-x-2"><HiCamera className="h-5 w-5" /><span className={clsx(value ? '' : 'hidden ', "lg:inline-block")}>No file selected</span></span>;
    // eslint-disable-next-line
  }, [value, progress]);
  const handleUpload = () => {
    myInput.current!.click();
  }
  return (
    <InputShell label={label} note={error ?? note} error={error}>
      <div className={clsx(
        "form-input h-10 rounded flex items-center",
        Boolean(error) ? 'text-danger bg-danger-light border-danger' : 'border-outline focus:bg-primary-light focus:border-primary-base',
      )}>
        {renderDisplay}
        {value ? null : (
          <div className="ml-auto space-x-1">
            <Button className="px-4" variant="outline" size="xs" disabled={typeof progress === 'number'} onClick={handleUpload}>Upload</Button>
          </div>
        )}
        <input
          ref={myInput}
          key={typeof value === 'string' ? value : '-'}
          id={`input-${name}`}
          className={clsx(
            'absolute h-0 w-0 opacity-0 pointer-events-none',
          )}
          type="file"
          title={typeof label === 'string' ? label : ''}
          onChange={handleChange}
          accept="image/*"
        />
      </div>
    </InputShell>
  );
}

export default InlineInputFile