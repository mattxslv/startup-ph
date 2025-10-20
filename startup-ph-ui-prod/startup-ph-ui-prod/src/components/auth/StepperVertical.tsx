import clsx from 'clsx'
import React from 'react'

export interface ISteps {
  label: string
  component: React.ReactNode
}

type Props = {
  steps: ISteps[]
  index: number
}

function StepperVertical({
  steps, index
}: Props) {
  return (
    <div className="text-sm font-medium flex flex-col">
      {React.Children.toArray(steps.map((item, i) => {
        const isDone = index > i
        const isLast = i >= steps.length - 1;
        return (
          <div className="flex">
            <div className="mr-2 flex flex-col items-center">
              {index >= i ? (
                <div className="h-4 w-4 rounded-full bg-primary border border-primary p-1">
                  <div className="h-full w-full bg-white rounded-full" />
                </div>
              ) : (
                <div className="h-4 w-4 rounded-full bg-[#FAFAFA] border border-[#F0F0F0]" />
              )}
              {!isLast
                ? <div className={clsx("border-l-2 flex-1", isDone ? 'border-primary' : 'border-[#F0F0F0]')} />
                : null}
            </div>
            <div>
              <div className={isLast ? 'mb-0' : 'mb-9'}>
                {item.label}
              </div>
            </div>
          </div>
        );
      }))}
    </div>
  )
}

export default StepperVertical