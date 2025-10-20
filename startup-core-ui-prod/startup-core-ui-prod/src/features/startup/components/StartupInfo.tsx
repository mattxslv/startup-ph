import React from 'react';
import { isEmpty } from 'lodash';
import { TStartUp } from '../startup';
import { Badge, BadgeArray, Info } from 'ui/components';
import { InfoColumn } from 'ui/components/info/Info';
import { HiEye } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import SocialMedia from './SocialMedia';
import icon1 from 'assets/images/icons/icon-1.png';
import icon2 from 'assets/images/icons/icon-2.png';
import icon3 from 'assets/images/icons/icon-3.png';
import icon4 from 'assets/images/icons/icon-4.png';
import icon5 from 'assets/images/icons/icon-5.png';
import icon6 from 'assets/images/icons/icon-6.png';
import icon7 from 'assets/images/icons/icon-7.png';
import icon8 from 'assets/images/icons/icon-8.png';
import icon9 from 'assets/images/icons/icon-9.png';
import icon10 from 'assets/images/icons/icon-10.png';
import icon11 from 'assets/images/icons/icon-11.png';
import icon12 from 'assets/images/icons/icon-12.png';

interface BasicInfoProps {
  data: TStartUp;
  canEdit?: boolean;
}

export const BasicInfo = ({ data, canEdit }: BasicInfoProps) => (
  <div className="flex items-center">
    <div className="flex-shrink-0 mr-4">
      {data?.logo_url ? (
        <img
          className="h-20 w-20 lg:h-32 lg:w-32 rounded-full bg-gray-400 object-center object-contain"
          src={data.logo_url}
          alt={data.name}
        />
      ) : (
        <div className="text-xs p-3 bg-gray-100 h-20 w-20 lg:h-32 lg:w-32 flex items-center justify-center rounded-md text-muted">
          No Logo
        </div>
      )}
    </div>
    <div className="flex flex-col grow">
      <div className="flex gap-5 items-center mb-2">
        <div className="text-base font-bold text-dark flex flex-col md:flex-row gap-2">
          <p className="text-lg">{data.name}</p>
          <Badge variant="primary">{data.status}</Badge>
        </div>
      </div>
      <div className="text-xs font-semibold text-blue-600">
        Startup ID: {data.startup_number}
      </div>
    </div>
  </div>
);

interface SectorInfoProps {
  data: TStartUp;
}

export const SectorInfo = ({ data }: SectorInfoProps) => (
  <div className="space-y-4">
    <Info icon={icon1} label="Startup Sector">
      <BadgeArray list={data.sectors} />
    </Info>
    <Info icon={icon2} label="Startup Development Phase">
      {data.development_phase || '-'}
    </Info>
    <InfoColumn label="Short Description">
      {data.short_description || '-'}
    </InfoColumn>
    <InfoColumn label="Description">{data.description || '-'}</InfoColumn>
  </div>
);

interface ContactInfoProps {
  data: TStartUp;
}

export const ContactInfo = ({ data }: ContactInfoProps) => (
  <>
    <p className="text-sm font-semibold">Contact Information</p>

    <Info icon={icon3} label="Founder">
      {data.founder_name || '-'}
    </Info>
    <Info icon={icon4} label="Business Contact Number">
      {data.business_mobile_no || '-'}
    </Info>
    <Info icon={icon5} label="Business Address">
      {data.display_address || '-'}
    </Info>
  </>
);

interface BusinessInfoProps {
  data: TStartUp;
  canEdit: boolean;
}

export const BusinessInfo = ({ data, canEdit }: BusinessInfoProps) => (
  <>
    <div className="flex flex-col">
      <p className="text-sm font-semibold">Startup Information</p>

      <small className="text-gray-400">
        This section contains important details about your startup, including
        registration and funding information. It is only visible to you and will
        not be shared publicly.
      </small>
    </div>

    <Info icon={icon6} label="Registered Business/SEC Name">
      {data.business_name || '-'}
    </Info>
    <Info icon={icon7} label="Founding Year">
      {data.founding_year || '-'}
    </Info>
    <Info icon={icon8} label="Business Classification">
      {data.business_classification || '-'}
    </Info>
    <Info icon={icon9} label="Tax Identification Number">
      {data.tin || '-'}
    </Info>
    <Info icon={icon10} label="Registration/Certification Permit Number">
      {data.permit_number || '-'}
    </Info>
    <Info icon={icon11} label="Business Expiration Year">
      {data.business_certificate_expiration_date || '-'}
    </Info>
    <Info icon={icon12} label="Proof of Registration">
      {data.proof_of_registration_url ? (
        <Link
          target="_blank"
          to={data.proof_of_registration_url}
          className="text-primary flex items-center gap-1"
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
  data: TStartUp;
  canEdit: boolean;
}

export const FundingInfo = ({ canEdit, data }: FundingInfoProps) => (
  <>
    <div className="flex flex-col">
      <p className="text-sm font-semibold">Funding Information</p>

      <small className="text-gray-400">
        This section contains important details about your startup. It is only
        visible to you and will not be shared publicly.
      </small>
    </div>

    {!isEmpty(data.fundings) ? (
      data.fundings.map((funding, index) => (
        <Info
          icon=""
          label={`Funding Agency ${index + 1}`}
          key={funding.agency}
        >
          {funding.document_urls.map((url) => (
            <div className="flex items-center gap-3" key={url}>
              {funding.agency}
              <Link
                target="_blank"
                to={url}
                className="text-primary flex items-center gap-1"
              >
                View Attachment <HiEye />
              </Link>
            </div>
          ))}
        </Info>
      ))
    ) : (
      <p className="text-sm text-muted">No Available Funding Agency.</p>
    )}
  </>
);

interface SocialMediaInfoProps {
  data: TStartUp;
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
      <p className="text-sm font-semibold">Web & Social Media's</p>

      {hasSocialMedia ? (
        <div className="self-center">
          <SocialMedia data={data} />
        </div>
      ) : (
        <p className="text-sm text-muted">No Available Social Media/s.</p>
      )}
    </>
  );
};

interface Props {
  data: TStartUp;
  isUnverified: boolean;
  isVerifiable: boolean | string | undefined;
  canEdit: boolean;
  sections?: Array<
    'basic' | 'sector' | 'contact' | 'business' | 'funding' | 'social'
  >;
}

const StartupInfo = ({
  data,
  isUnverified,
  isVerifiable,
  canEdit,
  sections = ['basic', 'sector', 'contact', 'business', 'funding', 'social'],
}: Props) => {
  const renderSection = (section: string) => {
    switch (section) {
      case 'basic':
        return (
          <>
            <h1 className="text-xl font-bold">My Startup</h1>
            <BasicInfo data={data} canEdit={canEdit} />
          </>
        );
      case 'sector':
        return <SectorInfo data={data} />;
      case 'contact':
        return <ContactInfo data={data} />;
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
