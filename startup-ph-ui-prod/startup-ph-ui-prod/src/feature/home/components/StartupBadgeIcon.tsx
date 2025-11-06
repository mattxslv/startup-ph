import { TStartup } from '@/feature/startup/types';
import Badge from '@/ui/badge/Badge';
import { HiEye, HiCheckCircle } from 'react-icons/hi';
import { showAssessmentModal } from './AssessmentModal';

function StartupBadgeAction({
  data,
}: // onClickUnverified,
{
  data: TStartup;
  // onClickUnverified: () => void;
}) {
  // if (data.status === 'UNVERIFIED')
  //   return (
  //     <a
  //       className='cursor-pointer'
  //       onClick={(e) => {
  //         e.preventDefault();
  //         onClickUnverified();
  //       }}
  //     >
  //       <Badge className='-translate-y-0.5'>Unverified</Badge>
  //     </a>
  //   );
  if (data.status?.toUpperCase() === 'FOR VERIFICATION')
    return (
      <Badge className='-translate-y-0.5' variant='warning'>
        In Review
      </Badge>
    );
  if (data.status?.toUpperCase() === 'FOR RESUBMISSION')
    return (
      <button type='button' onClick={() => showAssessmentModal(data.assessment_tags, data.remarks)}>
        <Badge className='-translate-y-0.5 cursor-pointer' variant='danger'>
          Flagged Application <HiEye className='inline -mt-0.5' />
        </Badge>
      </button>
    );
  if (data.status?.toUpperCase() === 'VERIFIED')
    return (
      <div className='inline-flex text-success'>
        <HiCheckCircle className='translate-y-0.5' />
        <div className='text-sm font-semibold'>Verified</div>
      </div>
    );
  return null;
}

export default StartupBadgeAction;
