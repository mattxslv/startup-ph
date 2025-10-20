import { ImagePreview } from 'components';
import { useState } from 'react';
import useInvestorRequirementsList from '../hooks/useInvestorRequirementsList';
import {
  HiCheckCircle,
  HiExclamation,
  HiOutlineDotsCircleHorizontal,
} from 'react-icons/hi';
import clsx from 'clsx';
import { Button, showAlert } from 'ui/components';
import {
  useApproveRequirement,
  useRejectRequirement,
} from '../hooks/useRequirementToggle';
import { useFinalApprove } from '../hooks/useInvestorStatusToggle';
import { IInvestor } from '../types';

type Props = {
  investor: IInvestor;
  onFinalApprove: () => void;
};

function InvestorRequirementReviewAction({ investor, onFinalApprove }: Props) {
  const investorId = investor.id!;
  const { isLoading, data: requirements } =
    useInvestorRequirementsList(investorId);
  const [selected, setSelected] = useState(0);
  const selectedData = requirements?.list?.[selected];

  const finalApprover = useFinalApprove();
  const approver = useApproveRequirement();
  const rejector = useRejectRequirement();
  const handleApproveDocument = () => {
    if (selectedData?.id)
      approver.mutate({ investorId, requirementId: selectedData.id });
  };
  const handleFinalApprover = () => {
    showAlert({
      message: 'This investor will be marked as approved, Continue?',
      onYes: (closeAlert) => {
        if (selectedData?.id)
          finalApprover.mutate(
            { id: investorId },
            {
              onSuccess: () => {
                closeAlert();
                onFinalApprove();
              },
            }
          );
      },
      yesLabel: 'Approve',
    });
  };
  const handleRejectDocument = () => {
    if (selectedData?.id)
      rejector.mutate({ investorId, requirementId: selectedData.id });
  };

  const approved_count = (requirements?.list || []).filter(
    (x) => x.status === 'Approved'
  ).length;
  const requirements_count = (requirements?.list || []).length;

  return (
    <div>
      <div className="flex justify-end items-center mb-3">
        <div
          className={clsx(
            'mr-3 text-sm',
            approved_count < requirements_count
              ? 'text-red-500'
              : 'text-green-500'
          )}
        >
          {approved_count} of {requirements_count} documents are verified.
        </div>
        <Button
          variant="success"
          onClick={handleFinalApprover}
          disabled={
            approved_count < requirements_count ||
            investor.status !== 'For Requirements Review'
          }
        >
          Mark this as Approved
        </Button>
      </div>
      <div className="flex">
        <div className="max-w-[240px] w-full mr-px">
          <div className="bg-slate-200 tracking-wide p-2 font-semibold text-sm">
            Documents
          </div>
          {(requirements?.list || []).length < 1 ? (
            <div className="text-center py-4 text-sm">
              {isLoading
                ? 'Loading...'
                : 'There are no submitted requirements.'}
            </div>
          ) : (
            <div className="flex-shrink-0 divide-y border">
              {(requirements?.list || []).map((item, i) => (
                <div
                  key={item.id}
                  className={clsx(
                    'relative flex items-center px-1 py-2 text-sm',
                    selected === i ? 'bg-slate-100 text-primary-base' : ''
                  )}
                >
                  <button
                    className="absolute inset-0 h-full w-full"
                    onClick={() => setSelected(i)}
                    type="button"
                    title="toggle"
                  />
                  {item.status === 'Approved' ? (
                    <HiCheckCircle className="w-4 h-4 flex-shrink-0 mx-2 text-green-500 bg-white rounded-full" />
                  ) : null}
                  {item.status === 'For Review' ? (
                    <HiOutlineDotsCircleHorizontal className="w-4 h-4 flex-shrink-0 mx-2" />
                  ) : null}
                  {item.status === 'For Submission' ? (
                    <HiOutlineDotsCircleHorizontal className="w-4 h-4 flex-shrink-0 mx-2" />
                  ) : null}
                  {item.status === 'Resubmit' ? (
                    <HiExclamation className="w-4 h-4 flex-shrink-0 mx-2 text-red-500 bg-white rounded-full" />
                  ) : null}
                  <div>{item.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex-1 ring-slate-300 ring-1">
          <ImagePreview
            list={
              selectedData
                ? [
                    {
                      filename: selectedData?.name,
                      file_url: selectedData?.file_url,
                    },
                  ]
                : []
            }
          />
          <div className="p-3">
            {selectedData?.status === 'For Review' ? (
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="success"
                  size="sm"
                  onClick={handleApproveDocument}
                  disabled={approver.isLoading}
                >
                  Verify Document
                </Button>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={handleRejectDocument}
                  disabled={rejector.isLoading}
                >
                  For Resubmit
                </Button>
              </div>
            ) : (
              <div>
                <Button className="w-full" disabled size="sm">
                  {selectedData?.status}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestorRequirementReviewAction;
