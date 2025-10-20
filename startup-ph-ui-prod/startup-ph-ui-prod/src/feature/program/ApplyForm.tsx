import { Children } from 'react';
import { InputRequirement } from './InputRequirement';
import { useApplyProgram } from './hooks/useApplyProgram';
import useMyRequirement from './hooks/useMyRequirement';
import { TProgram } from './hooks/useProgram';
import { useResubmitProgram } from './hooks/useResubmitProgram';
import Form from '@/ui/form/Form';
import Button from '@/ui/button/Button';
import * as yup from 'yup';

export function ApplyForm({
  applicationId,
  isLoading = false,
  programId,
  requirements,
  onSuccess,
}: {
  applicationId?: string;
  isLoading?: boolean;
  programId: string;
  requirements: TProgram['requirements'];
  onSuccess: () => void;
}) {
  const { data: userRequirements } = useMyRequirement();
  const { isLoading: isApplyLoading, mutate } = useApplyProgram();
  const { isLoading: isResubmitLoading, mutate: resubmit } = useResubmitProgram();
  const schema = requirements.reduce(
    (o, req) =>
      Object.assign(o, {
        [String(req.id)]: req.is_required ? yup.string().required('Required') : yup.string(),
      }),
    {}
  );
  const validationSchema = yup.object().shape(schema);
  return (
    <Form
      validationSchema={validationSchema}
      key={JSON.stringify(userRequirements)}
      className='flex flex-col gap-2'
      initialValues={userRequirements || {}}
      onSubmit={(payload) => {
        const requirementsPayload = Object.keys(payload)
          .map((key) => ({
            requirement_id: requirements.find((x) => x.id === key)?.id || '',
            value: payload[key],
          }))
          .filter((x) => {
            return !!x?.requirement_id && x?.value !== userRequirements?.[x?.requirement_id];
          });
        if (applicationId) {
          resubmit(
            {
              application_id: applicationId,
              program_id: programId,
              requirements: requirementsPayload,
            },
            {
              onSuccess,
            }
          );
          return;
        }
        mutate(
          {
            program_id: programId,
            requirements: requirementsPayload,
          },
          {
            onSuccess,
          }
        );
      }}
    >
      {Children.toArray(requirements.map((row) => <InputRequirement data={row} />))}
      <div className='flex justify-center mt-4'>
        <Button
          className='w-full mb-4'
          variant='primary'
          type='submit'
          disabled={isLoading || isApplyLoading || isResubmitLoading}
        >
          {applicationId ? 'Re-Submit' : 'Apply'}
        </Button>
      </div>
    </Form>
  );
}
