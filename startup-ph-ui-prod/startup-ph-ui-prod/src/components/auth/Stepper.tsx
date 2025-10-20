import clsx from 'clsx'
import React from 'react'
import { HiCheckCircle } from 'react-icons/hi'

interface Props {
  index: number
  steps: number
}

function Stepper({
  index, steps,
}: Props) {
  return (
    <div className="flex items-center">
      {Array(steps).fill(0).map(((item, i) => (
        <div className="flex-1 flex items-center" key={i}>
          {((index - 1) > i) ? (
            <HiCheckCircle key={`check-${i}`} className="flex-shrink-0 h-3 w-3 text-primary" />
          ) : (
            <div key={`step-${i}`} className="h-3 w-3 flex justify-center items-center">
              <div className={clsx("flex-shrink-0 h-2.5 w-2.5 border-2 rounded-full", i + 1 === index ? 'border-primary bg-white' : 'border-white bg-[#E0E0E7]')} />
            </div>
          )}
          {i < (steps - 1) ? <div key={`line-${i}`} className={clsx("flex-1 border-b-2", index - 1 > i ? 'border-primary' : 'border-[#E0E0E7]')} /> : null}
        </div>
      )))}
    </div>
  )
}

export default Stepper