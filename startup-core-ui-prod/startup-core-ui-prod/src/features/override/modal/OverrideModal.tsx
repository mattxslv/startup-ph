import { showModal } from 'context/modal';
import { FormikHelpers } from 'formik';
import { Button, ModalFooter } from 'ui/components';
import { Form, Input, InputPassword } from 'ui/forms';
import * as yup from 'yup';
import {
  useCreateOverride,
  useUpdateOverride,
} from '../hooks/useOverrideMutate';
import { IOverride } from '../types';

export const showOverrideModal = (initialValue: Partial<IOverride>) => {
  showModal({
    id: 'override',
    title: 'Override',
    size: 'sm',
    component: OverrideModal,
    props: {
      initialValue: {
        ...initialState,
        ...initialValue,
      },
    },
  });
};

interface Props {
  initialValue: IOverride;
  onClose: () => void;
}

const initialState: IOverride = {
  id: null,
  name: '',
  code: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Required'),
  code: yup.string().required('Required'),
});

function OverrideModal({ initialValue, onClose }: Props) {
  const isNew = Boolean(!initialValue.id);
  const creator = useCreateOverride();
  const updator = useUpdateOverride();
  const handleSubmit = (
    payload: IOverride,
    { setErrors }: FormikHelpers<IOverride>
  ) => {
    if (isNew) {
      creator.mutate(
        {
          payload,
        },
        {
          onSuccess: (newId) => {
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
    <Form<IOverride>
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <Input name="name" label="Name" required />
        <InputPassword name="code" label="Code" required />
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

export default OverrideModal;
