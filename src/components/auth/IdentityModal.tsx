/* eslint-disable @next/next/no-img-element */
import * as yup from 'yup'
import React from 'react'
import { showModal } from '../modal'
import Button from '@/ui/button/Button'
import Input from '@/ui/form/Input'
import useProfile from '@/hooks/useProfile'
import { useUpdateIdentification } from '@/hooks/useUpdateProfile'
import { IProfile } from '@/hooks/useProfile'
import { FormikHelpers } from 'formik'
import Form from '@/ui/form/Form'
import InputSelect from '@/ui/form/InputSelect'
import { ID_OPTIONS } from '@/lookups/profile'
import { HiArrowRight } from 'react-icons/hi'
import InputFile from '@/ui/form/InputFile'

export const showIdentityModal = () => {
  showModal({
    id: 'update-identity',
    title: 'Update Identification',
    component: IdentityModal,
    titleClose: true,
  })
}

interface Props {
  onClose: () => void
}

const validationSchema = yup.object().shape({
  identification_type: yup.string().required('Required'),
  identification_no: yup.string().required('Required'),
  identification_url: yup.string().required('Required'),
});

function IdentityModal({ onClose }: Props) {
  const { data: initProfile } = useProfile();
  const mutator = useUpdateIdentification();
  const handleSubmit = (payload: IProfile, { setErrors }: FormikHelpers<IProfile>) => {
    mutator.mutate({
      payload,
    }, {
      onSuccess: () => {
        onClose()
      },
      onError: (err: any) => {
        if (err?.status === 422) setErrors(err?.errors);
      }
    })
  }
  return (
    <Form
      className="flex-1 flex flex-col"
      initialValues={initProfile}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({ values }) => (
        <>
          <div className="space-y-3 mb-6">
            <div>
              <InputSelect name="identification_type" label="ID Type" required options={ID_OPTIONS} />
            </div>
            <div>
              <Input name="identification_no" label="ID Number" required />
            </div>
            <div>
              <InputFile name="identification_url" label="Upload ID Photo" />
            </div>
            {values?.identification_url ? <div className="relative pt-[56.6%] bg-slate-100">
              <img className="absolute inset-0 h-full w-full object-contain object-center" src={values?.identification_url} alt="id" />
            </div> : null}
          </div>
            <div className="flex items-center justify-end mt-auto">
              <div className="flex-1 hidden lg:flex" />
              <Button variant="link" onClick={() => {
                onClose()
              }}>Cancel</Button>
              <Button variant="primary" trailing={<HiArrowRight />} type="submit" disabled={mutator.isLoading}>
                Save
              </Button>
            </div>
        </>
      )}
      </Form>
  )
}
