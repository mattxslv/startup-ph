import { showModal } from 'context/modal';
import { FormikHelpers } from 'formik';
import { Button, ModalFooter } from 'ui/components';
import { Form, Input, InputSelect } from 'ui/forms';
import * as yup from 'yup';
import {
  useCreateRequirement,
  useUpdateRequirement,
} from '../hooks/useRequirementMutate';
import { IRequirement } from '../types';

export const showRequirementModal = (initialValue: Partial<IRequirement>) => {
  showModal({
    id: 'requirement',
    title: 'Requirement',
    component: RequirementModal,
    props: {
      initialValue: {
        ...initialState,
        ...initialValue,
      },
    },
  });
};

interface Props {
  initialValue: IRequirement;
  onClose: () => void;
}

const TYPE_OPTIONS = [
  { label: 'Input', value: 'INPUT' },
  { label: 'File', value: 'FILE' },
];

const initialState: IRequirement = {
  id: '',
  code: '',
  name: '',
  description: '',
  type: 'INPUT',
};

const validationSchema = yup.object().shape({
  code: yup.string().required('Required'),
  name: yup.string().required('Required'),
  type: yup.string().required('Required'),
});

function RequirementModal({ initialValue, onClose }: Props) {
  const isNew = Boolean(!initialValue.id);
  const creator = useCreateRequirement();
  const updator = useUpdateRequirement();
  const handleSubmit = (
    payload: IRequirement,
    { setErrors }: FormikHelpers<IRequirement>
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
    <Form<IRequirement>
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-2">
            <Input name="code" label="Code" required />
          </div>
          <InputSelect
            name="type"
            label="Type"
            required
            options={TYPE_OPTIONS}
          />
        </div>
        <Input name="name" label="Name" required />
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

export default RequirementModal;
