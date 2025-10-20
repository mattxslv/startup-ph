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
import { useCreateNews, useUpdateNews } from '../hooks/useNewsMutate';
import { INews } from '../types';
import useDatasetOptions from 'features/cms-dataset/hooks/useDatasetOptions';
import { useProfile } from 'features/profile';

export const showNewsModal = (initialValue: Partial<INews>) => {
  showModal({
    id: 'news',
    title: 'News',
    size: 'lg',
    component: NewsModal,
    props: {
      initialValue: {
        ...initialState,
        ...initialValue,
      },
    },
  });
};

export const showNewsBodyModal = (initialValue: Partial<INews>) => {
  showModal({
    id: 'News-body',
    title: 'News Details',
    size: 'lg',
    component: NewsBodyModal,
    props: {
      initialValue: {
        ...initialState,
        ...initialValue,
      },
    },
  });
};

interface Props {
  initialValue: INews;
  onClose: () => void;
}

const initialState: INews = {
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

function NewsModal({ initialValue, onClose }: Props) {
  const { profile } = useProfile();
  const isNew = Boolean(!initialValue.id);
  const creator = useCreateNews();
  const updator = useUpdateNews();
  const handleSubmit = (
    payload: INews,
    { setErrors }: FormikHelpers<INews>
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
  const [isTagOptionsLoading, tagOptions] = useDatasetOptions('news-tags');
  const [isAgencyLoading, agencyOptions] = useDatasetOptions('agency');
  return (
    <Form<INews>
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

function NewsBodyModal({ initialValue, onClose }: Props) {
  const isNew = Boolean(!initialValue.id);
  const creator = useCreateNews();
  const updator = useUpdateNews();
  const handleSubmit = (
    payload: INews,
    { setErrors }: FormikHelpers<INews>
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
    <Form<INews>
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

export default NewsModal;
