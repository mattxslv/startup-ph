import { InfoHorizontal, Title } from 'ui/components';
import { IInvestor } from '../types';

type Props = {
  data: IInvestor;
};

function InvestorDetails({ data }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-4">
        <Title>Details</Title>
        <InfoHorizontal label="Created At">
          {data.created_at || '-'}
        </InfoHorizontal>
        <InfoHorizontal label="Updated At">
          {data.updated_at || '-'}
        </InfoHorizontal>
        <InfoHorizontal label="Company Name">
          {data.company_name || '-'}
        </InfoHorizontal>
        <InfoHorizontal label="Name of Project">
          {data.name || '-'}
        </InfoHorizontal>
        <InfoHorizontal label="Company Nationality">
          {data.company_nationality || '-'}
        </InfoHorizontal>
        <InfoHorizontal label="Location">
          {data.company_location || '-'}
        </InfoHorizontal>
        <InfoHorizontal label="Type of Activity">
          {data.activity_type || '-'}
        </InfoHorizontal>
        <InfoHorizontal label="Estimate Cost">
          {data.estimated_cost || '-'}
        </InfoHorizontal>
        <InfoHorizontal label="Estimated Start of Commercial Operations">
          {data.estimated_start_date_human || '-'}
        </InfoHorizontal>
        <InfoHorizontal label="Min Estimated Employment">
          {data.min_estimated_employment || '-'}
        </InfoHorizontal>
        <InfoHorizontal label="Max Estimated Employment">
          {data.max_estimated_employment || '-'}
        </InfoHorizontal>
      </div>
      <div className="space-y-4">
        <Title>Officer of the Corporation</Title>
        <InfoHorizontal label="Project Brief">
          {data.description || '-'}
        </InfoHorizontal>
        <InfoHorizontal label="First Name">
          {data.representative_first_name || '-'}
        </InfoHorizontal>
        <InfoHorizontal label="Last Name">
          {data.representative_last_name || '-'}
        </InfoHorizontal>
        <InfoHorizontal label="Email Address">
          {data.representative_email || '-'}
        </InfoHorizontal>
        <InfoHorizontal label="Contact Number">
          {data.representative_contact_number || '-'}
        </InfoHorizontal>
      </div>
    </div>
  );
}

export default InvestorDetails;
