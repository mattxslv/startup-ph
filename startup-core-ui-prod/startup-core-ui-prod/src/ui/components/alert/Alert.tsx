import { showModal } from 'context/modal';
import { ReactNode, useState } from 'react';
import Button from '../button/Button';
import { ModalFooter } from '../modal/Modal';

interface Props {
  options: IAlertOptions;
  onClose: () => void;
}

interface IAlertOptions {
  onYes: (close: () => void | Promise<void>, cancel?: () => void) => void;
  onNo?: (close: () => void | Promise<void>, cancel?: () => void) => void;
  yesLabel?: string;
  noLabel?: string;
  title?: string;
  message: string | ReactNode;
  variant?: 'primary' | 'danger';
  size?: 'base' | 'sm' | 'lg' | 'xl';
}

export const showAlert = (options: IAlertOptions) => {
  showModal({
    id: 'alert',
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
  const handleYes = () => {
    if (options.onYes) {
      setIsLoading(true);
      options.onYes(onClose, () => {
        setIsLoading(false);
      });
      return;
    }
    onClose();
  };
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
    <>
      <div className="text-sm leading-5 text-description whitespace-pre-line">
        {options.message}
      </div>
      <ModalFooter>
        <Button
          variant={options.variant ?? 'primary'}
          onClick={handleYes}
          disabled={isLoading}
        >
          {options.yesLabel ?? 'Submit'}
        </Button>
        <Button onClick={handleNo} disabled={isLoading}>
          {options.noLabel ?? 'Cancel'}
        </Button>
      </ModalFooter>
    </>
  );
}
