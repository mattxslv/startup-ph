import { showModal } from 'context/modal';
import { ReactNode, useState } from 'react';
import Button from '../button/Button';
import { ModalFooter } from '../modal/Modal';
import { Form, InputTextArea } from 'ui/forms';

interface Props {
  options: IAlertOptions;
  onClose: () => void;
}

const initialValue = { remarks: '' };

interface IAlertOptions {
  onYes: (
    payload: typeof initialValue,
    close: () => void | Promise<void>,
    cancel?: () => void
  ) => void;
  onNo?: (close: () => void | Promise<void>, cancel?: () => void) => void;
  yesLabel?: string;
  noLabel?: string;
  title?: string;
  message: string | ReactNode;
  variant?: 'primary' | 'danger';
  size?: 'base' | 'sm' | 'lg' | 'xl';
}

export const showAlertWithRemarks = (options: IAlertOptions) => {
  showModal({
    id: 'alert-with-remarks',
    title: options.title ?? 'Confirmation',
    component: AlertModal,
    closeOutsideClick: true,
    size: options.size ?? 'sm',
    props: {
      options,
    },
  });
};

function AlertModal({ options, onClose }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleNo = () => {
    if (options.onNo) {
      setIsLoading(true);
      options.onNo(onClose, () => {
        setIsLoading(false);
      });
      return;
    }
    onClose();
  };
  return (
    <Form<typeof initialValue>
      initialValues={initialValue}
      onSubmit={(payload) => {
        if (options.onYes) {
          setIsLoading(true);
          options.onYes(payload, onClose, () => {
            setIsLoading(false);
          });
          return;
        }
        onClose();
      }}
    >
      <div className="text-sm leading-5 text-description whitespace-pre-line">
        {options.message}
      </div>
      <div>
        <InputTextArea name="remarks" label="Remarks" required />
      </div>
      <ModalFooter>
        <Button
          variant={options.variant ?? 'primary'}
          type="submit"
          disabled={isLoading}
        >
          {options.yesLabel ?? 'Submit'}
        </Button>
        <Button onClick={handleNo} disabled={isLoading}>
          {options.noLabel ?? 'Cancel'}
        </Button>
      </ModalFooter>
    </Form>
  );
}
