import { showModal } from 'context/modal';
import { IApplication, TSubmittedRequirement } from '../types';
import { StartUpPage, useStartupById } from 'features/startup';
import { Button, Info, InfoHorizontal, Title, showAlert } from 'ui/components';
import ApplicationStatusBadge from '../components/ApplicationStatusBadge';
import useProgramApplicationById, {
  useApplicationApprove,
  useApplicationReject,
  useApplicationReturn,
} from '../hooks/useProgramApplicationById';
import { refreshProgramApplications } from '../hooks/useProgramApplications';
import { showAlertWithRemarks } from 'ui/components/alert/AlertWithRemarks';
import { Acl } from 'features/profile';
import { Link } from 'react-router-dom';

export const showStartupReviewModal = (data: IApplication) => {
  showModal({
    id: 'startup-review',
    title: 'Review StartUp',
    size: 'xl',
    titleClose: true,
    component: StartupReviewModal,
    props: {
      data,
    },
  });
};

type Props = {
  data: IApplication;
  onClose: () => {};
};

function StartupReviewModal({ data, onClose }: Props) {
  const { data: application } = useProgramApplicationById(data.id);
  const { data: startup } = useStartupById(data.startup_id);
  const approver = useApplicationApprove();
  const returner = useApplicationReturn();
  const rejector = useApplicationReject();
  const handleApprove = () => {
    showAlert({
      message: 'Are you sure you want to approve?',
      onYes: (closeAlert) => {
        approver.mutate(
          { id: `${data.id}` },
          {
            onSuccess: () => {
              closeAlert();
              refreshProgramApplications(data.program_id);
              onClose();
            },
          }
        );
      },
      yesLabel: 'Approve',
      variant: 'primary',
    });
  };
  const reopen = () => {
    showStartupReviewModal(data);
  };
  const handleReturn = () => {
    onClose();
    setTimeout(() => {
      showAlertWithRemarks({
        message: 'Are you sure you want to return?',
        onYes: ({ remarks }, closeAlert) => {
          returner.mutate({
            id: `${data.id}`,
            remarks,
            cb: () => {
              closeAlert();
              setTimeout(() => {
                reopen();
                refreshProgramApplications(data.program_id);
              }, 300);
            },
          });
        },
        onNo: (closeAlert) => {
          closeAlert();
          reopen();
        },
        yesLabel: 'Return',
        variant: 'danger',
      });
    }, 300);
  };
  const handleReject = () => {
    onClose();
    setTimeout(() => {
      showAlertWithRemarks({
        message: 'Are you sure you want to reject?',
        onYes: ({ remarks }, closeAlert) => {
          rejector.mutate({
            id: `${data.id}`,
            remarks,
            cb: () => {
              closeAlert();
              setTimeout(() => {
                reopen();
                refreshProgramApplications(data.program_id);
              }, 300);
            },
          });
        },
        yesLabel: 'Reject',
        variant: 'danger',
      });
    }, 300);
  };
  return (
    <div className="flex">
      <div className="flex-1 min-w-0">
        <div className="shadow-inner p-3 bg-gray-100 rounded-lg max-h-[85vh] overflow-auto">
          {startup ? (
            <StartUpPage data={startup} />
          ) : (
            <div className="text-center">Loading Startup Details...</div>
          )}
        </div>
      </div>
      <div className="w-80 ml-4 ">
        <div className="space-y-4">
          <Title>Application Details</Title>
          <InfoHorizontal label="Startup Name" labelWidth="110px">
            {startup?.name || '-'}
          </InfoHorizontal>
          <InfoHorizontal label="Business Address" labelWidth="110px">
            {startup?.display_address || '-'}
          </InfoHorizontal>
          <InfoHorizontal label="Applicant Name" labelWidth="110px">
            {application?.user_name || '-'}
          </InfoHorizontal>
          <InfoHorizontal label="Email Address" labelWidth="110px">
            {application?.user_email || '-'}
          </InfoHorizontal>
          <InfoHorizontal label="Contact Number" labelWidth="110px">
            {application?.user_mobile_no || '-'}
          </InfoHorizontal>
          <InfoHorizontal label="Status" labelWidth="110px">
            <ApplicationStatusBadge
              value={application?.status || data?.status}
            />
          </InfoHorizontal>
          <InfoHorizontal label="Submitted At" labelWidth="110px">
            {application?.submitted_at || data?.submitted_at}
          </InfoHorizontal>
          {data?.status === 'APPROVED' ? (
            <InfoHorizontal label="Approved At" labelWidth="110px">
              {application?.approved_at || data?.approved_at}
            </InfoHorizontal>
          ) : null}
          {data?.status === 'RETURNED' ? (
            <InfoHorizontal label="Returned At" labelWidth="110px">
              {application?.returned_at || data?.returned_at}
            </InfoHorizontal>
          ) : null}
          {data?.status === 'REJECTED' ? (
            <InfoHorizontal label="Rejected At" labelWidth="110px">
              {application?.rejected_at || data?.rejected_at}
            </InfoHorizontal>
          ) : null}
          <InfoHorizontal label="Remarks" labelWidth="110px">
            {application?.remarks || data?.remarks}
          </InfoHorizontal>
          <hr />
          <div className="space-y-4">
            <Title>Submitted Requirements</Title>
            {(application?.requirements || []).map((row) =>
              row ? <Requirement row={row} key={row.requirement_id} /> : null
            )}
          </div>
          <hr />
          {application?.status === 'FOR ASSESSMENT' ? (
            <div className="space-y-1">
              <Acl code={['applications-approve']}>
                <Button
                  className="w-full"
                  variant="success"
                  onClick={handleApprove}
                  disabled={approver.isLoading}
                >
                  Approve
                </Button>
              </Acl>
              <Acl code={['applications-return']}>
                <Button
                  className="w-full"
                  variant="warning"
                  onClick={handleReturn}
                  disabled={returner.isLoading}
                >
                  Return
                </Button>
              </Acl>
              <Acl code={['applications-reject']}>
                <Button
                  className="w-full"
                  variant="danger"
                  onClick={handleReject}
                  disabled={rejector.isLoading}
                >
                  Reject
                </Button>
              </Acl>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

interface IRequirement {
  row: TSubmittedRequirement;
}

const Requirement = ({ row }: IRequirement): JSX.Element => {
  const ext = row.value?.split('.').pop()?.toLowerCase() || '';
  const isFile =
    ext === 'pdf' || ext === 'docx' || ext === 'xlsx' || ext === 'pptx';

  if (row.type === 'FILE')
    return (
      <Link to={row.value} target="_blank">
        <Info label={row.label} className="mt-2">
          <div className="w-full relative pt-[56.25%] bg-gray-200">
            {isFile ? (
              <embed
                className="absolute inset-0 h-full w-full"
                src={row.value}
              />
            ) : (
              <img
                className="absolute inset-0 h-full w-full object-contain object-center py-1"
                src={row.value}
                alt={row.label}
              />
            )}
            {/* <Img className="absolute inset-0 h-full w-full" imgClassName="object-contain object-center" src={row.value} alt={row.label} /> */}
          </div>
        </Info>
      </Link>
    );

  return (
    <InfoHorizontal label={row.label} labelWidth="40%">
      {row.value}
    </InfoHorizontal>
  );
};
