import { showModal } from 'context/modal';
import { Button, Toast } from 'ui/components';
import { ReactNode, SyntheticEvent, useState } from 'react';
import { useReturnStartUp } from '../hooks/useStartUpMutate';
import { FormikHelpers } from 'formik';
import { Form, InputTextArea } from 'ui/forms';
import useAssessmentTagList from '../hooks/useAssessmentTagList';
import { isEmpty } from 'lodash';
import { TReturnStartup } from '../startup';

interface Props {
  initialValue: TReturnStartup;
  onClose: () => void;
}

const initialState: Omit<TReturnStartup, 'id'> = {
  assessment_tags: [],
  remarks: '',
};

// const validationSchema = yup
//   .object()
//   .shape({
//     'assessment_tags': yup.array(),
//     'remarks': yup.string(),
//   })
//   .test(
//     'assessment_tags or remarks',
//     'Either one reason is required',
//     (value) => false
//     // (has(value, 'assessment_tags') && !isEmpty(value.assessment_tags)) || has(value, 'remarks')
//   );

export const showStartupReturnModal = (
  initialValue: Partial<TReturnStartup>
) => {
  showModal({
    id: 'startup-return',
    title: 'Flag Application',
    size: 'lg',
    component: StartupReturnModal,
    props: {
      initialValue: {
        ...initialState,
        ...initialValue,
      },
    },
  });
};

function StartupReturnModal({ initialValue, onClose }: Props) {
  const returner = useReturnStartUp();
  const { isFetching, data: tagList } = useAssessmentTagList();
  const [tags, setTags] = useState<Array<string>>([]);

  const handleSubmit = (
    payload: Omit<TReturnStartup, 'id'>,
    { setErrors }: FormikHelpers<TReturnStartup>
  ) => {
    if (!payload.remarks && isEmpty(tags)) {
      Toast.error('Either one reason is required');
      return;
    }
    payload = { remarks: payload.remarks, assessment_tags: tags };
    returner.mutate(
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

  const handleChange = (e: SyntheticEvent): void => {
    const { value } = e.target as HTMLInputElement;

    setTags((prevState) =>
      prevState.includes(value)
        ? prevState.filter((item) => item !== value)
        : [...prevState, value]
    );
  };

  return (
    <Form<TReturnStartup>
      className="space-y-4"
      initialValues={initialValue}
      // validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <p className="text-sm text-gray-600">
        Are you sure you want to disapprove this application? Select your
        reason.
      </p>

      <LoadingWrapper isLoading={isFetching}>
        {tagList?.map((item, index) => (
          <label className="flex gap-2" key={index}>
            <input
              type="checkbox"
              className="form-checkbox rounded mt-[2px]"
              onChange={handleChange}
              checked={tags.includes(item.code)}
              title="toggle"
              value={item.code}
            />
            <span className="text-sm">{item.description}</span>
          </label>
        ))}
      </LoadingWrapper>

      <input type="text" className="absolute -z-10 opacity-0" />

      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold">Other Remarks</span>
        <InputTextArea
          title="Reasons"
          name="remarks"
          placeholder="What's your reason?"
        />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <Button onClick={onClose}>Cancel</Button>
        <Button
          type="submit"
          className="bg-red-500 text-white hover:bg-red-400"
        >
          Return to User
        </Button>
      </div>
    </Form>
  );
}

interface ILoadingWrapperProps {
  isLoading: boolean;
  children: ReactNode;
}

const LoadingWrapper = ({
  isLoading,
  children,
}: ILoadingWrapperProps): JSX.Element => {
  if (!isLoading) return <>{children}</>;

  return (
    <div className="flex flex-col gap-5">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="h-5 w-full animate-pulse bg-fill-dark rounded"
        />
      ))}
    </div>
  );
};
