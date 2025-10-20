import { showModal } from 'context/modal';
import { FormikHelpers } from 'formik';
import { Button, ModalFooter } from 'ui/components';
import { Form, Input, InputSelect } from 'ui/forms';
import * as yup from 'yup';
import {
  useCreateIntegration,
  useUpdateIntegration,
} from '../hooks/useIntegrationMutate';
import { IIntegration } from '../types';
import CopyToClipboard from 'components/copy-to-clipboard/CopyToClipboard';

export const showIntegrationModal = (initialValue: Partial<IIntegration>) => {
  showModal({
    id: 'integration',
    title: 'Integration',
    size: 'sm',
    component: IntegrationModal,
    props: {
      initialValue: {
        ...initialState,
        ...initialValue,
      },
    },
  });
};

interface Props {
  initialValue: IIntegration;
  onClose: () => void;
}

const initialState: IIntegration = {
  id: null,
  name: '',
  description: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Required'),
});

function IntegrationModal({ initialValue, onClose }: Props) {
  const isNew = Boolean(!initialValue.id);
  const creator = useCreateIntegration();
  const updator = useUpdateIntegration();
  const handleSubmit = (
    payload: IIntegration,
    { setErrors }: FormikHelpers<IIntegration>
  ) => {
    if (isNew) {
      creator.mutate(
        {
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
    <Form<IIntegration>
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <Input name="name" label="Partner Name" required />
        <Input name="description" label="Description" required />
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

export default IntegrationModal;
