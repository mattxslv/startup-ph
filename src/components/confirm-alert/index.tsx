import Button from "@/ui/button/Button";
import { ComponentProps, useEffect, useReducer } from "react";

type TAlert = {
  id: string
  message: string
  config?: TConfig
}

const defaultConfig: TConfig = {
  confirmLabel: 'Confirm',
  cancelLabel: 'Cancel',
  confirmVariant: 'primary',
  onConfirm: () => {},
  onCancel: () => {},
}

const initState:TState = {
  list: []
}

type TConfig = {
  confirmLabel: string
  cancelLabel: string
  confirmVariant?: ComponentProps<typeof Button>['variant'],
  onConfirm: () => void
  onCancel: () => void
}

type TState = {
  list: TAlert[]
}

type TDispatch = {
  type: 'APPEND',
  message: string
  config?: Partial<TConfig>
} | {
  type: 'OMIT',
  id: string,
}

function reducer(state: TState, action: TDispatch) {
  switch (action.type) {
    case 'APPEND':
      const newItems = state.list || [];
      newItems.unshift({ id: String(new Date().getTime()), message: action.message, config: { ...defaultConfig, ...action.config } })
      return { ...state, list: newItems, }
    case 'OMIT':
      return { ...state, list: state.list.filter((x) => x.id !== action.id) }
    default:
      return state;
  }
}

function ConfirmAlertItem({ data, onClose }: { data: TAlert, onClose: () => void }) {
  const handleConfirm = () => {
    data.config?.onConfirm();
    onClose();
  }
  const handleCancel = () => {
    data.config?.onCancel();
    onClose();
  }
  return (
    <div className="fixed inset-0 bg-black/30 z-[5000] flex">
      <div className="bg-white w-full max-w-sm m-auto p-6 border rounded-lg">
        <div className="mb-4 text-center font-semibold">
          {data.message}
        </div>
        <div className="flex justify-center space-x-4">
          <Button variant={data.config?.confirmVariant} onClick={handleConfirm}>{data.config?.confirmLabel}</Button>
          <Button onClick={handleCancel}>{data.config?.cancelLabel}</Button>
        </div>
      </div>
    </div>
  )
}

function ConfirmAlerts({ data, dispatch }: { data: TAlert[], dispatch: React.Dispatch<TDispatch> }) {
  if (data.length < 1) return null;
  return (
    <div className='fixed inset-0 z-[9999] flex flex-col items-end justify-start space-y-2 py-6 px-4'>
      {data.map((item) => (
        <ConfirmAlertItem
          key={item.id}
          data={item}
          onClose={() => {
            dispatch({ type: 'OMIT', id: item.id })
          }}
        />
      ))}
    </div>
  )
}

function createConfirmAlert() {
  let d: React.Dispatch<TDispatch> | undefined
  function ConfirmAlertProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initState);
    useEffect(() => {
      d = dispatch;
    }, [dispatch]);
    return (
      <>
        {children}
        <ConfirmAlerts data={state.list} dispatch={dispatch} />
      </>
    )
  }
  const confirmAlert = (message: string, config?: Partial<TConfig>) => {
    if (!d) return;
    d({
      type: 'APPEND',
      message,
      config,
    })
  }
  return {
    ConfirmAlertProvider,
    confirmAlert,
  }
}

const { ConfirmAlertProvider, confirmAlert } = createConfirmAlert();

export {
  ConfirmAlertProvider,
  confirmAlert,
}