// ui/accordion/Accordion.tsx
'use client';
import clsx from 'clsx';
import { useState, createContext, useContext } from 'react';

// Create context for accordion group
interface AccordionContextType {
  activeIndices: number[];
  toggleAccordion: (index: number) => void;
  allowMultiple?: boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

// Accordion Group component
interface AccordionGroupProps {
  children: React.ReactNode;
  allowMultiple?: boolean;
  defaultIndices?: number[];
}

export function AccordionGroup({
  children,
  allowMultiple = false,
  defaultIndices = [],
}: AccordionGroupProps) {
  const [activeIndices, setActiveIndices] = useState<number[]>(defaultIndices);

  const toggleAccordion = (index: number) => {
    setActiveIndices((prev) => {
      if (allowMultiple) {
        return prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index];
      }
      // Single accordion mode
      return prev.includes(index) ? [] : [index];
    });
  };

  return (
    <AccordionContext.Provider value={{ activeIndices, toggleAccordion, allowMultiple }}>
      <div className='flex flex-col gap-4'>{children}</div>
    </AccordionContext.Provider>
  );
}

// Individual Accordion component
interface AccordionProps {
  children: React.ReactNode;
  title: string;
  id: string;
  index: number;
  error?: string;
}

export default function Accordion({ children, title, id, index, error }: AccordionProps) {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error('Accordion must be used within an AccordionGroup');
  }

  const { activeIndices, toggleAccordion } = context;
  const isOpen = activeIndices.includes(index);

  return (
    <div className={clsx('border rounded-lg mb-4', error ? 'border-red-500' : '')}>
      <button
        type='button'
        className='w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors rounded-lg'
        onClick={() => toggleAccordion(index)}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${id}`}
      >
        <span className='font-medium text-gray-900'>{title}</span>
        <svg
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
        </svg>
      </button>

      <div
        id={`accordion-content-${id}`}
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className='overflow-hidden'>
          <div className='p-4 text-gray-700'>{children}</div>
        </div>
      </div>
    </div>
  );
}
