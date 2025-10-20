import Image from 'next/image'
import React from 'react'

type Props = {}

function Splash({}: Props) {
  return (
    <div className="fixed inset-0 h-full w-full flex">
      <div className="m-auto animate-pulse">
        <Image className="mb-8" src="/images/logo.png" alt="StartUp Ph" height={55} width={144} />
      </div>
    </div>
  )
}

export default Splash