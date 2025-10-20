import { useState } from 'react'
import { useFormik, FormikValues, FormikHelpers } from 'formik'
import { FormContext, IFormik } from './context'

interface Props<T extends FormikValues = FormikValues> {
  className?: string
  children: React.ReactNode | ((props: IFormik<T>) => React.ReactNode)
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<any>
  initialValues: any
  // eslint-disable-next-line
  validationSchema?: any | (() => any)
}

function Form<T extends FormikValues = FormikValues>({
  className,
  initialValues,
  validationSchema,
  onSubmit,
  children
}: Props<T>) {
  const [validateOnChange, setValidateOnChange] = useState(false)
  const context = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnChange
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidateOnChange(true)
    context.handleSubmit()
  }
  // useImperativeHandle(ref, () => context)
  return (
    <FormContext.Provider value={context}>
      <form className={className} onSubmit={handleSubmit} noValidate>
        {typeof children === 'function' ? children(context) : children}
      </form>
    </FormContext.Provider>
  )
}

// const Form = forwardRef<IFormik, Props>(({
//   initialValues,
//   validationSchema,
//   onSubmit,
//   children
// }: Props, ref: any) => {
//   const [validateOnChange, setValidateOnChange] = useState(false)
//   const context = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit,
//     validateOnChange
//   })
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     setValidateOnChange(true)
//     context.handleSubmit()
//   }
//   useImperativeHandle(ref, () => context)
//   return (
//     <FormContext.Provider value={context}>
//       <form onSubmit={handleSubmit}>
//         {typeof children === 'function' ? children(context) : children}
//       </form>
//     </FormContext.Provider>
//   )
// })

// Form.displayName = 'Form'

export default Form
