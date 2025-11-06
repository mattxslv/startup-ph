import Button from '@/ui/button/Button';
import clsx from 'clsx';
import { HiBell, HiInformationCircle } from 'react-icons/hi';
import { showVerifyModal } from './verify';

interface Props {
  isUnverified: boolean;
  isVerifiable: boolean | string | undefined;
  isAlmostComplete: boolean | string | undefined;
  hasFunding: 1 | 0 | null;
  handleUpdate: () => void;
  hasExpiration: boolean;
  status?: string;
}

function Banner({
  isUnverified,
  isVerifiable,
  isAlmostComplete,
  hasFunding,
  hasExpiration,
  handleUpdate,
  status,
}: Props): JSX.Element {
  if (!isUnverified && status !== 'FOR VERIFICATION' && (hasFunding === null || !hasExpiration)) {
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

  // Determine if profile is ready for verification submission
  const isReadyForSubmission = isAlmostComplete && isVerifiable && status === 'UNVERIFIED';
  
  return (
    <div
      className={clsx(
        'rounded-lg p-5 flex flex-col gap-4 border text-sm mt-2 shadow-sm',
        (!isUnverified || isVerifiable || status === 'FOR VERIFICATION') && 'hidden',
        isReadyForSubmission 
          ? 'border-blue-500 bg-blue-50' 
          : isAlmostComplete 
          ? 'border-green-600 bg-green-50' 
          : 'border-yellow-500 bg-yellow-50'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <div
            className={clsx(
              'flex items-center gap-2',
              isReadyForSubmission 
                ? 'text-blue-600' 
                : isAlmostComplete 
                ? 'text-green-600' 
                : 'text-yellow-500'
            )}
          >
            <HiBell className='w-5 h-5' />
            <p className='font-bold text-base'>
              {isReadyForSubmission 
                ? 'Get Verified Now!' 
                : isAlmostComplete 
                ? 'Profile Nearly Complete' 
                : 'Complete Your Profile'}
            </p>
          </div>

          <p className="text-gray-700 leading-relaxed">
            {isReadyForSubmission 
              ? 'Your profile is complete! You can now submit for verification to access program opportunities and benefits.'
              : 'Complete your startup profile and portfolio to unlock verification eligibility and program opportunities.'
            }
          </p>
        </div>

        {isReadyForSubmission && (
          <Button
            onClick={showVerifyModal}
            variant="primary"
            size="sm"
            leading={<HiInformationCircle />}
          >
            Get Verified Now
          </Button>
        )}
      </div>
    </div>
  );
}

export default Banner;
