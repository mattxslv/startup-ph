import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { ILightboxItem } from './types';

interface Props {
  show: boolean;
  data: ILightboxItem[];
  onClose: () => void;
}

function LightBox({ show, data, onClose }: Props) {
  const [selected] = useState<ILightboxItem>(data[0]); // TODO: CYCLE BETWEEN IMAGES/ASSETS
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-30" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-5xl transform shadow-modal transition-all relative">
                <div className="absolute left-[50%] translate-x-[-50%] text-xs text-white -translate-y-full">
                  Click outside to close.
                </div>
                <div className="h-[700px] bg-[#fff]">
                  {selected?.type === 'pdf' ? (
                    <iframe
                      className="h-full w-full"
                      src={selected.url}
                      title={selected.label}
                    />
                  ) : null}
                  {selected?.type === 'image' ? (
                    <div className="h-full w-full relative isolate overflow-hidden">
                      <img
                        className="absolute inset-0 h-full w-full object-center object-contain z-10"
                        src={selected.url}
                        alt={selected.label}
                      />
                      <img
                        className="absolute inset-0 h-full w-full object-center object-cover blur-md"
                        src={selected.url}
                        alt={selected.label}
                      />
                    </div>
                  ) : null}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default LightBox;
