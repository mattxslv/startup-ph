import InputFileV2 from '@/ui/form/InputFileV2';
import { HiUpload } from 'react-icons/hi';
import { TProgram } from './hooks/useProgram';
import Input from '@/ui/form/Input';

export function InputRequirement({ data }: { data: TProgram['requirements'][number] }) {
  if (data.type === 'INPUT')
    return <Input name={data.id} label={data.label} required={data.is_required} />;
  if (data.type === 'FILE')
    // return <InputFile name={data.id} label={data.label} required={data.is_required} />;
    return (
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
        name={data.id}
        inputLabel={data.label}
        placeholder={
          <div className='flex items-center justify-center text-gray-400 text-xs w-full'>
            <HiUpload className='w-5 h-5 mr-1 flex-none' />
            Upload File
          </div>
        }
        className='w-32'
        required={data.is_required}
      />
    );
  console.warn('unknown form ', data.type);
  return null;
}
