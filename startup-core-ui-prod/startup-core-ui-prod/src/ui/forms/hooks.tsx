import { useContext, useMemo } from 'react';
import { FormContext } from './context';

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) throw new Error('Input is not wrapped within Form');
  return context;
}

export function useFormChange(id: string) {
  const context = useContext(FormContext);
  if (!context) throw new Error('Input is not wrapped within Form');
  const value = useMemo(() => context?.values?.[id], [context.values, id]);
  return value;
}
