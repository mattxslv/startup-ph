'use client';
import { v4 } from 'uuid'
import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { useEffect, useReducer, useState, Fragment } from 'react'
import { HiCheckCircle, HiExclamation, HiExclamationCircle, HiInformationCircle, HiX } from 'react-icons/hi'

function generateUuid() {
  return v4()
}

type TToastType = 'default' | 'success' | 'warning' | 'error' | 'info'

interface IToast {
  id: string
  message: string
  type: TToastType
  config: IToastConfig
}

const DEFAULT_CONFIG = {
  timeout: 3500
}

interface IToastConfig {
  timeout?: number
  description?: string
}

interface IToastState {
  items: IToast[]
}

const INIT_STATE: IToastState = {
  items: []
}

const NOT_SETUP_MSG = 'You have not defined the wrapper'

const TIMEOUT_BAR_CLASS = {
  default: 'bg-slate-500',
  success: 'bg-success',
  warning: 'bg-yellow-500',
  error: 'bg-danger',
  info: 'bg-teal-500'
}

const MAP_BG_CLASS = {
  default: 'bg-white',
  success: 'bg-green-100',
  warning: 'bg-yellow-100',
  error: 'bg-red-100',
  info: 'bg-teal-100'
}

const MAP_ICON = {
  default: <HiCheckCircle className='h-6 w-6 text-slate-600' aria-hidden='true' />,
  success: <HiCheckCircle className='h-6 w-6 text-success' aria-hidden='true' />,
  error: <HiExclamation className='h-6 w-6 text-danger' aria-hidden='true' />,
  warning: <HiExclamationCircle className='h-6 w-6 text-yellow-600' aria-hidden='true' />,
  info: <HiInformationCircle className='h-6 w-6 text-teal-600' aria-hidden='true' />
}

const Toast = (() => {
  let dispatch: React.Dispatch<any> | undefined
  return ({
    init: (d: React.Dispatch<any>) => {
      dispatch = d
    },
    destroy: (id: string) => {
      if (!dispatch) return console.warn(NOT_SETUP_MSG)
      dispatch({ type: 'OMIT_TOAST', id })
    },
    default: (message: string, config?: IToastConfig) => {
      if (!dispatch) return console.warn(NOT_SETUP_MSG)
      dispatch({
        type: 'APPEND_TOAST',
        data: {
          id: generateUuid(),
          message,
          type: 'default',
          config: { ...DEFAULT_CONFIG, ...config }
        }
      })
    },
    success: (message: string, config?: IToastConfig) => {
      if (!dispatch) return console.warn(NOT_SETUP_MSG)
      dispatch({
        type: 'APPEND_TOAST',
        data: {
          id: generateUuid(),
          message,
          type: 'success',
          config: { ...DEFAULT_CONFIG, ...config }
        }
      })
    },
    error: (message: string, config?: IToastConfig) => {
      if (!dispatch) return console.warn(NOT_SETUP_MSG)
      dispatch({
        type: 'APPEND_TOAST',
        data: {
          id: generateUuid(),
          message,
          type: 'error',
          config: { ...DEFAULT_CONFIG, ...config }
        }
      })
    },
    warning: (message: string, config?: IToastConfig) => {
      if (!dispatch) return console.warn(NOT_SETUP_MSG)
      dispatch({
        type: 'APPEND_TOAST',
        data: {
          id: generateUuid(),
          message,
          type: 'warning',
          config: { ...DEFAULT_CONFIG, ...config }
        }
      })
    },
    info: (message: string, config?: IToastConfig) => {
      if (!dispatch) return console.warn(NOT_SETUP_MSG)
      dispatch({
        type: 'APPEND_TOAST',
        data: {
          id: generateUuid(),
          message,
          type: 'info',
          config: { ...DEFAULT_CONFIG, ...config }
        }
      })
    }
  })
})()

function reducer(state: IToastState, action: any) {
  switch (action.type) {
    case 'APPEND_TOAST':
      // eslint-disable-next-line no-case-declarations
      const newItems = state.items
      newItems.unshift(action.data)
      return { ...state, items: newItems }
    case 'OMIT_TOAST':
      return { ...state, items: state.items.filter((x: IToast) => x.id !== action.id) }
    default:
      // do nothing
      return state
  }
}

const ToastItem = (props: IToast) => {
  const [show, setShow] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      setShow(false)
    }, props.config.timeout)
  }, [props.config.timeout])
  const handleCleanUp = () => {
    Toast.destroy(props.id)
  }
  const [timeoutWidth, setTimeoutWidth] = useState('100%')
  useEffect(() => {
    setTimeout(() => {
      setTimeoutWidth('0%')
    }, 10)
  }, [])
  return (
    <Transition
      appear
      show={show}
      as={Fragment}
      enter='transition-all ease-in duration-150'
      enterFrom='opacity-0 translate-x-[50%]'
      enterTo='opacity-100 translate-x-0'
      leave='transition-all ease-out duration-100'
      leaveFrom='opacity-100 translate-x-0'
      leaveTo='opacity-0 translate-x-[50%]'
      afterLeave={handleCleanUp}
    >
      <div className={clsx('flex-shrink-0 pointer-events-auto w-full max-w-md overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 relative', MAP_BG_CLASS[props.type])}>
        <div className='p-4'>
          <div className='flex items-start'>
            <div className='flex-shrink-0'>
              {MAP_ICON[props.type]}
            </div>
            <div className='ml-3 w-0 flex-1 pt-0.5'>
              <p className='text-base leading-[18px] font-semibold text-black'>{props.message}</p>
              {props?.config?.description ? <p className='mt-3 text-sm leading-5 text-description'>{props?.config?.description}</p> : null}
            </div>
            <div className='ml-4 flex flex-shrink-0'>
              <button
                type='button'
                className={clsx('inline-flex rounded-md text-description hover:text-black focus:outline-none focus:ring-2 focus:ring-outline-active focus:ring-offset-2', MAP_BG_CLASS[props.type])}
                onClick={() => {
                  setShow(false)
                }}
              >
                <span className='sr-only'>Close</span>
                <HiX className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>
        <div key={props.id} className={clsx('absolute h-1 bottom-0 left-0 transition-all ease-linear', TIMEOUT_BAR_CLASS[props.type])} style={{
          width: timeoutWidth,
          transitionDuration: `${props.config.timeout}ms`
        }} />
      </div>
    </Transition>
  )
}

const ToastItems = ({ data }: { data: IToast[] }) => {
  if (data.length < 1) return null
  return (
    <div className='fixed inset-0 z-[9999] pointer-events-none flex flex-col items-end justify-start space-y-2 py-6 px-4'>
      {data.map((item: IToast) => (
        <ToastItem key={item.id} {...item} />
      ))}
    </div>
  )
}

export const ToastProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE)
  useEffect(() => {
    Toast.init(dispatch)
  }, [])
  return (
    <>
      {children}
      <ToastItems data={state.items} />
    </>
  )
}

export default Toast
