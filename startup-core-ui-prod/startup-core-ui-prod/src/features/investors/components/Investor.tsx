import { useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { companyPlaceholder } from 'assets/images';
import {
  Badge,
  Card,
  TabItem,
  TabNav,
  TabPanel,
  TabProvider,
} from 'ui/components';
import useInvestorById from '../hooks/useInvestorById';
import InvestorDetails from './InvestorDetails';
import InvestorRequirementReviewAction from './InvestorRequirementReviewAction';
import InvestorStatusBadge from './InvestorStatusBadge';
// import { HiExclamation } from 'react-icons/hi';
import useInvestorRequirementsList from '../hooks/useInvestorRequirementsList';
import InvestorForReviewAction from './InvestorForReviewAction';

type Props = {
  investorId: string;
};

function Investor({ investorId }: Props) {
  const location = useLocation();
  const defaultTab = useMemo(
    () => location.hash.replace('#', '') || 'details',
    [location]
  );
  const { isLoading, data } = useInvestorById(investorId);
  const { data: requirements } = useInvestorRequirementsList(investorId);
  const tabRef = useRef<any>(); // refactor this any later
  if (!data) return <div>{isLoading ? 'Loading...' : 'Not found'}</div>;

  const unsettledRequirementCount = (requirements?.list || []).filter(
    (x) => x.status === 'Approved'
  ).length;

  return (
    <TabProvider ref={tabRef} id="investor" defaultTab={defaultTab}>
      <Card className="flex flex-col">
        <div>
          <div className="flex gap-x-4">
            <img
              alt=""
              className="h-16 w-16 flex-none rounded-full ring-1 ring-slate-900/10 bg-white p-1"
              src={companyPlaceholder}
            />
            <div className="flex-1 min-w-0 my-auto">
              <div className="mt-1 text-xl tracking-wide font-semibold leading-6 text-slate-900">
                {data.company_name}
              </div>
              <div className="text-sm tracking-wide leading-6 text-slate-500">
                {data.name}
              </div>
            </div>
            <div>
              <InvestorStatusBadge value={data.status} />
            </div>
          </div>
        </div>
        <div className="-mb-6 my-4">
          <TabNav>
            <TabItem id="details" label="Details" />
            <TabItem
              id="attachments"
              label={
                data?.status === 'For Review' ? 'For Approval' : 'Attachments'
              }
              trailingIcon={
                requirements?.pager &&
                unsettledRequirementCount !== requirements?.pager?.total ? (
                  <Badge variant="danger" rounded>
                    {unsettledRequirementCount} /{' '}
                    {requirements?.pager?.total ?? 0}
                  </Badge>
                ) : undefined
              }
            />
            {/* <TabItem id="agency" label="Agency" /> */}
          </TabNav>
        </div>
      </Card>
      <TabPanel id="details">
        <Card className="flex-1 flex flex-col">
          <InvestorDetails data={data} />
        </Card>
      </TabPanel>
      <TabPanel id="attachments">
        <Card className="flex-1 flex flex-col">
          {data?.status === 'For Review' ? (
            <InvestorForReviewAction
              investorId={data.id!}
              onActionCallback={() => {
                tabRef.current.setTab('details');
              }}
            />
          ) : (
            <InvestorRequirementReviewAction
              investor={data}
              onFinalApprove={() => {}}
            />
          )}
        </Card>
      </TabPanel>
      <TabPanel id="agency">
        <Card className="flex-1 flex flex-col">Work in Progress</Card>
      </TabPanel>
    </TabProvider>
  );
}

export default Investor;
