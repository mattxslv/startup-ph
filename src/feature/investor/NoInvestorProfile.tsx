import Card from '@/components/partial/Card'
// import Button from '@/ui/button/Button'
// import Toast from '@/ui/toast/Toast'
import Image from 'next/image'
// import { useRouter } from 'next/router'
import React from 'react'

type Props = {}

function NoInvestorProfile({}: Props) {
  // const router = useRouter();
  return (
    <Card className="flex flex-col py-20">
      <div className="flex flex-col m-auto justify-center items-center text-center text-sm text-muted">
        <div>
          <Image
            className="h-40 w-40 object-contain object-center"
            src="/images/misc/wip.png"
            height={160}
            width={160}
            sizes="160px"
            alt="WIP"
          />
        </div>
        <div className="mb-4">
          <div>We&apos;re currently working on creating an awesome</div>
          <div>investor profile experience for you.</div>
        </div>
        {/* <Button variant="primary" size="sm" onClick={() => {
          Toast.warning("Coming soon!");
          // router.push('/onboarding/investor')
        }}>
          Be an Investor
        </Button> */}
      </div>
    </Card>
  )
}

export default NoInvestorProfile