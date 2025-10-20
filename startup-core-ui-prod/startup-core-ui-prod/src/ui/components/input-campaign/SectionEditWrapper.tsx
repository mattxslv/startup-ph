import React from 'react';
import { HiPencil } from 'react-icons/hi';
import Button from '../button/Button';
import { Acl } from 'features/profile';

type Props = {
  children: React.ReactNode;
  label?: string;
  fullClick?: boolean;
  onEdit: () => void;
};

function SectionEditWrapper({
  children,
  label = 'Edit',
  fullClick = true,
  onEdit,
}: Props) {
  return (
    <Acl
      code={['news-manage']}
      replace={
        <button
          className="absolute inset-0 h-full w-full z-30"
          type="button"
          disabled
        />
      }
    >
      <div className="relative border-2 border-primary-base border-dashed mb-[-2px]">
        {fullClick ? (
          <button
            className="absolute inset-0 h-full w-full z-30"
            type="button"
            onClick={() => {
              onEdit();
            }}
          />
        ) : null}
        <div className="absolute top-0 right-0 bg-black/20 rounded-bl-lg z-20">
          <Button
            className="text-white"
            onClick={() => onEdit()}
            variant="link"
            leadingIcon={<HiPencil />}
            size="xs"
          >
            {label}
          </Button>
        </div>
        {children}
      </div>
    </Acl>
  );
}

export default SectionEditWrapper;
