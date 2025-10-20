import Aos from '@/components/aos/Aos'
import PublicLayout from '@/layout/PublicLayout'
import Image from 'next/image'
import React from 'react'

type Props = {}

function HowItWorksPage({}: Props) {
  return (
    <>
      <Aos offset={0} />
      <div className="flex-1 flex flex-col relative max-w-[1980px] overflow-hidden z-10">
        <PublicLayout>
          <div className="container mx-auto pt-0 md:pt-28">
            <div className="w-full lg:w-2/3 mb-12">
              <h1
                className="text-2xl md:text-5xl font-bold text-dark mb-6"
                aos-offset="0" data-aos-delay="0" data-aos="fade-up"
              >
                How does it work?
              </h1>
              <p
                className="text-muted"
                aos-offset="0" data-aos-delay="150" data-aos="fade-up"
              >
                Startup PH Network is a state-supported initiative that aims to drive collaboration and innovation within the tech startup ecosystem of the Philippines.<br />
                <br />
                Through its virtual platform, the network brings together various entities in the local tech startup community, creating a unified platform for engagement. This provides Philippine-based startups with a powerful tool to showcase their profile and to raise their visibility locally and globally.<br />
                <br />
                The initiative enables these startups to explore new opportunities for growth and progress, to achieve their full potential, and to unlock unprecedented success in the tech industry.
              </p>
            </div>
          </div>
        </PublicLayout>
        <div className="relative h-[150px] md:h-[250px] lg:h-[330px] xl:h-[400px] mt-auto">
          <div className="absolute bottom-0">
            <div className="w-[170px] sm:w-[250px] md:w-[300px] lg:w-[400px] xl:w-[500px] -translate-x-4 md:translate-x-0" style={{ paddingTop: '81.9%' }}>
              <div className="absolute inset-0 h-full w-full z-10" aos-offset="0" data-aos-delay="450" data-aos="fade-right">
                <Image className="object-left-bottom object-contain translate-x-[25%]" fill src="/images/how-it-works/boy.png" sizes="590px" alt="" />
              </div>
              <div className="absolute inset-0 h-full w-full z-10" aos-offset="0" data-aos-delay="800" data-aos="zoom-in">
                <Image className="object-left-bottom object-contain z-10 translate-x-[12%] translate-y-[-20%]" fill src="/images/how-it-works/icon-boy.png" sizes="660px" alt="" />
              </div>
              <div className="absolute inset-0 h-full w-full -z-0" aos-offset="0" data-aos-delay="0" data-aos="fade-up">
                <Image className="object-bottom object-contain translate-x-[70%] -z-0" fill src="/images/how-it-works/cloud-bc.png" sizes="564px" alt="" />
              </div>
              <div className="absolute inset-0 h-full w-full -z-0" aos-offset="0" data-aos-delay="50" data-aos="fade-up">
                <Image className="object-left-bottom object-contain z-10 scale-75 origin-bottom-left" fill src="/images/how-it-works/cloud-bl.png" sizes="450px" alt="" />
              </div>
              <div className="absolute inset-0 h-full w-full -z-0" aos-offset="0" data-aos-delay="100" data-aos="fade-up">
                <Image className="object-center object-contain scale-90 translate-x-[25%] translate-y-[-10%] z-10" fill src="/images/how-it-works/cloud-l.png" sizes="564px" alt="" />
              </div>
              <div className="absolute inset-0 h-56 w-56 -z-0" aos-offset="0" data-aos-delay="0" data-aos="fade-right">
                <Image className="object-center object-contain translate-x-[-60%] translate-y-[-80%] md:translate-y-[-40%] z-10" fill src="/images/how-it-works/dots.png" sizes="280px" alt="" />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0">
            <div className="w-[170px] sm:w-[250px] md:w-[300px] lg:w-[400px] xl:w-[500px]" style={{ paddingTop: '112.4%' }}>
              <div className="absolute inset-0 h-full w-full z-10" aos-offset="0" data-aos-delay="450" data-aos="fade-left">
                <Image className="object-right-bottom object-contain scale-95" fill src="/images/how-it-works/girl.png" sizes="576px" alt="" />
              </div>
              <div className="absolute inset-0 h-full w-full z-10" aos-offset="0" data-aos-delay="800" data-aos="zoom-in">
                <Image className="object-right-bottom object-contain z-10 translate-y-[-15%] scale-90" fill src="/images/how-it-works/icon-girl.png" sizes="567px" alt="" />
              </div>
              <div className="absolute inset-0 h-56 w-56 -z-0" aos-offset="0" data-aos-delay="0" data-aos="fade-left">
                <Image className="object-center object-contain translate-x-[10%] md:translate-x-[134%] translate-y-[-80%] -z-0" fill src="/images/how-it-works/dots.png" sizes="280px" alt="" />
              </div>
              <div className="absolute inset-0 h-full w-full z-20" aos-offset="0" data-aos-delay="200"  data-aos="fade-up">
                <div className="absolute bottom-0 right-0 translate-y-[50%] translate-x-[-50%] z-20 h-52 w-52 rounded-full bg-[#B9B8FF] blur-[100px]" />
                <Image className="object-right-bottom object-contain z-10 scale-105 origin-bottom-right" fill src="/images/how-it-works/cloud-br.png" sizes="610px" alt="" />
              </div>
              <div className="absolute inset-0 h-full w-full -z-0" aos-offset="0" data-aos-delay="0"  data-aos="fade-up">
                <Image className="object-right-bottom object-contain z-10 scale-75 origin-right translate-y-[-35%]" fill src="/images/how-it-works/cloud-r.png" sizes="430px" alt="" />
              </div>
              <div className="absolute inset-0 h-full w-full -z-0" aos-offset="0" data-aos-delay="50"  data-aos="fade-up">
                <Image className="object-right-bottom object-contain z-10 scale-110 origin-right translate-y-[-15%]" fill src="/images/how-it-works/cloud-r2.png" sizes="690px" alt="" />
              </div>
            </div>
          </div>
          <div className="absolute z-[-1] top-[50%] left-0 h-[400px] w-[400px] rounded-full bg-[#BBE7FF] blur-[200px]" />
          <div className="absolute z-[-1] top-[50%] right-[20%] h-[400px] w-[400px] rounded-full bg-[#EEBEFF] blur-[200px]" />
        </div>
      </div>
    </>
  )
}

export default HowItWorksPage