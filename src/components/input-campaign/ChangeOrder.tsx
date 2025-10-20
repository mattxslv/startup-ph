/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import Title from '../home/Title'
import Button from '@/ui/button/Button'
import { HiX } from 'react-icons/hi'
import { Section } from './types'
import { ReactSortable } from 'react-sortablejs'
import SectionItem from './SectionItem'

type Props = {
  data: Array<Section>
  onClose: () => void
  onChange: (newValue: Array<Section>) => void
}

function ChangeOrder({
  data,
  onClose,
  onChange,
}: Props) {
  const [state, setState] = useState(data.map((x, i) => ({ id: i + 1, name: JSON.stringify(x) })));
  const handleSave = () => {
    onChange(state.map((x) => JSON.parse(x.name)));
    onClose();
  }
  const handleRemove = (index: number) => () => {
    setState(state.filter((x, i) => i !== index));
  }
  return (
    <div>
      <div className="flex justify-between mb-4">
        <Title label="More" />
        <div className="flex space-x-3">
          <Button size="xs" variant="primary" onClick={handleSave}>Apply Changes</Button>
          <Button size="xs" variant="light" onClick={() => onClose()}>Cancel</Button>
        </div>
      </div>
      <div className="text-center text-sm text-muted italic">
        Drag to sort
      </div>
      <div className="max-h-[80vh] overflow-auto py-3">
        <ReactSortable className='space-y-2' list={state} setList={setState}>
          {state.map((item, i) => {
            const row = JSON.parse(item.name) as Section;
            return (
              <div key={item.id} className="border-dashed border-2 border-slate-300 transition mb-[-1px] bg-white hover:border-primary relative cursor-pointer">
                <div className="bg-white h-20 p-3 overflow-hidden pointer-events-none relative z-10">
                  <SectionItem data={row} />
                </div>
                <div className="absolute top-0 right-0 h-full flex items-center px-4 z-20">
                  <button className="h-8 w-8 bg-danger border rounded-full flex" onClick={handleRemove(i)}>
                    <HiX className="text-white m-auto" />
                  </button>
                </div>
              </div>
            );
          })}
        </ReactSortable>
      </div>
    </div>
  )
}

export default ChangeOrder