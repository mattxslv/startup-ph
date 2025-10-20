import { showModal } from 'context/modal';
import { Button, ModalFooter } from 'ui/components';
import { Form, InputPassword } from 'ui/forms';
import { FormikHelpers } from 'formik';
import * as yup from 'yup';
import { IChangePassword } from '../types';
import { useChangePassword } from '../hooks/useChangePassword';
import { useSession } from 'context/session';

export const showChangePasswordModal = () => {
  showModal({
    id: 'change-password',
    title: 'Change Password',
    component: ChangePasswordModal,
    size: 'sm',
  });
};

interface Props {
  onClose: () => void;
}

const initialState: IChangePassword = {
  current_password: '',
  password: '',
  password_confirmation: '',
};

const validationSchema = yup.object().shape({
  current_password: yup.string().min(8, 'Atleast 8').required('Required'),
  password: yup.string().min(8, 'Atleast 8').required('Required'),
  password_confirmation: yup.string().min(8, 'Atleast 8').required('Required'),
});

function ChangePasswordModal({ onClose }: Props) {
  const { isLoading, mutate } = useChangePassword();
  const [, setSession] = useSession(() => null);
  const handleSubmit = (
    payload: IChangePassword,
    { setErrors }: FormikHelpers<IChangePassword>
  ) => {
    mutate(
      { payload },
      {
        onSuccess: (token) => {
          setSession({ token });
          onClose();
        },
        onError: (err: any) => {
          if (err?.errors) setErrors(err?.errors);
        },
      }
    );
  };
  return (
    <Form<IChangePassword>
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <InputPassword
          name="current_password"
          label="Current Password"
          required
        />
        <InputPassword
          name="password"
          label="New Password"
          required
          note="Must have 8 characters, symbol, uppercase, lowercase, and number"
        />
        <InputPassword
          name="password_confirmation"
          label="Password Confirmation"
          required
        />
      </div>
      <ModalFooter>
        <Button variant="primary" type="submit" disabled={isLoading}>
          Change Password
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </Form>
  );
}
