import { useSession } from 'context/session';
import { useChangePassword } from 'features/profile/hooks/useChangePassword';
import { IChangePassword } from 'features/profile/types';
import { FormikHelpers } from 'formik';
import { Button } from 'ui/components';
import { Form, InputPassword } from 'ui/forms';
import * as yup from 'yup';

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

const UpdatePass = () => {
  const [, setSession] = useSession(() => null);
  const { isLoading, mutate } = useChangePassword();
  const handleSubmit = (
    payload: IChangePassword,
    { setErrors }: FormikHelpers<IChangePassword>
  ) => {
    mutate(
      { payload },
      {
        onSuccess: (token) => {
          setSession({ token });
          window.location.reload();
        },
        onError: (err: any) => {
          if (err?.errors) setErrors(err?.errors);
        },
      }
    );
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Form<IChangePassword>
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 w-[30%]"
      >
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
        <Button variant="primary" type="submit" disabled={isLoading}>
          Change Password
        </Button>
      </Form>
    </div>
  );
};

export default UpdatePass;
