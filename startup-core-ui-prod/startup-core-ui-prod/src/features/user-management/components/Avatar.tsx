import clsx from 'clsx';
import { Img } from 'ui/components';

interface Props {
  name: string;
  className?: string;
}

const Avatar = ({ name, className }: Props) => {
  return (
    <div
      className={clsx(
        'rounded-md flex justify-center items-center bg-fill-disabled p-4 font-semibold relative',
        className
      )}
    >
      {<Img alt={name} />}
      <span className="bg-green-500 rounded-full w-2 h-2 absolute -bottom-[0.1em] -right-[0.1em]" />
    </div>
  );
};

export default Avatar;
