import Card from '@/components/partial/Card'
import Image from 'next/image'
import React from 'react'

type Props = {}

function StartupForApproval({}: Props) {
  return (
    <Card className="flex flex-col py-20">
      <div className="flex flex-col m-auto justify-center items-center text-center text-sm text-muted">
        <div>
          <Image height={122} width={122} src="/images/misc/for_approval.png" alt="" />
        </div>
        <div className="mb-4">
          <div>Your application is submitted.</div>
          <div>You will be notified once your application has been reviewed</div>
        </div>
      </div>
    </Card>
  )
}

export default StartupForApproval