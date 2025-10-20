import Button from '@/ui/button/Button'
import Image from 'next/image'
import { useRouter } from 'next/router';
import React from 'react'

type Props = {}

function Join({}: Props) {
  const router = useRouter();
  return (
    <div className="relative isolate">
      <div className="md:container mx-auto relative z-10">
        <div className="bg-[#1D4ED8] text-white md:rounded-2xl px-16 md:px-20 py-20 md:py-32 relative flex flex-col md:flex-row justify-between items-center overflow-hidden">
          <div className="relative z-10 text-center md:text-left mb-5 md:mb-0">
            <div className="text-5xl font-bold mb-5 md:mb-2" aos-offset="0" data-aos-delay="0" disabled-data-aos="fade-right">Join Us!</div>
            <div className="font-medium max-w-md" aos-offset="0" data-aos-delay="100" disabled-data-aos="fade-right">Help build a welcoming community that empowers entrepreneurs into making innovative products and services.</div>
          </div>
          <div
            className="relative z-10"
            aos-offset="0" data-aos-delay="0" disabled-data-aos="fade-left"
          >
            <Button variant="light" size="lg" onClick={() => {
              router.push('/auth');
            }}>Get Started</Button>
          </div>

          <div
            className="absolute top-0 left-0 md:left-28 w-11/12 md:w-1/2 z-0" style={{ height: 'calc(100% - 32px)' }}
            aos-offset="0" data-aos-delay="150" disabled-data-aos="fade-right"
          >
            <Image className="object-cover md:object-contain object-right md:object-left-top" src="/images/landing/join-vector-l.png" fill alt="" />
          </div>
          <div
            className="absolute top-0 left-0 h-52 w-52 z-0"
            aos-offset="0" data-aos-delay="0" disabled-data-aos="zoom-in-right"
          >
            <Image className="object-contain object-left-top" src="/images/landing/join-elipse.png" fill alt="" />
          </div>
          <div
            className="absolute bottom-0 right-0 h-40 md:h-64 w-40 md:w-64 z-0"
            aos-offset="0" data-aos-delay="0" disabled-data-aos="zoom-in-left"
          >
            <Image className="object-contain object-right-bottom" src="/images/landing/join-vector-br.png" fill alt="" />
          </div>
          <div
            className="absolute top-8 right-0 h-4 w-60 opacity-50"
            aos-offset="0" data-aos-delay="150" disabled-data-aos="zoom-in-left"
          >
            <Image className="object-contain object-right" src="/images/landing/join-vector-tr.png" fill alt="" />
          </div>

        </div>
      </div>
      <div className="bg-[#1B1B1B] h-[50%] absolute bottom-0 left-0 w-full" />
    </div>
  )
}

export default Join