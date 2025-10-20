import clsx from 'clsx';
import {
  HiCheckCircle,
  HiExclamation,
  HiInformationCircle,
  HiQuestionMarkCircle,
  HiXCircle,
} from 'react-icons/hi';

interface IProps {
  type: 'base' | 'info' | 'warning' | 'danger' | 'success';
  title: string;
  content?: React.ReactNode;
}

const MAP_COLOR: Record<string, string> = {
  base: 'text-primary-base',
  info: 'text-info-base',
  warning: 'text-warning-base',
  danger: 'text-danger-base',
  success: 'text-success-base',
};

const MAP_ICON: Record<string, any> = {
  base: <HiQuestionMarkCircle className="h-6 w-6" />,
  info: <HiInformationCircle className="h-6 w-6" />,
  warning: <HiExclamation className="h-6 w-6" />,
  danger: <HiXCircle className="h-6 w-6" />,
  success: <HiCheckCircle className="h-6 w-6" />,
};

function MessageBox({ type, title, content }: IProps) {
  return (
    <div className="p-6 bg-danger-light border border-danger-base rounded">
      <div className="flex">
        <div className={clsx('flex-shrink-0 pr-3', MAP_COLOR[type])}>
          {MAP_ICON[type]}
        </div>
        <div className="flex-1 min-w-0 space-y-3">
          <div className="font-semibold text-black">{title}</div>
          {content ? (
            <span className="text-description text-sm">{content}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default MessageBox;
