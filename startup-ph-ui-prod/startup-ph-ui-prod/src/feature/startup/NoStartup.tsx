import Card from '@/components/partial/Card'
import Button from '@/ui/button/Button'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

type Props = {
  actionLabel?: string
}

function NoStartup({
  actionLabel = 'Setup My Startup'
}: Props) {
  const router = useRouter();
  return (
    <Card className="flex flex-col py-20">
      <div className="flex flex-col m-auto justify-center items-center text-center text-sm text-muted">
        <div>
          <Image
            className="h-40 w-40 object-contain object-center"
            src="/images/startup/empty.png"
            height={160}
            width={160}
            sizes="160px"
            alt="Empty"
          />
        </div>
        <div className="mb-4">
          <div>It looks like you haven&apos;t filled out your startup yet.</div>
          <div>Click the button below to get started and complete your startup information.</div>
        </div>
        <Button variant="primary" size="sm" onClick={() => {
          router.push('/onboarding/startup')
        }}>
          {actionLabel}
        </Button>
      </div>
    </Card>
  )
}

export default NoStartup