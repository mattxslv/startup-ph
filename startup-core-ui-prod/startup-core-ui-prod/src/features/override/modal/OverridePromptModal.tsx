import * as yup from 'yup';
import { showModal } from 'context/modal';
import { Form, InputPassword } from 'ui/forms';
import { Button, ModalFooter } from 'ui/components';

export const showOverridePrompt = () =>
  new Promise<string>((onSubmit) => {
    showModal({
      id: 'override',
      title: undefined,
      size: 'sm',
      component: OverridePromptModal,
      props: {
        onSubmit,
      },
    });
  });

interface Props {
  onSubmit: (code: string | undefined) => void;
  onClose: () => void;
}

const initialValue: IPayload = {
  code: '',
};

interface IPayload {
  code: string;
}

const validationSchema = yup.object().shape({
  code: yup.string().required('Required'),
});

function OverridePromptModal({ onSubmit, onClose }: Props) {
  const handleSubmit = (payload: IPayload) => {
    onSubmit(payload.code);
    onClose();
  };
  return (
    <Form<IPayload>
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <InputPassword name="code" label="Enter Override Code" required />
      <ModalFooter>
        <Button variant="primary" type="submit">
          Override
        </Button>
        <Button
          onClick={() => {
            onSubmit(undefined);
            onClose();
          }}
        >
          Cancel
        </Button>
      </ModalFooter>
    </Form>
  );
}

export default OverridePromptModal;
