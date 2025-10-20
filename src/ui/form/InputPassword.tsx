import clsx from 'clsx'
import React, { useState } from 'react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { useFormContext } from './hooks'
import InputShell from './InputShell'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  name: string
  label?: string
  note?: string
}

function InputPassword({
  name,
  label,
  required,
  note,
  ...rest
}: Props) {
  const [show, setShow] = useState(false);
  const { values, setFieldValue, errors } = useFormContext()
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue(name, target.value)
  }
  const error = errors?.[name] as string
  return (
    <InputShell label={label} note={error ?? note} optional={!required} error={error} trailing={(
      <div><button className="text-placeholder" tabIndex={-1} type="button" onClick={() => setShow(!show)}>{show ? <HiEye className="h-5 w-5 relative top-0.5" /> : <HiEyeOff className="h-5 w-5 relative top-0.5" />}</button></div>
    )}>
      <input
        className={clsx(
          'form-input w-full h-10 rounded',
          'text-sm leading-4',
          'placeholder:text-placeholder focus:ring-outline-active focus:ring-2 focus:border-transparent',
          'disabled:bg-fill-disabled disabled:text-disabled',
          error ? 'text-danger bg-danger-light border-danger' : 'border-outline focus:bg-primary-light focus:border-primary-base'
        )}
        type={show ? 'text' : 'password'}
        title={label}
        required={required}
        onChange={handleChange}
        value={values[name] ?? ''}
        {...rest}
      />
    </InputShell>
  )
}

export default InputPassword
