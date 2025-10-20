import clsx from 'clsx';
import React from 'react';
import { Title } from 'ui/components';

interface Props {
  value: number;
  steps: string[];
  label: string;
}

function Stepper({ value, steps, label }: Props) {
  return (
    <>
      <div className="text-xs font-semibold uppercase text-description mb-1">
        STEP {value + 1} of {steps.length}
      </div>
      <Title>{label}</Title>
      <nav aria-label="Progress" className="my-6">
        <ol role="list" className="flex items-center justify-between">
          {steps.map((item, i) => (
            <li
              className={clsx('relative', i + 1 < steps.length ? 'w-full' : '')}
              key={item}
            >
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                {value > i ? (
                  <div className="h-1 w-full bg-primary-base" />
                ) : (
                  <div className="h-1 w-full bg-fill-disabled" />
                )}
              </div>
              <div
                className={clsx(
                  'relative flex h-3.5 w-3.5 items-center justify-center rounded-full',
                  value >= i ? 'bg-primary-base' : '',
                  value === i ? 'border-2 border-primary-base' : '',
                  value < i
                    ? 'border-2 border-fill-disabled bg-fill-disabled'
                    : ''
                )}
              >
                <span className="sr-only">{item}</span>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

export default Stepper;
