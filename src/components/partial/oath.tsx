import React from 'react';
import { showModal } from '../modal';
import useProfile from '@/hooks/useProfile';
import useMyStartup from '@/feature/startup/hooks/useMyStartup';

export const showOathModal = () => {
  showModal({
    id: '',
    title: '',
    component: OathModal,
    closeOutsideClick: true,
    titleClose: true,
    size: 'xl',
  });
};

interface Props {
  onClose: () => void;
}

function OathModal({ onClose }: Props) {
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
        <h1 className='text-xl'>Oath of Undertaking</h1>
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
          <p className='mb-4'>
            I, <b className='text-blue-600 underline'>{profile?.display_name}</b>, of legal age,
            Filipino, owner/authorized representative of{' '}
            <b className='text-blue-600 underline'>{startUp?.name}</b>, with principal address at{' '}
            <b className='text-blue-600 underline'>{startUp?.display_address}</b>
            {startUp?.social_website_url ? (
              <span>
                {' '}
                and website address of{' '}
                <b className='text-blue-600 underline'>{startUp?.social_website_url}</b>
              </span>
            ) : (
              ''
            )}
            , after being duly sworn to, under oath and in accordance with the law, do hereby depose
            and state that:
          </p>
          <ul className='list-decimal pl-4 space-y-2'>
            <li>
              All information supplied in my company’s Startup Philippines Website (SPW) application
              and related documents are true and correct to the best of my belief and knowledge;
            </li>
            <li>
              Any false or misleading information supplied, or production of false or misleading
              information and/or document to support this application shall be a ground for the
              automatic denial of this application, automatic cancellation/revocation of the
              verification, and/or the filing of appropriate criminal, civil, and/or administrative
              action/s, as applicable;
            </li>
            <li>
              I undertake to keep my SPW account active, ensure that all information is updated
              every six (6) months, and that account inactivity for one (1) year will result in
              account deactivation;
            </li>
            <li>
              I understand that a post-evaluation may be conducted after the verification process
              and understand that any negative findings may be ground for the cancellation of my
              startup’s verification upon failure to comply with the post-evaluation
              recommendations, without prejudice to the filing of appropriate criminal, civil,
              and/or administrative action, as applicable;
            </li>
            <li>
              I understand and undertake to comply with the provisions of Republic Act No. 11337
              otherwise known as the Innovative Startup Act, its implementing rules and regulations
              (IRR,) and other related laws, rules and regulations;
            </li>
            <li>
              I understand and consent to the disclosure to third parties or the public of the
              information appearing on the startup database in accordance with the procedure set
              forth under the Innovative Startup Act and other existing laws, rules and regulations
              on disclosure of information;
            </li>
            <li>
              If my application is approved, I shall not use my SPW account for any illicit,
              unlawful, illegal, fraudulent and/or immoral purpose or activity; and
            </li>
            <li>
              I fully understand and hereby agree without any reservation that my failure to comply
              with or observe any of the foregoing undertakings and/or pertinent laws, rules and
              regulations shall be sufficient grounds for the denial of my application or
              deactivation of my account, without prejudice to the filing of appropriate criminal,
              civil and/or administrative action/s, as applicable.
            </li>
          </ul>
        </div>

        <label className='block text-sm font-semibold mb-2'>
          {/*  <input
            className="form-checkbox h-6 w-6 rounded"
            type="checkbox"
            onChange={(e) => setIsConsent(e.target.checked)}
            checked={isConsent}
          /> */}
          <span className='ml-2'>Consent Form</span>
        </label>
        <div className='space-y-2'>
          <p>
            By registering, I hereby agree and consent to the collection and processing of my
            personal information/data for the purpose of application and registration to the Startup
            Philippines Website. I understand that my personal information/data will be shared with
            other government agencies, third parties and/or the public for the purpose of
            implementing the Innovative Startup
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
            This consent shall be valid and binding, unless I otherwise revoke or withdraw the same
            in writing, subject to existing laws, rules, and regulations.
          </p>
        </div>
      </div>
    </div>
  );
}
