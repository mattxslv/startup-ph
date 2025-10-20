import React from 'react';
import { showModal } from '../modal';
import useProfile from '@/hooks/useProfile';
import useMyStartup from '@/feature/startup/hooks/useMyStartup';

export const showConsentModal = () => {
  showModal({
    id: '',
    title: '',
    component: ConsentModal,
    closeOutsideClick: true,
    titleClose: true,
    size: 'lg',
  });
};

interface Props {
  onClose: () => void;
}

function ConsentModal({ onClose }: Props) {
  return (
    <div>
      <Oath />
    </div>
  );
}

function Oath() {
  const { data: profile } = useProfile();
  const { data: startUp } = useMyStartup();
  return (
    <div className='flex flex-col p-4 rounded-lg gap-4'>
      <div className='flex justify-center font-bold'>
        <h1 className='text-xl'>Consent Form</h1>
      </div>
      <div className='text-sm'>
        <label className='block text-sm font-semibold mb-2'>
          {/*  <input
            className="form-checkbox h-6 w-6 rounded"
            type="checkbox"
            onChange={(e) => setIsOath(e.target.checked)}
            checked={isOath}
          /> */}
        </label>

        <div className='mb-6'>
          <div className='flex flex-col gap-4  text-gray-500'>
            <p>
              By registering, I hereby agree and consent to the collection and processing of my
              personal information/data for the purpose of application and registration to the
              Startup Philippines Website. I understand that my personal information/data will be
              shared with other government agencies, third parties and/or the public for the purpose
              of implementing the Innovative Startup
            </p>
            <p>
              Act, its IRR, and other related laws, rules and regulations; the use of which shall be
              governed by the Data Privacy Act of 2012 and other related laws and issuances.
            </p>
            <p>
              I hereby agree to comply with any request for an update on my personal information as
              prompted by the Startup Philippines Website for the purpose of collecting accurate
              information in relation to my application and registration.
            </p>
            <p>
              I hereby agree to have my personal information retained on the Startup Philippines
              Website within the period that I am active on the Website.
            </p>
            <p>
              This consent shall be valid and binding, unless I otherwise revoke or withdraw the
              same in writing, subject to existing laws, rules, and regulations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
