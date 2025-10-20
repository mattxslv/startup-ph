import { showModal } from 'context/modal';
import { FormikHelpers } from 'formik';
import { Button, ModalFooter } from 'ui/components';
import { Form, Input } from 'ui/forms';
import * as yup from 'yup';
import { useCreateDataset, useUpdateDataset } from '../hooks/useDatasetMutate';
import { IDataset } from '../types';

export const showDatasetModal = (
  code: string,
  initialValue: Partial<IDataset>
) => {
  showModal({
    id: 'dataset',
    title: 'Dataset',
    component: DatasetModal,
    props: {
      code,
      initialValue: {
        ...initialState,
        ...initialValue,
      },
    },
  });
};

interface Props {
  code: string;
  initialValue: IDataset;
  onClose: () => void;
}

const initialState: IDataset = {
  id: '',
  code: '',
  label: '',
  description: '',
};

const validationSchema = yup.object().shape({
  label: yup.string().required('Required'),
});

function DatasetModal({ code, initialValue, onClose }: Props) {
  const isNew = Boolean(!initialValue.id);
  const creator = useCreateDataset(code);
  const updator = useUpdateDataset(code);
  const handleSubmit = (
    payload: IDataset,
    { setErrors }: FormikHelpers<IDataset>
  ) => {
    if (isNew) {
      creator.mutate(
        {
          payload: { ...payload, code },
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
        payload: { ...payload, code },
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
    <Form<IDataset>
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <Input name="label" label="Label" required />
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

export default DatasetModal;
