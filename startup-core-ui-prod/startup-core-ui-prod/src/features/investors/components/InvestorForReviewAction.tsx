import * as yup from 'yup';
import { Button, showAlert } from 'ui/components';
import { Form, Input, InputTextArea } from 'ui/forms';
import {
  useForRequirementsSubmissionInvestor,
  useRejectInvestor,
} from '../hooks/useInvestorStatusToggle';
import { EXPIRY_DATE_IN_DAYS_OPTION } from '../constants';
import InputToggleRequirements from './InputToggleRequirements';
import { IForReviewPayload, TInvestorStatus } from '../types';
import { validationForReviewSchema } from '../validations';

interface Props {
  investorId: string;
  onActionCallback: (status: TInvestorStatus) => void;
}

const INITIAL_VALUE: IForReviewPayload = {
  expiry_date_in_days: EXPIRY_DATE_IN_DAYS_OPTION[0].value,
  requirements: [],
};

const validationSchema = {};

function InvestorForReviewAction({ investorId, onActionCallback }: Props) {
  const approver = useForRequirementsSubmissionInvestor();
  const handleSubmit = (payload: IForReviewPayload) => {
    showAlert({
      message: `Are you sure you want to approve with ${payload.requirements.length} requirement/s?`,
      onYes: (closeAlert) => {
        closeAlert();
        approver.mutate({ id: investorId, payload });
        onActionCallback('Approved');
      },
      yesLabel: 'Approve',
    });
  };
  return (
    <>
      <div className="border p-3 border-green-600">
        <Form
          initialValues={INITIAL_VALUE}
          onSubmit={handleSubmit}
          validationSchema={validationForReviewSchema}
        >
          <div className="space-y-4 mb-4">
            <Input
              name="expiry_date_in_days"
              label="Provisional License Expiry (in Days)"
              // options={EXPIRY_DATE_IN_DAYS_OPTION}
              required
              type="number"
            />
            <InputToggleRequirements
              name="requirements"
              label="Attach Requirements to be fulfill by the investor"
            />
          </div>
          <div>
            <Button
              className="w-full"
              variant="success"
              disabled={approver.isLoading}
              type="submit"
            >
              Approve
            </Button>
          </div>
        </Form>
      </div>
      <div className="flex space-x-3 items-center">
        <div className="border-b flex-1" />
        <div className="py-4 text-sm text-slate-400">Or</div>
        <div className="border-b flex-1" />
      </div>
      <div className="border p-3 bg-red-50 border-red-600">
        <RejectForm
          investorId={investorId}
          onSuccess={() => onActionCallback('Rejected')}
        />
      </div>
    </>
  );
}

const rejectSchema = yup.object().shape({
  remarks: yup.string().required('Required'),
});

function RejectForm({
  investorId,
  onSuccess,
}: {
  investorId: string;
  onSuccess: () => void;
}) {
  const rejector = useRejectInvestor();
  const handleSubmit = (payload: { remarks: string }) => {
    showAlert({
      message: 'Are you sure you want to reject?',
      onYes: (closeAlert) => {
        closeAlert();
        rejector.mutate({ id: investorId, payload });
        onSuccess();
      },
      yesLabel: 'Reject',
      variant: 'danger',
    });
  };
  return (
    <Form
      initialValues={{ remarks: '' }}
      onSubmit={handleSubmit}
      validationSchema={rejectSchema}
    >
      <div className="mb-3">
        <InputTextArea
          name="remarks"
          label="Reject Remarks"
          placeholder="Enter reason for reject..."
          required
        />
      </div>
      <div>
        <Button
          className="w-full"
          variant="danger"
          disabled={rejector.isLoading}
          type="submit"
        >
          Reject
        </Button>
      </div>
    </Form>
  );
}

export default InvestorForReviewAction;
