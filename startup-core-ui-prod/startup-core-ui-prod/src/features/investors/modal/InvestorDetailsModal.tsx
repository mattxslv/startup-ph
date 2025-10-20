import { showModal } from 'context/modal';
import { Info, Label } from 'ui/components';
import { IInvestor } from '../types';
import InvestorForReviewAction from '../components/InvestorForReviewAction';
import formatNumber from 'utils/formatNumber';
import InvestorRequirementReviewAction from '../components/InvestorRequirementReviewAction';
// import { ActiveBadge } from 'components'

export const showInvestorDetailsModal = (data: IInvestor) => {
  showModal({
    id: 'investor-details',
    title: 'Investor Details',
    size: 'xl2',
    component: InvestorDetails,
    titleClose: true,
    props: {
      data,
    },
  });
};

interface Props {
  data: IInvestor;
  onClose: () => void;
}

function InvestorDetails({ data, onClose }: Props) {
  return (
    <>
      <div className="flex gap-3 divide-x">
        <div className="flex flex-col divide-y max-w-[40%]">
          <div className="grid grid-cols-2 gap-2 py-3">
            <Info label="Created At">{data.created_at || '-'}</Info>
            <Info label="Updated At">{data.updated_at || '-'}</Info>
          </div>
          <div className="grid grid-cols-2 gap-2 py-3">
            <Label className="col-span-2 mb-2">Company Details</Label>
            <Info label="Company Name">{data.company_name || '-'}</Info>
            <Info label="Name of Project">{data.name || '-'}</Info>
            <Info label="Company Nationality">
              {data.company_nationality || '-'}
            </Info>
            <Info label="Location">{data.company_location || '-'}</Info>
            <Info label="Type of Activity">{data.activity_type || '-'}</Info>
            <Info label="Estimate Cost">{data.estimated_cost || '-'}</Info>
            <Info label="Estimated Start of Commercial Operations">
              {data.estimated_start_date_human || '-'}
            </Info>
            <Info label="Min Estimated Employment">
              {formatNumber(data.min_estimated_employment, 0) || '-'}
            </Info>
            <Info label="Max Estimated Employment">
              {formatNumber(data.max_estimated_employment, 0) || '-'}
            </Info>
            <Info label="Project Brief">{data.description || '-'}</Info>
          </div>
          <div className="grid grid-cols-2 gap-2 py-3">
            <Label className="col-span-2 mb-2">
              Officer of the Corporation
            </Label>
            <Info label="First Name">
              {data.representative_first_name || '-'}
            </Info>
            <Info label="Last Name">
              {data.representative_last_name || '-'}
            </Info>
            <Info label="Email Address">
              {data.representative_email || '-'}
            </Info>
            <Info label="Contact Number">
              {data.representative_contact_number || '-'}
            </Info>
          </div>
        </div>
        <div className="flex-1 space-y-4 pl-2">
          {['For Requirements Review', 'For Requirements Submission'].includes(
            data?.status
          ) ? (
            <InvestorRequirementReviewAction
              investor={data}
              onFinalApprove={() => {
                onClose();
              }}
            />
          ) : null}
          {data?.status === 'For Review' ? (
            <InvestorForReviewAction
              investorId={data.id!}
              onActionCallback={() => {
                onClose();
              }}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default InvestorDetails;
