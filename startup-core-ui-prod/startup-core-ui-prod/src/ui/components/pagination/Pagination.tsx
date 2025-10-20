import clsx from 'clsx';
import { showModal } from 'context/modal';
import { useMemo } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { IPagination } from 'types';
import { Form, Input } from 'ui/forms';
import * as yup from 'yup';
import Button from '../button/Button';
import { ModalFooter } from '../modal/Modal';

interface Props {
  className?: string;
  onChange?: React.Dispatch<React.SetStateAction<any>>;
  value?: IPagination;
}

function Pagination({ className, onChange, value }: Props) {
  const handlePrev = () => {
    if (!value?.current_page || !onChange) return;
    onChange((v: any) => ({ ...v, page: +value?.current_page - 1 }));
  };
  const handleNext = () => {
    if (!value?.current_page || !onChange) return;
    onChange((v: any) => ({ ...v, page: +value?.current_page + 1 }));
  };
  const handleJump = () => {
    showModal({
      id: 'pagination',
      size: 'sm',
      component: JumpToPage,
      props: {
        pager: value,
        onSubmit: (newPage: number) => {
          if (!onChange) return;
          onChange((v: any) => ({ ...v, page: newPage }));
        },
      },
    });
  };
  if (!value) return null;
  return (
    <div className={clsx('flex justify-between items-center', className)}>
      <div className="text-xs text-description">
        {value.from} - {value.to} of {value.total}
      </div>
      {value.last_page > 1 ? (
        <div className="flex">
          <Button
            className="rounded-r-none rounded-l ml-[-1px]"
            size="sm"
            onClick={handlePrev}
            disabled={value.current_page < 2}
          >
            <HiChevronLeft />
          </Button>
          <Button
            className="rounded-none ml-[-1px]"
            size="sm"
            onClick={handleJump}
          >
            {value.current_page} / {value.last_page}
          </Button>
          <Button
            className="rounded-l-none rounded-r ml-[-1px]"
            size="sm"
            onClick={handleNext}
            disabled={value.current_page >= value.last_page}
          >
            <HiChevronRight />
          </Button>
        </div>
      ) : null}
    </div>
  );
}

function JumpToPage({
  pager,
  onSubmit,
  onClose,
}: {
  pager: IPagination;
  onSubmit: (n: number) => void;
  onClose: () => void;
}) {
  const schema = useMemo(
    () =>
      yup.object().shape({
        page: yup
          .number()
          .typeError('Must be a number')
          .min(1, 'Invalid page')
          .max(pager.last_page, 'Invalid page')
          .required('Required'),
      }),
    [pager]
  );
  const handleSubmit = (payload: { page: number }) => {
    onSubmit(payload.page);
    onClose();
  };
  return (
    <Form
      initialValues={{ page: pager.current_page }}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <Input
          name="page"
          label={`Go to Page (1 to ${pager.last_page})`}
          required
          type="number"
        />
      </div>
      <ModalFooter>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </Form>
  );
}

export default Pagination;
