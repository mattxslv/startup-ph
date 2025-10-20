import { showModal } from 'context/modal';
import { FormikHelpers } from 'formik';
import { Button, ModalFooter } from 'ui/components';
import {
  Form,
  Input,
  InputDate,
  InputRichText,
  InputTextArea,
  useFormContext,
} from 'ui/forms';
import * as yup from 'yup';
import { useCreateProgram, useUpdateProgram } from '../hooks/useProgramMutate';
import { IProgram } from '../types';
import { InputDatasetOptions } from 'features/cms-dataset';
import InputFileV2 from 'ui/forms/input-file/InputFileV2';
import { useEffect } from 'react';

export const showProgramModal = (initialValue: Partial<IProgram>) => {
  showModal({
    id: 'program',
    title: initialValue?.id ? 'Edit Program' : 'Add Program',
    component: ProgramModal,
    size: 'lg',
    props: {
      initialValue: {
        ...initialState,
        ...initialValue,
      },
    },
  });
};

export const showProgramBodyModal = (initialValue: Partial<IProgram>) => {
  showModal({
    id: 'program-body',
    title: 'Program Details',
    size: 'lg',
    component: ProgramBodyModal,
    props: {
      initialValue: {
        ...initialState,
        ...initialValue,
      },
    },
  });
};

interface Props {
  initialValue: IProgram;
  onClose: () => void;
}

const initialState: IProgram = {
  id: '',
  agency: '',
  name: '',
  thumbnail_url: '',
  banner_url: '',
  type: '',
  date_start: '',
  date_end: '',
  description: '',
  is_verified_required: '1',
  body: '',
  is_open_for_application: 0,
  is_published: 0,
};

const validationSchema = yup.object().shape({
  agency: yup.string().required('Required'),
  type: yup.string().required('Required'),
  name: yup.string().required('Required'),
  description: yup.string().required('Required'),
  date_start: yup.string().when('is_open_for_application', {
    is: 1,
    then: (schema) => schema.required('Required'),
    otherwise: (schema) => schema.optional(),
  }),
  date_end: yup.string().when('is_open_for_application', {
    is: 1,
    then: (schema) => schema.required('Required'),
    otherwise: (schema) => schema.optional(),
  }),
});

function ProgramModal({ initialValue, onClose }: Props) {
  const isNew = Boolean(!initialValue.id);
  const creator = useCreateProgram();
  const updator = useUpdateProgram();

  const handleSubmit = (
    payload: IProgram,
    { setErrors }: FormikHelpers<IProgram>
  ) => {
    const notOpenPayload: IProgram = {
      ...payload,
      is_open_for_application: 0,
      date_start: '',
      date_end: '',
    };
    if (isNew) {
      creator.mutate(
        { payload: payload.is_open_for_application ? payload : notOpenPayload },
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
        payload: payload.is_open_for_application ? payload : notOpenPayload,
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
    <Form<IProgram>
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <div className="flex gap-x-5">
          <div className="w-48 flex flex-col gap-2 items-center">
            <InputFileV2 name="thumbnail_url" imageOnly />
            <small className="text-gray-400">*JPG, PNG(max. 5mb)</small>
          </div>

          <div className="flex flex-col gap-y-5 w-full">
            <InputDatasetOptions
              code="agency"
              name="agency"
              label="Agency"
              required
            />
            <InputDatasetOptions
              code="program-type"
              name="type"
              label="Type"
              required
            />
            <Input name="name" label="Name" required />

            <CheckboxApplication />

            {values?.is_open_for_application === 1 && (
              <div className="grid grid-cols-2 gap-5">
                <InputDate
                  name="date_start"
                  label="Application Start Date"
                  required
                />
                <InputDate
                  name="date_end"
                  label="Application End Date"
                  required
                />
              </div>
            )}

            <InputTextArea
              name="description"
              label="Description"
              placeholder="Add description here"
              required
            />

            <ModalFooter>
              <div className="grid grid-cols-2 gap-5 w-full">
                <Button onClick={onClose}>Cancel</Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={creator.isLoading || updator.isLoading}
                >
                  {isNew ? 'Add' : 'Save'}
                </Button>
              </div>
            </ModalFooter>
          </div>
        </div>
      )}
    </Form>
  );
}

const CheckboxApplication = () => {
  const { values, setFieldValue } = useFormContext();
  useEffect(() => {
    if (values?.date_start) {
      setFieldValue('is_open_for_application', 1);
    }
  }, []);
  return (
    <label className="flex gap-2">
      <input
        name="is_open_for_application"
        type="checkbox"
        className="form-checkbox rounded mt-[2px]"
        onChange={({ target }: React.ChangeEvent<HTMLInputElement>) =>
          setFieldValue('is_open_for_application', target.checked ? 1 : 0)
        }
        checked={Boolean(values?.is_open_for_application)}
        title="toggle"
      />
      <span className="text-sm">Open for applications</span>
    </label>
  );
};

function ProgramBodyModal({ initialValue, onClose }: Props) {
  const isNew = Boolean(!initialValue.id);
  const creator = useCreateProgram();
  const updator = useUpdateProgram();
  const handleSubmit = (
    payload: IProgram,
    { setErrors }: FormikHelpers<IProgram>
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
    <Form<IProgram>
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <InputRichText name="body" label="Details" required />
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

export default ProgramModal;
