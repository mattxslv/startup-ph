import { forwardRef, useImperativeHandle, useMemo } from 'react';
import { FormContext, IFormik } from '../context';

interface Props {
  children: React.ReactNode | ((props: IFormik<any>) => React.ReactNode);
  onChange: React.Dispatch<React.SetStateAction<any>>;
  value: any;
}

const FormInline = forwardRef<IFormik, Props>(
  ({ onChange, value, children }: Props, ref: any) => {
    const context = useMemo(
      () => ({
        values: value,
        setFieldValue: async (n: string, v: any) => {
          onChange((x: any) => ({
            ...x,
            [n]: v,
          }));
        },
        setValues: async (n: string, v: any) => {
          /* do nothing */
        },
      }),
      [value, onChange]
    );
    useImperativeHandle(ref, () => context);
    return (
      <FormContext.Provider value={context}>
        {typeof children === 'function' ? children(context) : children}
      </FormContext.Provider>
    );
  }
);

FormInline.displayName = 'Form';

export default FormInline;
