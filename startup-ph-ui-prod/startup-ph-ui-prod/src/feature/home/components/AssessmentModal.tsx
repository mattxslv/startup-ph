import React from 'react';
import { TAssessmentTags } from '@/feature/startup/types';
import Button from '@/ui/button/Button';
import { showModal } from '@/components/modal';
import { HiInformationCircle } from 'react-icons/hi';
import Link from 'next/link';

export const showAssessmentModal = (assessmentTags: TAssessmentTags[], remarks?: string) => {
  showModal({
    id: 'assessment-modal',
    title: 'Flagged Application for correction',
    // size: 'lg',
    component: AssessmentModal,
    titleClose: true,
    props: {
      assessmentTags,
      remarks,
    },
  });
};

interface Props {
  assessmentTags: TAssessmentTags[];
  remarks: string;
  onClose: () => void;
}

function AssessmentModal({ assessmentTags, remarks, onClose }: Props) {
  return (
    <div className='space-y-4 px-5'>
      {assessmentTags.length || remarks ? (
        <ul className='list-disc list-outside text-sm'>
          {assessmentTags.length
            ? assessmentTags.map(({ description, code, meta }) => (
                <li key={code}>
                  <p>
                    {description}{' '}
                    {meta && (
                      <Link
                        target='_blank'
                        href={meta?.pdf_url || ''}
                        className='text-blue-700 inline-block w-fit'
                      >
                        <HiInformationCircle className='-mb-1 w-5 h-5' />
                      </Link>
                    )}
                  </p>
                </li>
              ))
            : null}
          {remarks ? <li>{remarks}</li> : null}
        </ul>
      ) : (
        <div className='text-center py-5 text-muted text-sm'>No assessment tags...</div>
      )}

      <div className='flex justify-end'>
        <Button variant='light' onClick={onClose} size='xs'>
          Close
        </Button>
      </div>
    </div>
  );
}
