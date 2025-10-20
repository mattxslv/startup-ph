import React, { useState } from 'react'
import { showModal } from '../modal'
import Button from '@/ui/button/Button'
import Form from '@/ui/form/Form';
import Input from '@/ui/form/Input';
import { useVerifyMobile, useVerifyRequestEmail, useVerifyRequestMobile } from '@/hooks/useProfileVerification';
import useProfile from '@/hooks/useProfile';

export const showMobileVerificationModal = () => {
  showModal({
    id: 'mobile-verification',
    title: 'Mobile Verification',
    component: MobileVerificationModal
  })
}

interface Props {
  onClose: () => void
}

function MobileVerificationModal({ onClose }: Props) {
  const { data: profile } = useProfile();
  const requestor = useVerifyRequestMobile();
  const verifier = useVerifyMobile();
  const [isSent, setIsSent] = useState(false);
  const handleSubmit = (payload: { pin: string }) => {
    verifier.mutate(payload, {
      onSuccess: onClose,
    })
  }
  return (
    <Form
      className="flex-1 flex flex-col"
      initialValues={{ pin: '' }}
      onSubmit={handleSubmit}
      // validationSchema={validationSchema}
    >
      {isSent ? <div className="space-y-3 mb-6">
        <div>
          <Input name="pin" label="Enter Code sent to your mobile number" required />
        </div>
      </div> : (
        <div className="mb-6">
          A verification code will be sent to {profile?.mobile_no || 'your mobile number'}
        </div>
      )}
      <div className="flex items-center justify-center space-x-2 mt-auto">
        <Button variant="link" onClick={() => {
          onClose();
        }}>Cancel</Button>
        {isSent ? (
          <Button variant="primary" type="submit" disabled={verifier.isLoading}>
            Submit
          </Button>
        ) : (
          <Button variant="primary" type="button" onClick={() => {
            requestor.mutate(undefined, {
              onSuccess: () => { setIsSent(true) },
            });
          }} disabled={requestor.isLoading}>
            Send Verification Code
          </Button>
        )}
      </div>
    </Form>
  )
}
