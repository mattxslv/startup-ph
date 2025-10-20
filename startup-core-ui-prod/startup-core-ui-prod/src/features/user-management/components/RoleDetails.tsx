import { IRole } from 'features/role-permissions/types';
import Avatar from './Avatar';

interface Props {
  details: IRole;
}

const RoleDetails = ({ details }: Props) => {
  return (
    <div className="flex gap-4 items-center">
      <Avatar name={details.name} className="w-20 h-20 text-xl" />

      <div className="flex flex-col gap-1">
        <h1 className="font-semibold text-lg">
          {details.name}{' '}
          <span className="text-xs text-green-500 bg-green-50 rounded-full py-1 px-3 inline-flex items-center justify-center">
            Active
          </span>
        </h1>
      </div>
    </div>
  );
};

export default RoleDetails;
