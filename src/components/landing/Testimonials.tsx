import useOnScreen from '@/hooks/useOnScreen';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useMemo, useRef, useState } from 'react'

type Props = {}

interface ITestimonial {
  photo_url?: string
  quote: string
  name: string
  initials: string
  position: string
  _bg_class: string
}

const COLORS = [
  '#352190',
  '#EFA800',
  '#3f3c37',
];

const MAP_BG_CLASS_NAME = [
  'bg-gradient-to-br from-[#EDE9FE] to-[#F7F5FF]',
  'bg-gradient-to-br from-[#FEFFF8] to-[#FFF3DC]',
  'bg-gradient-to-br from-[#F0FDF4] to-[#DBF1FF]',
]

const TESTIMONIALS: ITestimonial[] = [
  {
    photo_url: '/images/temp/iju.png',
    quote: `The benefits technology brings are vast and transformative, yet some may view it with skepticism or even fear. I urge us all to embrace technology, to become comfortable with its advantages, and to recognize its potential for positive change in our lives. We must encourage our citizens to take part, and to comprehend that technology only antagonizes those who think of it as a foe.`,
    name: 'Ivan John Uy',
    initials: 'IU',
    position: 'Secretary of the Department of Informations and Communications Technology (DICT)',
    _bg_class: 'bg-gradient-to-l from-[#F0FDF4] to-[#DBF1FF]',
  },
  {
    photo_url: '/images/temp/fp.png',
    quote: `A strong private-public partnership is needed to establish a more competent startup ecosystem. I hope that we’ll be able to work together and learn from each other. Let’s use each other’s strengths to make sure that our investees thrive, and succeed, and that the venture ends up in an operation that will scale the success of the startup ecosystem.`,
    name: 'Alfredo E. Pascual',
    initials: 'FP',
    position: 'Secretary of the Department of Trade and Industry (DTI)',
    _bg_class: 'bg-gradient-to-l from-[#F0FDF4] to-[#DBF1FF]',
  },
  {
    photo_url: '/images/temp/rus.png',
    quote: `In today's rapidly evolving world, startups play a pivotal role in transforming ideas into reality. They possess the agility to adapt, the courage to challenge norms, and the resilience to navigate uncharted territories. Our commitment at the DOST is to provide an enabling environment for these entrepreneurial ventures. We recognize the need for robust support mechanisms, access to funding, mentorship, and resources essential for nurturing their growth and potential.`,
    name: 'Renato U. Solidum, Jr.',
    initials: 'RS',
    position: 'Secretary of the Department of Science and Technology (DOST) ',
    _bg_class: 'bg-gradient-to-l from-[#F0FDF4] to-[#DBF1FF]',
  },
  {
    photo_url: '/images/temp/jbs.png',
    quote: `Building a robust and resilient innovation ecosystem requires world-class entreprenuerial mindset that begin from creating ecosytems that nurture homegrown startup ideas. The DICT, as a digital innovation leader of the Philippines, seeks to help build ecosystems where startups can grow and scale into Filipino enterprises that provide solutions for communities and the world. Let us all join hands in achieving this mission.`,
    name: 'Atty. Jocelle Batapa-Sigue',
    initials: 'JS',
    position: 'Undersecretary for ICT Industry Development, DICT',
    _bg_class: 'bg-gradient-to-l from-[#F0FDF4] to-[#DBF1FF]',
  },
  {
    photo_url: '/images/temp/rma.png',
    quote: `We continue to invest and inspire our young Filipino Talent through our Science, Technology, and Innovation Industrialization strategy. We believe that our people are our main competitive advantage in the era of industrial transformation`,
    name: 'Rafaelita M. Aldaba, Ph.D.',
    initials: 'RMA',
    position: 'Undersecretary for the Competitiveness and Innovation Group, DTI',
    _bg_class: 'bg-gradient-to-l from-[#F0FDF4] to-[#DBF1FF]',
  },
  {
    photo_url: '/images/temp/rbm.png',
    quote: `Since IdeaSpace Foundation's inception, we have been the ecosystem's funnel-transforming tech-enabled ventures into stable, scalable, and sustainable businesses while identifying high-potential startups for VCs, investors, and corporations to explore synergies and funding opportunities with. With DICT's newly launched Startup Portal, we look forward to working alongside innovators, industry experts, and ecosystem players in exploring investment opportunities, empowering founders, and accelerating startups across the Philippines.`,
    name: 'Rene “Butch” S. Meily',
    initials: 'RBM',
    position: 'President of IdeaSpace Foundation, Inc.',
    _bg_class: 'bg-gradient-to-l from-[#F0FDF4] to-[#DBF1FF]',
  },
  {
    photo_url: '/images/temp/krc.png',
    quote: `QBO Innovation Hub is all about QLLABORATION as it is set to scale tech-enabled startups and bring Filipino ingenuity to a global audience. With DICT's central platform featuring relevant startup data, resources, and its comprehensive network of innovators and ecosystem stakeholders, it helps us stay true to our mission to catalyze the local tech scene, develop the entrepreneurial talent pool, and build a robust, inclusive innovation and entrepreneurship ecosystem across the Philippines.`,
    name: 'Katrina Rausa Chan',
    initials: 'KRC',
    position: 'Executive Director of QBO Innovation Hub',
    _bg_class: 'bg-gradient-to-l from-[#F0FDF4] to-[#DBF1FF]',
  },
  {
    photo_url: '/images/temp/dla.png',
    quote: `The success of our startups reflects our shared dedication and ambition. These enterprises embody the dreams and ambitions of Filipinos, bringing ideas to life as viable businesses. Their development is crucial, which is why initiatives like the DICT's eGovPH Super App and related startup websites are so important. By integrating the Startup Program into the eGovPH Super App, we're providing more than just tech solutions; we're creating platforms that equip startups with necessary resources, streamline their operations, and foster a conducive environment for innovation.`,
    name: 'David L. Almirol, Jr.',
    initials: 'DA',
    position: 'Undersecretary for e-Government, DICT',
    _bg_class: 'bg-gradient-to-l from-[#F0FDF4] to-[#DBF1FF]',
  },
];

const TestimonialItem  = ({ index, data, onScreenShown }: {
  index: number,
  data: ITestimonial,
  onScreenShown: () => void,
}) => {
  const myRef = useRef(null);
  const isInScreen = useOnScreen(myRef);
  useEffect(() => {
    if (isInScreen) onScreenShown();
    // eslint-disable-next-line
  }, [index, isInScreen]);
  return (
    <div id={`testimonial-${index}`} className={clsx('relative pt-16 pb-20 w-full flex-shrink-0 flex flex-col testimonial-item', data._bg_class)}>
      <div className="container mx-auto flex flex-col md:flex-row md:items-end flex-1">
        <div className="w-full md:w-3/6 lg:w-4/6 h-full flex flex-col">
          <div className="text-[#4C4C63] font-bold text-3xl md:text-5xl mb-8" data-aos-delay="0" data-data-aos="fade-up">
            Our happy startup stories
          </div>
          <div ref={myRef} className="mb-12" data-aos-delay="0" data-data-aos="fade-up">
            <q className="whitespace-pre-line text-xl">{data.quote}</q>
          </div>
          <div className="flex justify-center md:justify-start items-center mt-auto">
            <div className="md:hidden mr-4 flex-shirnk-0">
              <Image className="rounded-full border bg-white object-cover object-top" src={data?.photo_url || ''} height={80} width={80} alt="" />
            </div>
            <div data-aos-delay="0" data-data-aos="fade-left">
              <div className="font-bold">{data.name}</div>
              <div className="font-bold text-muted text-sm">{data.position}</div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex w-full md:w-3/6 lg:w-2/6 relative h-full items-end -mt-40 -mb-20 min-h-[370px] translate-x-[25%]">
          <Image className="object-contain object-bottom scale-[132%] origin-bottom" src={data?.photo_url || ''} fill sizes="530px" alt="" />
        </div>
      </div>
    </div>
  )
}

function Testimonials({}: Props) {
  const [active, set] = useState(0);
  const setActive = (index: number) => () => {
    const el = document.getElementById(`testimonial-${index}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    set(index);
  }
  // useEffect(() => {
  //   const tmr = setTimeout(() => {
  //     const next = TESTIMONIALS[active + 1]
  //       ? (active + 1)
  //       : 0;
  //     setActive(next)();
  //   }, 10000);
  //   return () => {
  //     clearTimeout(tmr);
  //   }
  // }, [active]);
  return (
    <div className="relative">
      <div className="block md:hidden px-5 space-y-7">
        <div className="text-dark text-2xl md:text-5xl font-bold mb-4 md:mb-7 text-center" data-aos-delay="0" data-data-aos="fade-up">
          Our happy startup stories
        </div>
        {TESTIMONIALS.map((data, i) => (
          <div className={clsx("px-6 pt-6 pb-12 rounded-lg", MAP_BG_CLASS_NAME[i % MAP_BG_CLASS_NAME.length])} key={i} data-aos-delay="0" data-data-aos="fade-up">
            <div className="flex items-center mb-7">
              <div className={clsx("rounded-full overflow-hidden mr-4")} style={{ backgroundColor: COLORS[i % COLORS.length] }}>
                {data.photo_url ? <Image
                  className="object-center object-contain"
                  height={56}
                  width={56}
                  src={data.photo_url}
                  alt=""
                /> : <span className="h-14 w-14 text-white flex items-center justify-center font-bold">{data.initials}</span>}
              </div>
              <div className="flex-1 min-w-0 text-xs font-bold">
                <div>{data.name}</div>
                <div className="text-muted pr-3">{data.position}</div>
              </div>
            </div>
            <div className="text-xs leading-5">
              <q className="whitespace-pre-line">
                {data.quote}
              </q>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:flex w-full testimonial-wrapper overflow-auto no-scrollbar">
        {TESTIMONIALS.map((data, i) => (
          <TestimonialItem key={i} index={i} data={data} onScreenShown={() => set(i)} />
        ))}
      </div>
      <div className="hidden md:block absolute bottom-6 left-[50%] translate-x-[-50%]">
        <div className="flex items-center space-x-2">
          {TESTIMONIALS.map((x, i) => (
            <button key={i} onClick={setActive(i)} className={clsx("rounded-full", active === i ? 'bg-highlight h-4 w-4 ' : 'bg-[#D9D9D9] h-2 w-2')} title={`slide-${i + 1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Testimonials