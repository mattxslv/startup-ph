import Image from 'next/image'
import React from 'react'

interface Props {
  icon?: string
  label: string
  description: string
  background?: string
  onClick?: () => void
}

export const StartupCardLoader = () => (
  <div className="text-center pt-6 md:pt-14 pb-6 md:pb-12 px-5 md:px-9 flex flex-row md:flex-col justify-center items-center rounded-2xl bg-slate-50 animate-pulse">
    <div className="relative h-16 w-16 bg-slate-200 rounded-2xl mb-9 flex-shrink-0 mr-6 md:mr-0">
      <div className="bg-slate-200 block animate-pulse h-16 w-16 rounded" />
    </div>
    <div className="text-left md:text-center flex-1 min-w-0 max-w-full">
      <div className="text-[22px] font-bold bg-slate-200 animate-pulse w-32 rounded">
        &nbsp;
      </div>
      <div className="h-20 flex items-center">
        <div className="line-clamp-3">
          &nbsp;
        </div>
      </div>
    </div>
  </div>
)

function StartupCard({
  icon,
  label,
  description,
  background = '#fff',
  onClick,
  ...rest
}: Props) {
  return (
    <div className="border text-center pt-6 md:pt-14 pb-6 md:pb-12 px-5 md:px-9 flex flex-row md:flex-col justify-center items-center rounded-2xl relative" style={{ backgroundColor: background }} {...rest}>
      {typeof onClick === 'function' ? (
        <button className="absolute inset-0 h-full w-full z-10" onClick={onClick} title="Select" />
      ) : null}
      <div className="relative h-16 w-16 bg-muted rounded-2xl overflow-hidden mb-9 flex-shrink-0 mr-6" aos-offset="0" data-aos-delay="0" data-aos="zoom-in">
        {icon ? <Image src={icon} fill alt="Icon" sizes="64px" /> : null}
      </div>
      <div className="text-left md:text-center flex-1 min-w-0 max-w-full">
        <div className="text-[22px] font-bold text-dark" aos-offset="0" data-aos-delay="0" data-aos="fade-up">
          {label}
        </div>
        <div className="h-20 flex items-center" aos-offset="0" data-aos-delay="100" data-aos="fade-up">
          <div className="line-clamp-3">
            {description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StartupCard