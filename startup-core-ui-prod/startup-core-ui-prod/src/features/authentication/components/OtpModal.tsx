import { showModal } from 'context/modal';
import { FormikHelpers } from 'formik';
import { Button, ModalFooter } from 'ui/components';
import { Form, InputOtp } from 'ui/forms';
import * as yup from 'yup';
import { useTwoFA } from '../hooks/useTwoFA';
import { useSession } from 'context/session';

export const showOtpModal = (authToken: string) => {
  showModal({
    id: 'otp-modal',
    // title: 'Otp Verification',
    component: OtpModal,
    props: { authToken },
  });
};

const validationSchema = yup.object().shape({
  pin: yup.string().required('Required'),
});

interface IProps {
  authToken: string;
  onClose: () => void;
}

function OtpModal({ authToken, onClose }: IProps) {
  const [, setSession] = useSession(() => null);
  const creator = useTwoFA();
  const initialValue: TTwoFAForm = {
    auth_token: authToken,
    pin: '',
  };

  const handleSubmit = (
    payload: TTwoFAForm,
    { setErrors }: FormikHelpers<TTwoFAForm>
  ) => {
    creator.mutate(
      {
        payload,
      },
      {
        onSuccess: (token) => {
          setSession({ isAuthenticated: true, token });
          onClose();
        },
        onError: (err: any) => {
          if (err?.errors) setErrors(err?.errors);
        },
      }
    );
  };
  return (
    <Form<TTwoFAForm>
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-6 text-center">
        <h1 className="text-2xl font-bold uppercase">OTP Verification</h1>

        <p className="text-sm text-gray-500">
          Enter the 6 digit code sent to your email
        </p>

        <InputOtp name="pin" length={6} required autoFocus />

        <div className="flex flex-col gap-2">
          <Button
            variant="primary"
            size="lg"
            type="submit"
            disabled={creator.isLoading}
          >
            Verify
          </Button>
          <Button variant="link" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default OtpModal;
