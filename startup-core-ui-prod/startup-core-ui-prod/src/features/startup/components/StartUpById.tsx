import {
  Button,
  Img,
  TabItem,
  TabNav,
  TabPanel,
  TabProvider,
  showAlert,
} from 'ui/components';
import useStartupById from '../hooks/useStartupById';
import StartUpDetails from './StartUpDetails';
import StartupStatusBadge from './StartupStatusBadge';
import StartUpPage from './StartUpPage';
import { useVerifyStartUp, useRejectStartUp } from '../hooks/useStartUpMutate';
import useFlagTestAccount from '../hooks/useFlagTestAccount';
import { showStartupReturnModal } from '../modal/StartupReturnModal';
import { showStartupRejectModal } from '../modal/StartupRejectModal';
import { HiCheckCircle, HiXCircle, HiFlag, HiMinusCircle } from 'react-icons/hi';
import { Acl } from 'features/profile';
import ProgramsParticipatedPage from './ProgramsParticipatedPage';

type Props = {
  id: string;
  resetSelected: () => void;
};

function StartUpById({ id, resetSelected }: Props) {
  const { isFetching, data } = useStartupById(id);
  const verifyer = useVerifyStartUp();
  const rejecter = useRejectStartUp();
  const flagTestAccount = useFlagTestAccount();
  
  const handleVerify = () => {
    showAlert({
      message: 'Are you sure you want to approve?',
      onYes: (closeAlert) => {
        verifyer.mutate(
          { id: `${id}` },
          {
            onSuccess: () => {
              resetSelected();
              closeAlert();
            },
          }
        );
      },
      yesLabel: 'Verify',
      variant: 'primary',
    });
  };

  const handleReject = () => {
    showStartupRejectModal({ id }, resetSelected);
  };

  const handleToggleTestFlag = () => {
    const isCurrentlyTest = data?.is_test_account || false;
    showAlert({
      message: isCurrentlyTest
        ? 'Remove test account flag?'
        : 'Flag this startup as a test account?',
      onYes: (closeAlert) => {
        flagTestAccount.mutate(
          { id, is_test_account: !isCurrentlyTest },
          {
            onSuccess: () => {
              closeAlert();
            },
          }
        );
      },
      yesLabel: isCurrentlyTest ? 'Remove Flag' : 'Flag as Test',
      variant: isCurrentlyTest ? 'primary' : 'danger',
    });
  };
  // const handleReturn = () => {
  //   showAlert({
  //     message: 'Are you sure you want to return?',
  //     onYes: (closeAlert) => {
  //       returner.mutate(
  //         { id: `${id}` },
  //         {
  //           onSuccess: () => {
  //             closeAlert();
  //           },
  //         }
  //       );
  //     },
  //     yesLabel: 'Return',
  //     variant: 'danger',
  //   });
  // };

  if (!data)
    return (
      <div className="text-center">
        {isFetching ? 'Loading...' : 'No Data Loaded'}
      </div>
    );
  return (
    <TabProvider id="startup" defaultTab="details">
      <div>
        <div className="flex gap-x-4">
          <Img
            className="h-14 w-16"
            imgClassName="h-16 w-16 object-center object-cover flex-none rounded-lg ring-1 ring-slate-900/10 bg-white p-1"
            src={data.logo_url}
            alt={data.name}
          />
          <div className="flex-1 min-w-0 my-auto">
            <div className="mt-1 text-xl tracking-wide font-semibold leading-6 text-slate-900">
              {data.name}
            </div>
            <div className="text-sm tracking-wide leading-6 text-slate-500">
              {data.founder_name} | {data.founding_year}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="ml-auto flex gap-2 items-center">
              {data.is_test_account && (
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-semibold">
                  TEST ACCOUNT
                </span>
              )}
              <StartupStatusBadge value={data.status} />
            </div>
            {(() => {
              console.log('StartUpById - Startup data:', {
                id: data.id,
                name: data.name,
                status: data.status,
                statusUpper: data.status?.toUpperCase(),
                showButtons: data.status?.toUpperCase() === 'FOR VERIFICATION'
              });
              return data.status?.toUpperCase() === 'FOR VERIFICATION';
            })() && (
              <div className="flex w-full">
                <Acl code={['startups-return']}>
                  <Button
                    className="border-none min-h-min py-2 px-4 bg-gray-100 rounded-none rounded-l-sm text-gray-700 hover:bg-gray-200 flex-1"
                    onClick={() => showStartupReturnModal({ id })}
                    leadingIcon={<HiXCircle className="h-5 w-5" />}
                  >
                    Return Application
                  </Button>
                </Acl>
                <Acl code={['startups-reject']}>
                  <Button
                    className="border-none min-h-min py-2 px-4 bg-red-600 text-white rounded-none flex-1 hover:bg-red-700"
                    onClick={handleReject}
                    leadingIcon={<HiMinusCircle className="h-5 w-5" />}
                  >
                    Reject Application
                  </Button>
                </Acl>
                <Acl code={['startups-verify']}>
                  <Button
                    variant="primary"
                    className="border-none min-h-min py-2 px-4 text-white rounded-none rounded-r-sm flex-1"
                    onClick={handleVerify}
                    leadingIcon={<HiCheckCircle className="h-5 w-5" />}
                  >
                    Verify Startup
                  </Button>
                </Acl>
              </div>
            )}
            <Acl code={['startups-manage']}>
              <Button
                variant={data.is_test_account ? 'primary' : 'danger'}
                size="sm"
                className="w-full"
                onClick={handleToggleTestFlag}
                leadingIcon={<HiFlag className="h-4 w-4" />}
              >
                {data.is_test_account ? 'Remove Test Flag' : 'Flag as Test Account'}
              </Button>
            </Acl>
            
            {/* Rejection Reason Section */}
            {data.status?.toUpperCase() === 'REJECTED' && (data.remarks || data.assessment_tags) && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="text-sm font-semibold text-red-800 mb-2">Rejection Reason</h3>
                
                {data.remarks && (
                  <div className="mb-3">
                    <p className="text-xs text-red-700 font-medium">Remarks:</p>
                    <p className="text-sm text-red-900">{data.remarks}</p>
                  </div>
                )}
                
                {data.assessment_tags && data.assessment_tags.length > 0 && (
                  <div>
                    <p className="text-xs text-red-700 font-medium mb-1">Assessment Tags:</p>
                    <ul className="list-disc list-inside text-sm text-red-900 space-y-1">
                      {data.assessment_tags.map((tag: any, index: number) => (
                        <li key={index}>
                          <span className="font-medium">{tag.description || tag.code}</span>
                          {tag.notes && <span className="text-xs text-red-600 ml-1">- {tag.notes}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Return Reason Section */}
            {data.status?.toUpperCase() === 'FOR RESUBMISSION' && (data.remarks || data.assessment_tags) && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="text-sm font-semibold text-blue-800 mb-2">Return Reason</h3>
                
                {data.remarks && (
                  <div className="mb-3">
                    <p className="text-xs text-blue-700 font-medium">Remarks:</p>
                    <p className="text-sm text-blue-900">{data.remarks}</p>
                  </div>
                )}
                
                {data.assessment_tags && data.assessment_tags.length > 0 && (
                  <div>
                    <p className="text-xs text-blue-700 font-medium mb-1">Assessment Tags:</p>
                    <ul className="list-disc list-inside text-sm text-blue-900 space-y-1">
                      {data.assessment_tags.map((tag: any, index: number) => (
                        <li key={index}>
                          <span className="font-medium">{tag.description || tag.code}</span>
                          {tag.notes && <span className="text-xs text-blue-600 ml-1">- {tag.notes}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="my-4">
        <TabNav>
          <TabItem id="details" label="Details" />
          <TabItem id="startup-page" label="Startup Page" />
          <TabItem id="programs-participated" label="Programs Participated" />
          {/* <TabItem id="due-dilligence" label="Due Diligence" />
          <TabItem id="requirements" label="Requirements" /> */}
        </TabNav>
      </div>
      <TabPanel id="details">
        <div className="flex-1 flex flex-col">
          <StartUpDetails data={data} />
        </div>
      </TabPanel>
      <TabPanel id="startup-page">
        <div className="flex-1 flex flex-col">
          <StartUpPage data={data} />
        </div>
      </TabPanel>
      <TabPanel id="programs-participated">
        <div className="flex-1 flex flex-col">
          <ProgramsParticipatedPage startupId={id} />
        </div>
      </TabPanel>
      {/* <TabPanel id="due-dilligence">
        <div className="flex-1 flex flex-col">
          <div>Due Dilligence (coming soon)</div>
        </div>
      </TabPanel>
      <TabPanel id="requirements">
        <div className="flex-1 flex flex-col">
          <div>Requirements (coming soon)</div>
        </div>
      </TabPanel> */}
    </TabProvider>
  );
}

export default StartUpById;
