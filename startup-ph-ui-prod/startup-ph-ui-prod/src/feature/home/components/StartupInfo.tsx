import React from 'react';
import Info, { InfoColumn } from './InfoItem';
import { TStartup } from '@/feature/startup/types';
import Link from 'next/link';
import BadgeArray from '@/ui/badge/BadgeArray';
import { HiEye, HiPencil } from 'react-icons/hi';
import SocialMedia from './SocialMedia';
import Title from '@/components/home/Title';
import Button from '@/ui/button/Button';
import Banner from './Banner';
// import LogoContainer from './LogoContainer';
import { showVerifyModal } from './verify';
import Image from 'next/image';
import { StartupFormModal } from './StartupFormModal';
import { isEmpty } from 'lodash';

interface BasicInfoProps {
  data: TStartup;
  canEdit: boolean;
}

export const BasicInfo = ({ data, canEdit }: BasicInfoProps) => (
  <div className='flex items-center'>
    <div className='flex-shrink-0 mr-6'>
      {data?.logo_url && !data.logo_url.includes('placeholder.com') ? (
        <Image
          className='h-20 w-20 lg:h-32 lg:w-32 rounded-full bg-gray-100 object-center object-cover border-4 border-white shadow-md'
          width={80}
          height={80}
          src={data.logo_url}
          alt={data.name || 'Startup Logo'}
        />
      ) : (
        <div 
          key="startup-placeholder" 
          className='h-20 w-20 lg:h-32 lg:w-32 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-4 border-white shadow-md flex items-center justify-center relative overflow-hidden'
        >
          {/* Background pattern */}
          <div className='absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent'></div>
          
          {/* Building icon placeholder */}
          <div className='text-blue-600 text-2xl lg:text-4xl relative z-10'>
            🏢
          </div>
        </div>
      )}
    </div>
    <div className='flex flex-col grow'>
      <div className='flex gap-5 items-center mb-2'>
        <div className='text-base font-bold text-dark'>
          <div className='flex items-center gap-3 mb-2'>
            <p className='text-xl lg:text-2xl font-bold text-gray-900'>{data.name}</p>
            {data.status === 'VERIFIED' && (
              <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 border border-green-200'>
                ✓ Verified
              </span>
            )}
            {data.status === 'REJECTED' && (
              <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200'>
                ✗ Rejected
              </span>
            )}
            {data.status === 'FOR RESUBMISSION' && (
              <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 border border-blue-200'>
                ↻ For Resubmission
              </span>
            )}
            {data.status === 'FOR VERIFICATION' && (
              <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200'>
                ⏳ For Verification
              </span>
            )}
          </div>
          
          {(data.status === 'REJECTED' || data.status === 'FOR RESUBMISSION') && (
            <p className='text-xs text-gray-500 mb-2'>Check your registered email for details</p>
          )}
          
          {data.status === 'FOR RESUBMISSION' && (
            <Button
              size='xs'
              variant='primary'
              onClick={() => showVerifyModal()}
              className='block md:hidden'
            >
              Resubmit
            </Button>
          )}
        </div>

        {data.status === 'FOR RESUBMISSION' && (
          <Button
            size='xs'
            variant='primary'
            onClick={() => showVerifyModal()}
            className='hidden md:block mr-auto'
          >
            Resubmit
          </Button>
        )}

        {canEdit ? (
          <Button
            className='ml-auto hover:bg-gray-100 transition-colors'
            variant='link'
            leading={<HiPencil />}
            size='xs'
            onClick={() => StartupFormModal(1)}
          >
            Edit
          </Button>
        ) : (
          <span />
        )}
      </div>
      <div className='text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block w-fit'>
        Startup ID: {data.startup_number || data.id || 'Not assigned'}
      </div>
    </div>
  </div>
);

interface SectorInfoProps {
  data: TStartup;
}

export const SectorInfo = ({ data }: SectorInfoProps) => (
  <div className='space-y-5'>
    <div className='p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100'>
      <Info icon='/images/icons/icon-1.png' label='Startup Sector'>
        <BadgeArray list={data.sectors} />
      </Info>
    </div>
    <div className='p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100'>
      <Info icon='/images/icons/icon-2.png' label='Startup Development Phase'>
        {data.development_phase || '-'}
      </Info>
    </div>
    <div className='p-4 bg-gray-50 rounded-lg border border-gray-200'>
      <InfoColumn label='Short Description'>{data.short_description || '-'}</InfoColumn>
    </div>
    <div className='p-4 bg-gray-50 rounded-lg border border-gray-200'>
      <InfoColumn label='Description'>{data.description || '-'}</InfoColumn>
    </div>
  </div>
);

interface ContactInfoProps {
  data: TStartup;
  canEdit: boolean;
}

export const ContactInfo = ({ data, canEdit }: ContactInfoProps) => (
  <div className='bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200'>
    <div className='flex items-center justify-between gap-4 mb-5'>
      <p className='text-xl font-bold text-gray-900'>Contact Information</p>
      {canEdit && (
        <Button
          className='ml-auto hover:bg-gray-100 transition-colors'
          variant='link'
          leading={<HiPencil />}
          size='xs'
          onClick={() => StartupFormModal(2)}
        >
          Edit
        </Button>
      )}
    </div>
    <div className='space-y-4'>
      <Info icon='/images/icons/icon-3.png' label='Founder'>
        {data.founder_name || '-'}
      </Info>
      <Info icon='/images/icons/icon-4.png' label='Business Contact Number'>
        {data.business_mobile_no || '-'}
      </Info>
      <Info icon='/images/icons/icon-5.png' label='Business Address'>
        {data.display_address || '-'}
      </Info>
    </div>
  </div>
);

interface BusinessInfoProps {
  data: TStartup;
  canEdit: boolean;
}

export const BusinessInfo = ({ data, canEdit }: BusinessInfoProps) => {
  // Debug log to see what permit data is available
  console.log('🏢 BusinessInfo data:', {
    permit_number: data.permit_number,
    registration_no: data.registration_no,
    dti_permit_number: data.dti_permit_number,
    sec_permit_number: data.sec_permit_number,
    business_certificate_expiration_date: data.business_certificate_expiration_date
  });

  return (
  <div className='bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200'>
    <div className='flex flex-col mb-5'>
      <div className='flex items-center justify-between gap-4'>
        <p className='text-xl font-bold text-gray-900'>Startup Information</p>
        {canEdit ? (
          <Button
            className='ml-auto hover:bg-gray-100 transition-colors'
            variant='link'
            leading={<HiPencil />}
            size='xs'
            onClick={() => StartupFormModal(3)}
          >
            Edit
          </Button>
        ) : null}
      </div>

      <small className='text-gray-500 mt-2'>
        This section contains important details about your startup, including registration and
        funding information. It is only visible to you and will not be shared publicly.
      </small>
    </div>

    <div className='space-y-4'>
      <Info icon='/images/icons/icon-6.png' label='Registered Business/SEC Name'>
        {data.business_name || '-'}
      </Info>
      <Info icon='/images/icons/icon-7.png' label='Founding Year'>
        {data.founding_year || '-'}
      </Info>
      <Info icon='/images/icons/icon-8.png' label='Business Classification'>
        {data.business_classification || '-'}
      </Info>
      <Info icon='/images/icons/icon-9.png' label='Tax Identification Number'>
        {data.tin || '-'}
      </Info>
      <Info icon='/images/icons/icon-10.png' label='Registration/Certification Permit Number'>
        {data.permit_number || data.registration_no || data.dti_permit_number || data.sec_permit_number || '-'}
      </Info>
      <Info icon='/images/icons/icon-11.png' label='Business Expiration Year'>
        {data.business_certificate_expiration_date || '-'}
      </Info>
      <Info icon='/images/icons/icon-12.png' label='Proof of Registration'>
        {data.proof_of_registration_url ? (
          <Link
            target='_blank'
            href={data.proof_of_registration_url}
            className='text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium transition-colors'
          >
            <span>Proof of Registration</span> <HiEye />
          </Link>
        ) : (
          '-'
        )}
      </Info>
    </div>
  </div>
);};

interface FundingInfoProps {
  data: TStartup;
  canEdit: boolean;
}

export const FundingInfo = ({ canEdit, data }: FundingInfoProps) => {
  // Debug log to see funding data
  console.log('💰 FundingInfo data:', {
    fundings: data.fundings,
    has_funding: data.has_funding
  });

  return (
    <div className='bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200'>
    <div className='flex flex-col mb-5'>
      <div className='flex items-center justify-between gap-4'>
        <p className='text-xl font-bold text-gray-900'>Funding Information</p>
        {canEdit ? (
          <Button
            className='ml-auto hover:bg-gray-100 transition-colors'
            variant='link'
            leading={<HiPencil />}
            size='xs'
            onClick={() => StartupFormModal(4)}
          >
            Edit
          </Button>
        ) : null}
      </div>

      <small className='text-gray-500 mt-2'>
        This section contains important details about your startup. It is only visible to you and
        will not be shared publicly.
      </small>
    </div>

    <div className='space-y-4'>
      {!isEmpty(data.fundings) ? (
        data.fundings.map((funding, index) => (
          <Info icon='' label={`Funding Agency ${index + 1}`} key={funding.agency}>
            {funding.document_urls.map((url, urlIndex) => (
              <div className='flex items-center gap-3' key={`${url}-${urlIndex}`}>
                {funding.agency}
                {url && url.trim() && (url.startsWith('http://') || url.startsWith('https://')) ? (
                  <Link target='_blank' href={url} className='text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium transition-colors'>
                    View Attachment <HiEye />
                  </Link>
                ) : (
                  <span className='text-gray-500 text-sm'>No valid attachment URL</span>
                )}
              </div>
            ))}
          </Info>
        ))
      ) : (
        <p className='text-base text-gray-500 italic'>No Available Funding Agency.</p>
      )}
    </div>
  </div>
);};

interface SocialMediaInfoProps {
  data: TStartup;
  canEdit: boolean;
}

export const SocialMediaInfo = ({ canEdit, data }: SocialMediaInfoProps) => {
  const hasSocialMedia = Object.values({
    social_website_url: data.social_website_url,
    social_instagram_url: data.social_instagram_url,
    social_facebook_url: data.social_facebook_url,
    social_linkedin_url: data.social_linkedin_url,
  }).some((url) => url?.trim());

  return (
    <div className='bg-gradient-to-br from-gray-50 to-white p-6 rounded-lg border border-gray-200'>
      <div className='flex items-center justify-between gap-4 mb-5'>
        <p className='text-xl font-bold text-gray-900'>Web & Social Media's</p>
        {canEdit ? (
          <Button
            className='ml-auto hover:bg-gray-100 transition-colors'
            variant='link'
            leading={<HiPencil />}
            size='xs'
            onClick={() => StartupFormModal(5)}
          >
            Edit
          </Button>
        ) : null}
      </div>

      {hasSocialMedia ? (
        <div className='self-center'>
          <SocialMedia data={data} />
        </div>
      ) : (
        <p className='text-base text-gray-500 italic'>No Available Social Media/s.</p>
      )}
    </div>
  );
};

interface Props {
  data: TStartup;
  isUnverified: boolean;
  isVerifiable: boolean | string | undefined;
  canEdit: boolean;
  sections?: Array<'basic' | 'sector' | 'contact' | 'business' | 'funding' | 'social'>;
  hasBanner?: boolean;
}

const StartupInfo = ({
  data,
  isUnverified,
  isVerifiable,
  canEdit,
  sections = ['basic', 'sector', 'contact', 'business', 'funding', 'social'],
  hasBanner = true,
}: Props) => {
  const renderSection = (section: string) => {
    switch (section) {

      case 'basic':
        return (
          <>
            {hasBanner && (
              <Banner
                isUnverified={isUnverified}
                isAlmostComplete={data?.logo_url || (data.body || []).length > 0}
                isVerifiable={isVerifiable}
                hasFunding={data.has_funding}
                hasExpiration={Boolean(data.business_certificate_expiration_date)}
                status={data.status}
                handleUpdate={() =>
                  StartupFormModal(!Boolean(data.business_certificate_expiration_date) ? 3 : 4)
                }
              />
            )}
            <Title label='My Startup' />
            <BasicInfo data={data} canEdit={canEdit} />
          </>
        );
      case 'sector':
        return <SectorInfo data={data} />;
      case 'contact':
        return <ContactInfo data={data} canEdit={canEdit} />;
      case 'business':
        return <BusinessInfo data={data} canEdit={canEdit} />;
      case 'funding':
        return <FundingInfo data={data} canEdit={canEdit} />;
      case 'social':
        return <SocialMediaInfo data={data} canEdit={canEdit} />;
      default:
        return null;
    }
  };

  return (
    <>
      {sections.map((section, index) => (
        <React.Fragment key={section}>
          {renderSection(section)}
          {index < sections.length - 1 && <hr />}
        </React.Fragment>
      ))}
    </>
  );
};

export default StartupInfo;
