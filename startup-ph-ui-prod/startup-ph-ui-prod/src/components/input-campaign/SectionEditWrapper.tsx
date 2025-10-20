import Button from '@/ui/button/Button';
import React from 'react'
import { HiPencil } from 'react-icons/hi';

type Props = {
  children: React.ReactNode
  label?: string
  fullClick?: boolean
  onEdit: () => void
}

function SectionEditWrapper({
  children,
  label = 'Edit',
  fullClick = true,
  onEdit,
}: Props) {
  return (
    <div className="relative border-2 border-primary border-dashed mb-[-2px] p-4 bg-white">
      {fullClick ? <button className="absolute inset-0 h-full w-full z-30" type="button" onClick={() => {
        onEdit();
      }} /> : null}
      <div className="absolute top-0 right-0 bg-black/20 rounded-bl-lg z-20">
        <Button className="text-white" onClick={() => onEdit()} variant="link" leading={<HiPencil />} size="xs">
          {label}
        </Button>
      </div>
      {children}
    </div>
  )
}

export default SectionEditWrapper
