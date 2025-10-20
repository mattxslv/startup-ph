import { showModal } from 'context/modal';
import { Button, ModalFooter, showAlert } from 'ui/components';
import { useReturnStartUp, useVerifyStartUp } from '../hooks/useStartUpMutate';
import { TReturnStartup } from '../startup';

export const showVerificationModal = (data: TReturnStartup) => {
  showModal({
    id: 'startup-verification',
    title: 'Review StartUp Details',
    component: VerificationModal,
    titleClose: true,
    size: 'lg',
    props: {
      data,
    },
  });
};

interface Props {
  data: TReturnStartup;
  onClose: () => void;
}

function VerificationModal({ data, onClose }: Props) {
  const verifyer = useVerifyStartUp();
  const returner = useReturnStartUp();
  // const rejecter = useRejectStartUp();
  const handleVerify = () => {
    showAlert({
      message: 'Are you sure you want to approve?',
      onYes: (closeAlert) => {
        verifyer.mutate(
          { id: `${data.id}` },
          {
            onSuccess: () => {
              closeAlert();
              onClose();
            },
          }
        );
      },
      yesLabel: 'Verify',
      variant: 'primary',
    });
  };
  const handleReturn = () => {
    showAlert({
      message: 'Are you sure you want to return?',
      onYes: (closeAlert) => {
        returner.mutate(
          { id: `${data.id}`, payload: data },
          {
            onSuccess: () => {
              closeAlert();
              onClose();
            },
          }
        );
      },
      yesLabel: 'Return',
      variant: 'danger',
    });
  };
  // const handleReject = () => {
  //   showAlert({
  //     message: 'Are you sure you want to reject?',
  //     onYes: (closeAlert) => {
  //       rejecter.mutate({ id: `${data.id}` }, {
  //         onSuccess: () => {
  //           closeAlert();
  //           onClose();
  //         }
  //       })
  //     },
  //     yesLabel: 'Reject',
  //     variant: 'danger'
  //   })
  // }
  return (
    <>
      {/* <StartUpDetails data={data} /> */}
      <ModalFooter>
        <div className="w-full flex justify-center space-x-2">
          <Button variant="success" onClick={handleVerify}>
            Verify
          </Button>
          <Button variant="warning" onClick={handleReturn}>
            Return
          </Button>
          {/* <Button variant="danger" onClick={handleReject}>Reject</Button> */}
        </div>
      </ModalFooter>
    </>
  );
}

export default VerificationModal;
