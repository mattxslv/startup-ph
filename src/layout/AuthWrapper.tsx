import Aos from '@/components/aos/Aos'
import CommonHead from '@/components/partial/CommonHead'
import Image from 'next/image'
import React from 'react'

function AuthWrapper({ children, animated = true }: { children: React.ReactNode, animated?: boolean }) {
  return (
    <>
      <CommonHead />
      <Aos />
      <div className="min-h-full flex-grow flex bg-gradient-to-br from-[#13114F] to-[#312E81]">
        <div className="w-full max-w-[47.5rem] p-5 md:p-11 flex relative z-20">
          <div className="bg-white rounded-2xl flex-grow w-full p-6 md:py-12 md:px-14 flex flex-col">
            {children}
          </div>
        </div>
        <div className="flex-1 lg:flex flex-col hidden relative overflow-hidden max-w-5xl -ml-11 pl-11">
          <div className="mt-auto mx-auto w-full max-w-[412px] flex justify-center mb-8">
            <div className="w-full pt-[100%] relative">
              <div className="z-10 absolute inset-0 h-full w-full" {...(animated ? { 'aos-offset': "0", 'data-aos-delay': "0", 'data-aos': "zoom-in" } : {})}>
                <Image className="object-center object-contain scale-90 translate-y-3" fill src="/images/auth/banner-center.png" sizes="424px" alt="banner" />
              </div>
              <div className="z-10 absolute inset-0 h-full w-full" {...(animated ? { 'aos-offset': "0", 'data-aos-delay': "200", 'data-aos': "zoom-in" } : {})}>
                <Image className="object-center object-contain scale-125" fill src="/images/auth/banner-icons.png" sizes="625px" alt="banner" priority />
              </div>
            </div>
          </div>
          <div className="mb-auto mx-auto text-center max-w-md text-white">
            <div className="text-3xl font-bold mb-2">Welcome to PH StartUp!</div>
            <div className="font-semibold">
              This is a place for product-loving enthusiasts to share and geek out about the latest apps, websites, and tech.
            </div>
          </div>
          <div className="absolute top-[50%] translate-y-[-100%] translate-x-[-50%] xl:translate-x-[-35%] left-0 w-[741px] h-[205px]">
            <Image height={205} width={741} src="/images/auth/line-left.png" sizes="740px" alt="" priority />
          </div>
          <div className="absolute top-[50%] translate-y-[-18px] translate-x-[20%] xl:translate-x-0 right-0 w-[407px] h-[205px]">
            <Image height={205} width={407} src="/images/auth/line-right.png" sizes="405" alt="" priority />
          </div>
          <div className="absolute top-0 right-0 h-[128px] w-[148px]">
            <Image className="object-right-top object-contain" fill sizes="148px" src="/images/auth/top-right.png" alt="" />
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthWrapper