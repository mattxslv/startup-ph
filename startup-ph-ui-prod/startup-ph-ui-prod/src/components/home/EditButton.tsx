import Button from '@/ui/button/Button'
import React from 'react'
import { HiPencil } from 'react-icons/hi'

type Props = {
  onClick: () => void;
}

function EditButton({ onClick }: Props) {
  return (
    <Button size="xs" variant="link" onClick={onClick}>
      <div className="flex items-center space-x-2">
        <span><HiPencil /></span>
        <span>Edit</span>
      </div>
    </Button>
  )
}

export default EditButton