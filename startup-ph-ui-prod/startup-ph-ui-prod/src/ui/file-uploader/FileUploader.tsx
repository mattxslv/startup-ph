import clsx from 'clsx';
import Uploader from 'egov-upload-widget/file';
import 'egov-upload-widget/styles';
import { ReactNode } from 'react';

interface Props {
  className?: string;
  disabled?: boolean;
  placeholder?: ReactNode | JSX.Element;
  accept?: Array<string>;
  maxFileSize?: number;
  file?: any;
  onChange?: (e: any) => void;
  handleDelete?: () => void;
  customRender?: ReactNode | JSX.Element;
  options?: Array<'file' | 'camera'>;
}

const FileUploader = ({
  className,
  disabled,
  placeholder,
  accept,
  maxFileSize = 5242880, // Default 5mb
  file,
  onChange,
  handleDelete,
  customRender,
  options = ['file'],
}: Props) => {
  return (
    <div className={clsx('App', className ? className : '')}>
      <Uploader
        options={options}
        disabled={disabled}
        apiKey={process.env.NEXT_PUBLIC_UPLOADER_API_KEY}
        environment={process.env.NEXT_PUBLIC_UPLOADER_ENVIRONMENT}
        project={process.env.NEXT_PUBLIC_UPLOADER_PROJECT}
        value={file}
        maxFileSize={maxFileSize}
        onChange={onChange}
        onDelete={handleDelete}
        fileTypes={accept || null}
        customRender={customRender}
      >
        {placeholder}
      </Uploader>
    </div>
  );
};

export default FileUploader;
