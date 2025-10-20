import { createContext, useMemo, useReducer, useEffect } from 'react';
import { IModalConfig } from 'ui/components/modal/Modal';
import { Modal } from 'ui/components';

interface IModal<T = unknown> extends Partial<IModalConfig> {
  id: string;
  component: React.ElementType;
  props?: T;
}

interface IModalContext {
  modals: Record<string, IModal>;
}

const ModalContext = createContext<IModalContext | null>(null);

const initialState: Record<string, IModal> = {};

// eslint-disable-next-line
const omit = (obj: any, str: string) => {
  const res = Object.assign({}, obj);
  delete res[str];
  return res;
};

function reducer(
  state: Record<string, IModal>,
  action: { type: string; data: Partial<IModal> }
) {
  switch (action.type) {
    case 'APPEND':
      return Object.assign({}, state, {
        [action?.data?.id ?? '-']: action.data,
      });
    case 'OMIT':
      return omit(state, action?.data?.id ?? '-');
    default:
      return state;
  }
}

function createModalInstance() {
  // eslint-disable-next-line
  let dispatcher: any
  function Provider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(
      () => ({
        modals: state,
      }),
      [state]
    );
    useEffect(() => {
      dispatcher = dispatch;
    }, []);
    return (
      <ModalContext.Provider value={value}>
        {children}
        {Object.keys(state).map((key) => {
          const { component: C, props, ...rest } = state[key];
          return (
            <Modal
              key={key}
              {...rest}
              onClose={() => dispatch({ type: 'OMIT', data: { id: key } })}
            >
              {({ onClose }: { onClose: () => void }) => (
                <C {...(props ?? {})} onClose={onClose} />
              )}
            </Modal>
          );
        })}
      </ModalContext.Provider>
    );
  }
  function showModal<T>(data: IModal<T>) {
    if (!dispatcher) {
      throw new Error('Modal is not initialized!');
    }
    dispatcher({
      type: 'APPEND',
      data,
    });
  }
  return {
    Provider,
    showModal,
  };
}

const { Provider, showModal } = createModalInstance();

export { Provider, showModal };
