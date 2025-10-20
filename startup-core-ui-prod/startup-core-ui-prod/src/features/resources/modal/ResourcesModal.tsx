import { showModal } from 'context/modal';
import { FormikHelpers } from 'formik';
import { Button, ModalFooter } from 'ui/components';
import {
  Form,
  Input,
  InputDate,
  InputRichText,
  InputSelect,
  InputTags,
} from 'ui/forms';
import * as yup from 'yup';
import {
  useCreateResources,
  useUpdateResources,
} from '../hooks/useResourcesMutate';
import { IResources } from '../types';
import useDatasetOptions from 'features/cms-dataset/hooks/useDatasetOptions';
import { useProfile } from 'features/profile';

export const showResourcesModal = (initialValue: Partial<IResources>) => {
  showModal({
    id: 'resources',
    title: 'Resources',
    size: 'lg',
    component: ResourcesModal,
    props: {
      initialValue: {
        ...initialState,
        ...initialValue,
      },
    },
  });
};

export const showResourcesBodyModal = (initialValue: Partial<IResources>) => {
  showModal({
    id: 'Resources-body',
    title: 'Resources Details',
    size: 'lg',
    component: ResourcesBodyModal,
    props: {
      initialValue: {
        ...initialState,
        ...initialValue,
      },
    },
  });
};

interface Props {
  initialValue: IResources;
  onClose: () => void;
}

const initialState: IResources = {
  id: '',
  title: '',
  sub_title: '',
  publish_date: '',
  publish_by: '',
  thumbnail_url: '',
  body: [],
  tags: [],
  agency: '',
};

const validationSchema = yup.object().shape({
  title: yup.string().required('Required'),
});

function ResourcesModal({ initialValue, onClose }: Props) {
  const { profile } = useProfile();
  const isNew = Boolean(!initialValue.id);
  const creator = useCreateResources();
  const updator = useUpdateResources();
  const handleSubmit = (
    payload: IResources,
    { setErrors }: FormikHelpers<IResources>
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
  const [isTagOptionsLoading, tagOptions] = useDatasetOptions('resources-tags');
  const [isAgencyLoading, agencyOptions] = useDatasetOptions('agency');
  return (
    <Form<IResources>
      initialValues={{ ...initialValue, publish_by: profile?.name || '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <Input name="title" label="Title" required />
        <Input name="sub_title" label="Sub Title" required />
        <div className="grid grid-cols-2 gap-2 relative">
          <InputDate name="publish_date" label="Publish Date" required />
          <Input name="publish_by" label="Publish By" required />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <InputTags
            name="tags"
            label="Tags"
            options={tagOptions}
            optionsLoading={isTagOptionsLoading}
            required
          />
          <InputSelect
            name="agency"
            label="Agency"
            options={agencyOptions}
            required
          />
        </div>
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

function ResourcesBodyModal({ initialValue, onClose }: Props) {
  const isNew = Boolean(!initialValue.id);
  const creator = useCreateResources();
  const updator = useUpdateResources();
  const handleSubmit = (
    payload: IResources,
    { setErrors }: FormikHelpers<IResources>
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
    <Form<IResources>
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

export default ResourcesModal;
