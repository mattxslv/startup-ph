import React from 'react'
import InputShell from './InputShell'
import { useFormContext } from './hooks'
import Button from '../button/Button'
import clsx from 'clsx'
import { showModal } from '@/components/modal'
import { HiCheckCircle } from 'react-icons/hi'

type Props = {
  name: string
  required?: boolean
  note?: string
}

function BenefitsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="overflow-auto">
      <table className="table-auto w-full min-w-[600px] text-sm">
        <thead>
          <tr className="border-y">
            <th>&nbsp;</th>
            <th className="text-center">Enthusiast</th>
            <th className="text-center">Startup</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-y">
            <td><span className="inline-block w-72">Access to the latest startup, news, trends, and developments.</span></td>
            <td><div className="flex justify-center"><HiCheckCircle className="text-success h-8 w-8" /></div></td>
            <td><div className="flex justify-center"><HiCheckCircle className="text-success h-8 w-8" /></div></td>
          </tr>
          <tr className="border-y">
            <td><span className="inline-block w-72">Expand network and connect with fellow founders, experts, investors, and other like-minded entrepreneurs.</span></td>
            <td><div className="flex justify-center"><HiCheckCircle className="text-success h-8 w-8" /></div></td>
            <td><div className="flex justify-center"><HiCheckCircle className="text-success h-8 w-8" /></div></td>
          </tr>
          <tr className="border-y">
            <td><span className="inline-block w-72">Contribute to the growth of Philippine startup and innovation community.</span></td>
            <td><div className="flex justify-center"><HiCheckCircle className="text-success h-8 w-8" /></div></td>
            <td><div className="flex justify-center"><HiCheckCircle className="text-success h-8 w-8" /></div></td>
          </tr>
          <tr className="border-y">
            <td><span className="inline-block w-72">Showcase your startup to a wider audience boosting visibility and attracting partners.</span></td>
            <td><div className="flex justify-center">-</div></td>
            <td><div className="flex justify-center"><HiCheckCircle className="text-success h-8 w-8" /></div></td>
          </tr>
          <tr className="border-y">
            <td><span className="inline-block w-72">Share the latest news on your startup by keeping your profile updated.</span></td>
            <td><div className="flex justify-center">-</div></td>
            <td><div className="flex justify-center"><HiCheckCircle className="text-success h-8 w-8" /></div></td>
          </tr>
          <tr className="border-y">
            <td><span className="inline-block w-72">Share the latest news on your startup by keeping your profile updated.</span></td>
            <td><div className="flex justify-center">-</div></td>
            <td><div className="flex justify-center"><HiCheckCircle className="text-success h-8 w-8" /></div></td>
          </tr>
          <tr className="border-y">
            <td><span className="inline-block w-72">access to tailored resources like menthorship, funding and other programs of the DICT, DOST, and DTI</span></td>
            <td><div className="flex justify-center">-</div></td>
            <td><div className="flex justify-center"><HiCheckCircle className="text-success h-8 w-8" /></div></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

function InputApplicationType({
  name,
  required = true,
  note,
}: Props) {
  const { values, setFieldValue, errors } = useFormContext()
  const value = values[name];
  const error = errors?.[name] as string
  const handleViewBenefits = () => {
    showModal({
      id: 'application-type-benefits',
      title: 'Benefits',
      component: BenefitsModal,
      size: "lg",
      closeOutsideClick: true,
      titleClose: true,
    })
  }
  return (
    <InputShell label="Choose which applies:" note={error ?? note} optional={!required} error={error}>
      <div className="grid grid-cols-2 gap-2">
        <div className={clsx("border flex flex-col rounded px-3 pt-3 pb-6", value === 'ENTHUSIAST' ? 'ring-2 ring-primary' : '')}>
          <div className="text-center font-semibold text-xl mb-3">Enthusiast</div>
          <div className="text-xs">
            <ul className="list-disc pl-3">
              <li>Student / Professional interested to work/build a startup</li>
              <li>Innovation researchers interested in commercializing their outputs</li>
            </ul>
          </div>
          <div className="flex justify-center mt-auto pt-4">
            <Button className="px-8 rounded-full" size="xs" variant={value === 'ENTHUSIAST' ? 'primary' : undefined} onClick={() => {
              setFieldValue(name, 'ENTHUSIAST');
            }}>
              {value === 'ENTHUSIAST' ? 'Selected' : 'Select'}
            </Button>
          </div>
        </div>
        <div className={clsx("border flex flex-col rounded px-3 pt-3 pb-6", value === 'STARTUP' ? 'ring-2 ring-primary' : '')}>
          <div className="text-center font-semibold text-xl mb-3">Startup</div>
          <div className="text-xs">
            <ul className="list-disc pl-3">
              <li>Must be a registered Entity in the Philippines</li>
              <li>Must have or be working on an innovative solution</li>
            </ul>
          </div>
          <div className="flex justify-center mt-auto pt-4">
            <Button className="px-8 rounded-full" size="xs" variant={value === 'STARTUP' ? 'primary' : undefined} onClick={() => {
              setFieldValue(name, 'STARTUP');
            }}>
              {value === 'STARTUP' ? 'Selected' : 'Select'}
            </Button>
          </div>
        </div>
      </div>
      <div className="text-center text-sm font-semibold">
        <button className="text-primary underline" type="button" onClick={handleViewBenefits}>View Benefits</button>
      </div>
    </InputShell>
  )
}

export default InputApplicationType