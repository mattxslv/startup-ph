import clsx from 'clsx';
import { IconType } from 'react-icons';
import { Notification } from 'ui/components';

interface Props {
  icon: IconType;
  hasNotification?: false;
}

function NavIcon({ icon: Icon, hasNotification }: Props) {
  return (
    <button
      className={clsx(
        'relative h-8 w-8 rounded-full flex items-center justify-center',
        'border border-transparent hover:border-outline hover:bg-fill-light active:border-transparent',
        'focus:outline-none focus:ring ring-outline-active'
      )}
      type="button"
      title="Nav Icon"
    >
      {hasNotification ? (
        <div className="absolute top-1 right-1.5">
          <Notification />
        </div>
      ) : null}
      <Icon className="h-5 w-5 text-description" />
    </button>
  );
}

export default NavIcon;
