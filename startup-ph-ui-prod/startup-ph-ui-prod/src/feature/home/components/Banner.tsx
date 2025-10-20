import Button from '@/ui/button/Button';
import clsx from 'clsx';
import { HiBell } from 'react-icons/hi';

interface Props {
  isUnverified: boolean;
  isVerifiable: boolean | string | undefined;
  isAlmostComplete: boolean | string | undefined;
  hasFunding: 1 | 0 | null;
  handleUpdate: () => void;
  hasExpiration: boolean;
}

function Banner({
  isUnverified,
  isVerifiable,
  isAlmostComplete,
  hasFunding,
  hasExpiration,
  handleUpdate,
}: Props): JSX.Element {
  if (!isUnverified && (hasFunding === null || !hasExpiration)) {
    return (
      <div className='flex gap-5 items-center justify-between border border-blue-500 bg-blue-50 mt-2 rounded-md p-5'>
        <div className='flex flex-col gap-2 text-sm'>
          <div className='flex items-center gap-1 text-blue-500'>
            <HiBell className='w-4 h-4' />
            <p className='font-bold'>Update Required</p>
          </div>

          <p>
            Some new fields have been added! Please update your funding information, to keep your
            startup details up to date.
          </p>
        </div>

        <Button variant='primary' size='xs' onClick={handleUpdate}>
          Update
        </Button>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'rounded-md p-5 flex flex-col gap-2 border  text-sm mt-2',
        (!isUnverified || isVerifiable) && 'hidden',
        isAlmostComplete ? 'border-green-600 bg-green-50' : 'border-yellow-500 bg-yellow-50'
      )}
    >
      <div
        className={clsx(
          'flex items-center gap-1',
          isAlmostComplete ? 'text-green-600' : 'text-yellow-500'
        )}
      >
        <HiBell className='w-4 h-4' />
        <p className='font-bold'>
          {isAlmostComplete ? 'Almost Complete' : 'Complete your Startup Profile'}
        </p>
      </div>

      <p>
        Complete “My Startup” and “My Portfolio” to be eligible for verification and program
        opportunities.
      </p>
    </div>
  );
}

export default Banner;
