import clsx from 'clsx';
import { useFormContext } from '../hooks';

interface Props {
  name: string;
  value?: string;
}

function ErrorLabel({ name, value }: Props) {
  const context = useFormContext();
  const error = value ?? (context?.errors?.[name] as string);
  if (typeof error !== 'string') return null;
  return (
    <div
      className={clsx(
        'text-xs',
        error ? 'text-danger-base' : 'text-description'
      )}
    >
      {error}
    </div>
  );
}

export default ErrorLabel;
