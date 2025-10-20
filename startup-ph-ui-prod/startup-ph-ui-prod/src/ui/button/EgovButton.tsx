import EGovSSOWidget from 'egov-sso-widget';
import useAuthenticateViaSso from '@/hooks/useAuthenticateViaSso';
import Image from 'next/image';
import { useState } from 'react';

const EgovButton = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const [query, setQuery] = useState<{ exchange_code: string }>({ exchange_code: '' });
  useAuthenticateViaSso(query);

  return (
    <div className='w-full flex items-center justify-center'>
      <EGovSSOWidget
        environment={process.env.NEXT_PUBLIC_EGOV_SSO_ENV}
        client_id={process.env.NEXT_PUBLIC_EGOV_SSO_CLIENT_ID}
        onClick={onLinkClick}
        on_success_function={(exchange_code: string) => setQuery({ exchange_code })}
      >
        <div className='w-full flex gap-2 text-sm font-normal items-center justify-center p-4 bg-gray-100 rounded-md'>
          Login with your
          <Image src='/images/egov.svg' alt='StartUp Ph' height={60} width={60} />
          account
        </div>
      </EGovSSOWidget>
      <div id='egov-sso-widget-portal'></div>
    </div>
  );
};

export default EgovButton;
