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
import { useVerifyStartUp } from '../hooks/useStartUpMutate';
import { showStartupReturnModal } from '../modal/StartupReturnModal';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { Acl } from 'features/profile';
import ProgramsParticipatedPage from './ProgramsParticipatedPage';

type Props = {
  id: string;
  resetSelected: () => void;
};

function StartUpById({ id, resetSelected }: Props) {
  const { isFetching, data } = useStartupById(id);
  const verifyer = useVerifyStartUp();
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
            <div className="ml-auto">
              <StartupStatusBadge value={data.status} />
            </div>
            {data.status === 'FOR VERIFICATION' && (
              <div className="flex">
                <Acl code={['startups-return']}>
                  <Button
                    className="border-none min-h-min py-1 bg-gray-100 rounded-none rounded-l-sm text-gray-500 hover:bg-gray-200"
                    onClick={() => showStartupReturnModal({ id })}
                    leadingIcon={<HiXCircle className="h-5 w-5" />}
                  >
                    Return Application
                  </Button>
                </Acl>
                <Acl code={['startups-verify']}>
                  <Button
                    variant="primary"
                    className="border-none min-h-min p-0 text-white rounded-none rounded-r-sm"
                    onClick={handleVerify}
                    leadingIcon={<HiCheckCircle className="h-5 w-5" />}
                  >
                    Verify Startup
                  </Button>
                </Acl>
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
