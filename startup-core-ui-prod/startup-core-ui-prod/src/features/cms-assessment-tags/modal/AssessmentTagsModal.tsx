import { showModal } from 'context/modal';
import { FormikHelpers } from 'formik';
import { Button, ModalFooter } from 'ui/components';
import { Form, Input } from 'ui/forms';
import * as yup from 'yup';
import {
  useCreateAssessmentTags,
  useUpdateAssessmentTags,
} from '../hooks/useAssessmentTagsMutate';

export const showAssessmentTagsModal = (
  initialValue: Partial<TAssessmentTags>
) => {
  showModal({
    id: 'assessment-tags',
    title: 'Assessment Tags',
    component: AssessmentTagsModal,
    props: {
      initialValue: {
        ...initialState,
        ...initialValue,
      },
    },
  });
};

interface Props {
  initialValue: TAssessmentTags;
  onClose: () => void;
}

const initialState: TAssessmentTags = {
  id: 0,
  code: '',
  description: '',
  notes: null,
  is_active: 0,
};

const validationSchema = yup.object().shape({
  code: yup.string().required('Required'),
  description: yup.string().required('Required'),
});

function AssessmentTagsModal({ initialValue, onClose }: Props) {
  const isNew = Boolean(!initialValue.id);
  const creator = useCreateAssessmentTags();
  const updator = useUpdateAssessmentTags();
  const handleSubmit = (
    payload: TAssessmentTags,
    { setErrors }: FormikHelpers<TAssessmentTags>
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
    <Form<TAssessmentTags>
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <Input name="code" label="Code" required />
        <Input name="description" label="Description" required />
        <Input name="notes" label="Notes" />
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

export default AssessmentTagsModal;
