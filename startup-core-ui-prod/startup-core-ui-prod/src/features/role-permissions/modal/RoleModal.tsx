import * as yup from 'yup';
import { FormikHelpers } from 'formik';
import { showModal } from 'context/modal';
import { Form, Input, InputTags } from 'ui/forms';
import { Button, ModalFooter } from 'ui/components';
// import { useRequirementOptions } from 'features/cms-requirements'

import { useCreateRole, useUpdateRole } from '../hooks/useRoleMutate';
import usePermissionOptions from '../hooks/usePermissionOptions';
import { IRole } from '../types';

export const showRoleModal = (initialValue: Partial<IRole>) => {
  showModal({
    id: 'role',
    title: 'Role',
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
  initialValue: IRole;
  onClose: () => void;
}

const initialState: IRole = {
  id: '',
  name: '',
  permissions: [],
  menu: '',
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
  const [isPermissionOptionsLoading, permissionOptions] =
    usePermissionOptions();
  // const [isRequirementOptionsLoading, requirementOptions] = useRequirementOptions()
  return (
    <Form<IRole>
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <>
          <div className="space-y-4">
            <Input name="name" label="Name" required />
          </div>
          <ModalFooter>
            <Button variant="primary" type="submit">
              {isNew ? 'Add' : 'Save'}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </>
      )}
    </Form>
  );
}

export default RoleModal;
