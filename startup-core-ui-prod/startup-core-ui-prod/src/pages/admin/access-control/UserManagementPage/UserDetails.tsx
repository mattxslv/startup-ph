import { Acl } from 'features/profile';
import Avatar from 'features/user-management/components/Avatar';
import useUserManagementById from 'features/user-management/hooks/useUserManagementById';
import { showUserManagementModal } from 'features/user-management/modal/UserManagementModal';
import { HiPencilAlt } from 'react-icons/hi';
import { useParams } from 'react-router-dom';
import { Button } from 'ui/components';

const UserDetails = () => {
  const { id } = useParams();
  const { isFetching, data: details } = useUserManagementById(id ?? '');

  const handleEdit = () => {
    showUserManagementModal(details);
  };

  if (!details)
    return (
      <div className="m-auto flex items-center justify-center text-sm font-semibold text-gray-400">
        {isFetching ? 'Loading...' : 'No details available'}
      </div>
    );

  return (
    <div className="p-4 flex flex-col flex-1 gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Avatar name={details.first_name} className="w-20 h-20 text-xl" />

          <div className="flex flex-col gap-1">
            <h1 className="font-semibold text-lg">
              {details.display_name}{' '}
              <span className="text-xs text-green-500 bg-green-50 rounded-full py-1 px-3 inline-flex items-center justify-center">
                Active
              </span>
            </h1>
            <small className="text-xs">{details.email}</small>
            <small className="text-xs">
              {details.agency} - {details.role_name}
            </small>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* <div className='flex items-center gap-1'>
            <InlineToggle
              label='Active'
              onChange={function (newValue: boolean): void {
                throw new Error('Function not implemented.');
              }}
              value={true}
            />
            <span className='text-sm font-semibold'>Acitve</span>
          </div> */}

          <Acl code="administrators-manage">
            <Button onClick={handleEdit} leadingIcon={<HiPencilAlt />}>
              Edit
            </Button>
          </Acl>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mr-auto m-4">
        <p className="text-sm text-disabled">First Name:</p>
        <p className="text-sm font-semibold">{details.first_name || 'N/A'}</p>
        <p className="text-sm text-disabled">Middle Name:</p>
        <p className="text-sm font-semibold">{details.middle_name || 'N/A'}</p>
        <p className="text-sm text-disabled">Last Name:</p>
        <p className="text-sm font-semibold">{details.last_name || 'N/A'}</p>
        <p className="text-sm text-disabled">Contact Number:</p>
        <p className="text-sm font-semibold">
          {details.contact_number || 'N/A'}
        </p>
        <p className="text-sm text-disabled">Agency:</p>
        <p className="text-sm font-semibold">{details.agency || 'N/A'}</p>
        <p className="text-sm text-disabled">Role:</p>
        <p className="text-sm font-semibold">{details.role_name || 'N/A'}</p>
        <p className="text-sm text-disabled">Email Address:</p>
        <p className="text-sm font-semibold">{details.email || 'N/A'}</p>
      </div>
    </div>
  );
};

export default UserDetails;
