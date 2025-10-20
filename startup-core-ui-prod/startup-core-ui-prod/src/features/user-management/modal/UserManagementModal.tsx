import { showModal } from 'context/modal';
import { FormikHelpers } from 'formik';
import { Button, ModalFooter } from 'ui/components';
import { Form, Input, InputPassword } from 'ui/forms';
import * as yup from 'yup';
import {
  useCreateUserManagement,
  useUpdateUserManagement,
} from '../hooks/useUserManagementMutate';
import { IUser } from '../types';
import SelectAgency from '../components/SelectAgency';
import SelectRole from '../components/SelectRole';
import useResetPass from '../hooks/useResetPass';

export const showUserManagementModal = (initialValue?: Partial<IUser>) => {
  showModal({
    id: 'user-management',
    title: initialValue?.id ? 'Edit User' : 'Add User',
    titleClose: true,
    // size: 'sm',
    component: UserManagementModal,
    props: {
      initialValue: {
        ...initialState,
        ...initialValue,
      },
    },
  });
};

interface Props {
  initialValue: IUser;
  onClose: () => void;
}

const initialState: Partial<IUser> = {
  id: '',
  email: '',
  photo_url: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  // password: '',
  // password_confirmation: '',
  contact_number: '',
  agency: '',
  display_name: '',
};

const validationSchema = yup.object().shape({
  photo_url: yup.string(),
  first_name: yup.string().required('Required'),
  middle_name: yup.string(),
  last_name: yup.string().required('Required'),
  contact_number: yup.string(),
  agency: yup.string().required('Required'),
  email: yup.string().email('Invalid format').required('Required'),
  role_id: yup.string().required('Required'),
  // password: yup.string().required('Required'),
  // password_confirmation: yup.string().required('Required'),
});

// const updateValidationSchema = yup.object().shape({
//   photo_url: yup.string(),
//   first_name: yup.string().required('Required'),
//   middle_name: yup.string(),
//   last_name: yup.string().required('Required'),
//   contact_number: yup.string(),
//   agency: yup.string().required('Required'),
//   email: yup.string().email('Invalid format').required('Required'),
//   role_id: yup.string().required('Required'),
// });

function UserManagementModal({ initialValue, onClose }: Props) {
  const isNew = Boolean(!initialValue.id);
  const creator = useCreateUserManagement();
  const updator = useUpdateUserManagement();
  const resetter = useResetPass();

  const handleSubmit = (
    payload: IUser,
    { setErrors }: FormikHelpers<IUser>
  ) => {
    if (isNew) {
      creator.mutate(
        { payload },
        {
          onSuccess: () => {
            onClose();
          },
          onError: (err: any) => {
            if (err?.errors) setErrors(err?.errors);
          },
        }
      );
      return;
    }
    updator.mutate(
      {
        id: `${initialValue.id}`,
        payload,
      },
      {
        onSuccess: () => {
          onClose();
        },
        onError: (err: any) => {
          if (err?.errors) setErrors(err?.errors);
        },
      }
    );
  };
  return (
    <Form<IUser>
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <Input name="first_name" label="First Name" required />
        <Input name="middle_name" label="Middle Name" />
        <Input name="last_name" label="Last Name" required />
        <Input name="contact_number" label="Contact Number" />
        <SelectAgency name="agency" label="Agency" required />
        <Input name="email" label="Email" required />
        <SelectRole name="role_id" label="Role" required />
        {/* {isNew ? (
          <>
            <InputPassword name='password' label='Password' required />
            <InputPassword name='password_confirmation' label='Password Confirmation' required />
          </>
        ) : null} */}
        {!isNew ? (
          <Button
            type="button"
            className="px-4 py-1"
            onClick={() => resetter.mutate({ id: String(initialValue.id) })}
          >
            Reset Password
          </Button>
        ) : null}
      </div>
      <ModalFooter>
        <Button
          variant="primary"
          type="submit"
          disabled={creator.isLoading || updator.isLoading}
        >
          {isNew ? 'Add' : 'Save'}
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </Form>
  );
}

export default UserManagementModal;
