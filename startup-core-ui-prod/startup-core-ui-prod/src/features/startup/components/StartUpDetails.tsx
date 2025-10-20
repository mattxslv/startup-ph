import { BadgeArray, Card, InfoHorizontal, Title } from 'ui/components';
import { TStartUp } from '../startup';

type Props = {
  data: TStartUp;
};

function StartUpDetails({ data }: Props) {
  return (
    <div className="space-y-4">
      <Card>
        <div className="space-y-4 flex-1 min-w-0">
          <div>
            <Title>Information</Title>
          </div>
          <InfoHorizontal labelWidth="200px" label="Sectors">
            <BadgeArray list={data.sectors} />
          </InfoHorizontal>
          <InfoHorizontal labelWidth="200px" label="Startup Name">
            {data.name || '-'}
          </InfoHorizontal>
          <InfoHorizontal labelWidth="200px" label="Business Name">
            {data.business_name || '-'}
          </InfoHorizontal>
          <InfoHorizontal labelWidth="200px" label="Founder Name">
            {data.founder_name || '-'}
          </InfoHorizontal>
          <InfoHorizontal labelWidth="200px" label="Founding Year">
            {data.founding_year || '-'}
          </InfoHorizontal>
          <InfoHorizontal labelWidth="200px" label="Business Address">
            {data.display_address || '-'}
          </InfoHorizontal>
          <InfoHorizontal labelWidth="200px" label="Description">
            {data.description || '-'}
          </InfoHorizontal>
          <InfoHorizontal labelWidth="200px" label="Short Description">
            {data.short_description || '-'}
          </InfoHorizontal>

          <InfoHorizontal labelWidth="200px" label="Social Website URL">
            <a
              className="text-primary-base underline"
              href={data.social_website_url}
              target="_blank"
              rel="noreferrer"
            >
              {data.social_website_url || '-'}
            </a>
          </InfoHorizontal>
          <InfoHorizontal labelWidth="200px" label="Social Instagram URL">
            <a
              className="text-primary-base underline"
              href={data.social_instagram_url}
              target="_blank"
              rel="noreferrer"
            >
              {data.social_instagram_url || '-'}
            </a>
          </InfoHorizontal>
          <InfoHorizontal labelWidth="200px" label="Social Facebook URL">
            <a
              className="text-primary-base underline"
              href={data.social_facebook_url}
              target="_blank"
              rel="noreferrer"
            >
              {data.social_facebook_url || '-'}
            </a>
          </InfoHorizontal>
          <InfoHorizontal labelWidth="200px" label="Social Linkedin URL">
            <a
              className="text-primary-base underline"
              href={data.social_linkedin_url}
              target="_blank"
              rel="noreferrer"
            >
              {data.social_linkedin_url || '-'}
            </a>
          </InfoHorizontal>
        </div>
      </Card>
      <Card>
        <div className="space-y-4 flex-1 min-w-0">
          <div>
            <Title>Verification</Title>
          </div>
          <InfoHorizontal labelWidth="200px" label="Business Classification">
            {data.business_classification || '-'}
          </InfoHorizontal>
          <InfoHorizontal labelWidth="200px" label="TIN">
            {data.tin || '-'}
          </InfoHorizontal>
          <InfoHorizontal labelWidth="200px" label="Development Phase">
            {data.development_phase || '-'}
          </InfoHorizontal>
        </div>
      </Card>
    </div>
  );
}

export default StartUpDetails;
