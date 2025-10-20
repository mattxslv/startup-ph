import * as yup from 'yup';
import { Button } from 'ui/components';
import { useSession } from 'context/session';
import { Form, Input, InputPassword } from 'ui/forms';
import { logo } from 'assets/images';
import { useLogin } from '../hooks/useLogin';
import FormTurnstile from 'ui/forms/FormTurnstile';

const INIT_STATE: TLoginForm = {
  email: '',
  password: '',
  captcha: '',
};

const validationSchema = yup.object().shape({
  email: yup.string().required('Required'),
  password: yup.string().required('Required'),
  captcha: yup.string().required('Required'),
});

function Login() {
  const [, setSession] = useSession(() => null);
  const mutator = useLogin();

  const handleSubmit = (payload: any) => {
    mutator.mutate(
      { payload },
      {
        onSuccess: (token) => {
          setSession({ isAuthenticated: true, token });
        },
      }
    );
  };

  return (
    <div className="max-w-lg bg-white/80 backdrop-blur-sm w-full mx-auto rounded p-10">
      <div className="space-y-2 mb-10 flex flex-col justify-center items-center">
        <div>
          <img className="h-12" src={logo} alt="" />
        </div>
        <div className="text-lg font-bold uppercase  ">Administrator Panel</div>
      </div>
      <Form
        initialValues={INIT_STATE}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <div className="space-y-4">
            <Input name="email" label="Email Address" required />
            <InputPassword name="password" label="Password" required />
            <FormTurnstile name="captcha" />
            <Button
              className="w-full"
              type="submit"
              variant="primary"
              disabled={mutator.isLoading || !values.captcha}
            >
              Login
            </Button>
          </div>
        )}
      </Form>
    </div>
  );
}

export default Login;
