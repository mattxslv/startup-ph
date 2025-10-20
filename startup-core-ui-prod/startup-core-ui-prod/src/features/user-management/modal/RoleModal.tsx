import { showModal } from 'context/modal';
import { FormikHelpers } from 'formik';
import { Button, ModalFooter } from 'ui/components';
import { Form, Input } from 'ui/forms';
import * as yup from 'yup';
import {
  useCreateRole,
  useUpdateRole,
} from '../../role-permissions/hooks/useRoleMutate';
import { IRole } from 'features/role-permissions/types';

export const showRoleModal = (initialValue?: Partial<IRole>) => {
  showModal({
    id: 'role',
    title: 'Role Name',
    size: 'sm',
    component: RoleModal,
    props: {
      initialValue: {
        ...initialState,
        ...initialValue,
      },
    },
  });
};

interface Props {
  initialValue: Partial<IRole>;
  onClose: () => void;
}

const initialState: Partial<IRole> = {
  name: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Required'),
});

function RoleModal({ initialValue, onClose }: Props) {
  const isNew = Boolean(!initialValue.id);
  const creator = useCreateRole();
  const updator = useUpdateRole();
  const handleSubmit = (
    payload: IRole,
    { setErrors }: FormikHelpers<IRole>
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
        id: String(initialValue.id!),
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
    <Form<IRole>
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Input name="name" label="Role" required />
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

export default RoleModal;
