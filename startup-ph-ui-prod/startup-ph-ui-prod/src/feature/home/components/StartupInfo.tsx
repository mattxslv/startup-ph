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
import StartupBadgeAction from './StartupBadgeIcon';
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
    <div className='flex-shrink-0 mr-4'>
      {data?.logo_url ? (
        <Image
          className='h-20 w-20 lg:h-32 lg:w-32 rounded-full bg-gray-400 object-center object-contain'
          width={80}
          height={80}
          src={data.logo_url}
          alt={data.name}
        />
      ) : (
        <div className='text-xs p-3 bg-gray-100 h-20 w-20 lg:h-32 lg:w-32 flex items-center justify-center rounded-md text-muted'>
          No Logo
        </div>
      )}
    </div>
    <div className='flex flex-col grow'>
      <div className='flex gap-5 items-center mb-2'>
        <div className='text-base font-bold text-dark flex flex-col md:flex-row gap-2'>
          <p className='text-lg'>{data.name}</p>

          <StartupBadgeAction data={data} />

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
            className='ml-auto'
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
      <div className='text-xs font-semibold text-blue-600'>Startup ID: {data.startup_number}</div>
    </div>
  </div>
);

interface SectorInfoProps {
  data: TStartup;
}

export const SectorInfo = ({ data }: SectorInfoProps) => (
  <div className='space-y-4'>
    <Info icon='/images/icons/icon-1.png' label='Startup Sector'>
      <BadgeArray list={data.sectors} />
    </Info>
    <Info icon='/images/icons/icon-2.png' label='Startup Development Phase'>
      {data.development_phase || '-'}
    </Info>
    <InfoColumn label='Short Description'>{data.short_description || '-'}</InfoColumn>
    <InfoColumn label='Description'>{data.description || '-'}</InfoColumn>
  </div>
);

interface ContactInfoProps {
  data: TStartup;
  canEdit: boolean;
}

export const ContactInfo = ({ data, canEdit }: ContactInfoProps) => (
  <>
    <div className='flex items-center justify-between gap-4'>
      <p className='text-sm font-semibold'>Contact Information</p>
      {canEdit && (
        <Button
          className='ml-auto'
          variant='link'
          leading={<HiPencil />}
          size='xs'
          onClick={() => StartupFormModal(2)}
        >
          Edit
        </Button>
      )}
    </div>
    <Info icon='/images/icons/icon-3.png' label='Founder'>
      {data.founder_name || '-'}
    </Info>
    <Info icon='/images/icons/icon-4.png' label='Business Contact Number'>
      {data.business_mobile_no || '-'}
    </Info>
    <Info icon='/images/icons/icon-5.png' label='Business Address'>
      {data.display_address || '-'}
    </Info>
  </>
);

interface BusinessInfoProps {
  data: TStartup;
  canEdit: boolean;
}

export const BusinessInfo = ({ data, canEdit }: BusinessInfoProps) => (
  <>
    <div className='flex flex-col'>
      <div className='flex items-center justify-between gap-4'>
        <p className='text-sm font-semibold'>Startup Information</p>
        {canEdit ? (
          <Button
            className='ml-auto'
            variant='link'
            leading={<HiPencil />}
            size='xs'
            onClick={() => StartupFormModal(3)}
          >
            Edit
          </Button>
        ) : null}
      </div>

      <small className='text-gray-400'>
        This section contains important details about your startup, including registration and
        funding information. It is only visible to you and will not be shared publicly.
      </small>
    </div>

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
      {data.registration_no || '-'}
    </Info>
    <Info icon='/images/icons/icon-11.png' label='Business Expiration Year'>
      {data.business_certificate_expiration_date || '-'}
    </Info>
    <Info icon='/images/icons/icon-12.png' label='Proof of Registration'>
      {data.proof_of_registration_url ? (
        <Link
          target='_blank'
          href={data.proof_of_registration_url}
          className='text-primary flex items-center gap-1'
        >
          <span>Proof of Registration</span> <HiEye />
        </Link>
      ) : (
        '-'
      )}
    </Info>
  </>
);

interface FundingInfoProps {
  data: TStartup;
  canEdit: boolean;
}

export const FundingInfo = ({ canEdit, data }: FundingInfoProps) => (
  <>
    <div className='flex flex-col'>
      <div className='flex items-center justify-between gap-4'>
        <p className='text-sm font-semibold'>Funding Information</p>
        {canEdit ? (
          <Button
            className='ml-auto'
            variant='link'
            leading={<HiPencil />}
            size='xs'
            onClick={() => StartupFormModal(4)}
          >
            Edit
          </Button>
        ) : null}
      </div>

      <small className='text-gray-400'>
        This section contains important details about your startup. It is only visible to you and
        will not be shared publicly.
      </small>
    </div>

    {!isEmpty(data.fundings) ? (
      data.fundings.map((funding, index) => (
        <Info icon='' label={`Funding Agency ${index + 1}`} key={funding.agency}>
          {funding.document_urls.map((url) => (
            <div className='flex items-center gap-3' key={url}>
              {funding.agency}
              <Link target='_blank' href={url} className='text-primary flex items-center gap-1'>
                View Attachment <HiEye />
              </Link>
            </div>
          ))}
        </Info>
      ))
    ) : (
      <p className='text-sm text-muted'>No Available Funding Agency.</p>
    )}
  </>
);

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
    <>
      <div className='flex items-center justify-between gap-4'>
        <p className='text-sm font-semibold'>Web & Social Media's</p>
        {canEdit ? (
          <Button
            className='ml-auto'
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
        <p className='text-sm text-muted'>No Available Social Media/s.</p>
      )}
    </>
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
