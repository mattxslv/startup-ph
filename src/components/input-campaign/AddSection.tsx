import React from 'react'
import Title from '../home/Title'
import Button from '@/ui/button/Button'
import { HiPhotograph, HiPlay, HiViewList, HiX } from 'react-icons/hi'
import { Section } from './types'
import { INIT_SECTION } from './constants'

type Props = {
  onSelect: (newValue: Section) => void
  onClose: () => void
}

type ItemProps = {
  label: string
  icon: React.ReactNode
  onSelect: () => void
}

function SectionItem({ label, icon, onSelect }: ItemProps) {
  return (
    <button className="border-2 rounded-lg w-full py-2" type="button" onClick={() => onSelect()}>
      <div className="flex flex-col items-center space-y-2">
        {icon}
        <div className="text-center text-sm font-semibold">{label}</div>
      </div>
    </button>
  )
}

function AddSection({ onSelect, onClose }: Props) {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <Title label="Select Section" />
        <Button size="xs" onClick={() => onClose()}><HiX /></Button>
      </div>
      <div className="space-y-2">
        <SectionItem
          label="Add Textblock"
          icon={<HiViewList className="h-12 w-12" />}
          onSelect={() => {
            onSelect(INIT_SECTION.RICHTEXT);
            onClose();
          }}
        />
        <SectionItem
          label="Add Image"
          icon={<HiPhotograph className="h-12 w-12" />}
          onSelect={() => {
            onSelect(INIT_SECTION.IMAGE);
            onClose();
          }}
        />
        <SectionItem
          label="Add Video"
          icon={<HiPlay className="h-12 w-12" />}
          onSelect={() => {
            onSelect(INIT_SECTION.VIDEO);
            onClose();
          }}
        />
      </div>
    </div>
  )
}

export default AddSection