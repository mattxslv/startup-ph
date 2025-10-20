import clsx from 'clsx';
import { debounce } from 'lodash';
import { Transition } from '@headlessui/react';
import useOnClickOutside from 'hooks/useOnClickOutside';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

interface IContext {
  show: boolean;
  setShow: (v: boolean) => void;
}

const DropdownContext = createContext<IContext | null>(null);

interface Props {
  children: JSX.Element | JSX.Element[];
  width?: string;
  alignment?: 'left' | 'right';
}

interface IProps {
  children: JSX.Element | string;
  leadingIcon?: JSX.Element;
  trailingIcon?: JSX.Element;
  disabled?: boolean;
  onClick: () => void;
}

const MAP_ALIGNMENT_CLASS: Record<string, string> = {
  left: 'left-0',
  right: 'right-0',
};

export const DropdownItem = ({
  children,
  leadingIcon,
  trailingIcon,
  disabled,
  onClick,
}: IProps) => {
  const { setShow } = useContext(DropdownContext)!;
  return (
    <button
      className={clsx(
        'group truncate h-10 w-full flex items-center px-3 relative first:rounded-t last:rounded-b ring-outline-active rounded',
        'hover:bg-primary-light',
        'focus:outline-none focus:ring focus:z-10'
      )}
      disabled={disabled}
      onClick={() => {
        setShow(false);
        onClick();
      }}
    >
      {leadingIcon ? (
        <span className="group-active:text-primary-base mr-3 text-description">
          {leadingIcon}
        </span>
      ) : null}
      {children ? (
        <span className="group-active:text-primary-base group-disabled:text-disabled">
          {children}
        </span>
      ) : null}
      {trailingIcon ? (
        <span className="ml-auto text-description">{trailingIcon}</span>
      ) : null}
    </button>
  );
};

const Dropdown = forwardRef(({ children, width, alignment }: Props, ref) => {
  const divRef = useRef(null);
  const [show, setShow] = useState(false);
  // eslint-disable-next-line
  const debounceSet = useCallback(debounce(setShow, 150), [setShow]);
  useImperativeHandle(
    ref,
    () => ({
      show,
      setShow: (toggle: boolean) => setShow(toggle),
    }),
    [show, setShow]
  );
  useOnClickOutside(divRef, debounceSet);
  return (
    <DropdownContext.Provider value={{ show, setShow }}>
      <Transition
        show={show}
        enter="transition-opacity duration-75"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div ref={divRef} className="relative">
          <div
            className={clsx('absolute h-0', MAP_ALIGNMENT_CLASS[alignment!])}
            style={{ width }}
          >
            <div className="bg-white border rounded shadow-dropdown divide-y relative z-10">
              {children}
            </div>
          </div>
        </div>
      </Transition>
    </DropdownContext.Provider>
  );
});

Dropdown.displayName = 'Dropdown';

Dropdown.defaultProps = {
  width: '232px',
  alignment: 'right',
};

export default Dropdown;
