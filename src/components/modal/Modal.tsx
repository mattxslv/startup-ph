import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useMemo, useState } from 'react';
import { HiX } from 'react-icons/hi';

export interface IModalConfig {
  size?: 'sm' | 'base' | 'lg' | 'xl';
  title?: string;
  titleClose?: boolean;
  closeOutsideClick?: boolean;
}

interface IModalChildProps {
  onClose: () => void;
}

interface Props extends IModalConfig {
  children: (props: IModalChildProps) => React.ReactNode;
  onClose: () => void;
}

const MAP_SIZE_CLASS = {
  sm: 'w-full max-w-[360px]',
  base: 'w-full max-w-[500px]',
  lg: 'w-full max-w-[800px]',
  xl: 'w-full max-w-[1140px]',
};

const doNothing = () => {
  /* do nothing */
};

function Modal({ children, size, onClose, title, titleClose, closeOutsideClick }: Props) {
  const [open, setOpen] = useState(true);
  const params = useMemo(
    () => ({
      onClose: () => {
        setOpen(false);
      },
    }),
    [setOpen]
  );
  return (
    <Transition.Root appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-40' onClose={closeOutsideClick ? setOpen : doNothing}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
          afterLeave={onClose}
        >
          <div className='fixed inset-0 bg-black bg-opacity-60 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto '>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0 '>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel
                className={clsx(
                  'relative transform rounded-lg border text-left bg-white shadow-modal transition-all w-full',
                  MAP_SIZE_CLASS[size ?? 'base']
                )}
              >
                {typeof title === 'string' ? (
                  <div className='px-6 pt-6 bg-fill-light flex justify-between'>
                    <div className='font-bold text-lg leading-[18px] truncate'>{title}</div>
                    {titleClose ? (
                      <button
                        className='h-2 w-2 hover:text-primary-base'
                        type='button'
                        title='Modal Close'
                        onClick={params.onClose}
                      >
                        <HiX />
                      </button>
                    ) : null}
                  </div>
                ) : null}
                <div className='p-6'>{children(params)}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export const ModalFooter = ({ children }: { children: React.ReactNode }) => (
  <div className='-mx-6 -mb-6 mt-6 pb-6 px-6 flex justify-start space-x-1 space-x-reverse flex-row-reverse'>
    {children}
  </div>
);

export default Modal;
