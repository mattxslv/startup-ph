import HomeHeader from '@/components/partial/HomeHeader';
import Footer from '@/components/partial/Footer';
import Banner from '@/components/landing/Banner';
import SectionStartup from '@/components/landing/SectionStartup';
import SectionTarget from '@/components/landing/SectionTarget';
import Testimonials from '@/components/landing/Testimonials';
import Faq from '@/components/landing/Faq';
import Join from '@/components/landing/Join';
import Aos from '@/components/aos/Aos';
import CommonHead from '@/components/partial/CommonHead';
import NewsFeed from '@/components/landing/NewsFeed';
import AiWidget from '@/components/ai-widget/AiWidget';

export default function Home() {
  return (
    <>
      <CommonHead />
      <Aos once />
      <div className='bg-gradient-to-r from-[#F4FAFF] to-[#E4EAFF] rounded-br-[33px] md:rounded-br-[172px] pt-20 pb-0 md:pb-28 space-y-16 overflow-hidden'>
        <HomeHeader />
        <Banner />
      </div>
      <main className='relative overflow-hidden'>
        {/* <div className="pt-4 md:pt-20">
          <Startup />
        </div> */}
        <div className='relative mt-16 md:mt-32 space-y-16 md:space-y-32 pb-16 md:pb-32'>
          <SectionStartup />
          <SectionTarget />
          <div className='absolute bottom-[20%] right-[50%] translate-x-[160%] z-[-1] h-[228px] w-[228px] rounded-full bg-highlight blur-[190px] opacity-60' />
          <div className='absolute bottom-[10%] left-[50%] translate-x-[-160%] z-[-1] h-[228px] w-[228px] rounded-full bg-[#F472B6] blur-[190px] opacity-60' />
          <div className='absolute top-[-10%] left-[50%] translate-x-[-160%] z-[-1] h-[228px] w-[228px] rounded-full bg-[#A78BFA] blur-[190px] opacity-60' />
          {/* <div className="absolute bottom-0 left-0 z-[-1] h-[228px] w-[228px] rounded-full bg-[#A78BFA] blur-[200px]" />
          <div className="absolute bottom-0 left-0 z-[-1] h-[228px] w-[228px] rounded-full bg-[#F9A8D4] blur-[200px]" /> */}
        </div>
        {/* <Testimonials /> */}
        <NewsFeed />
        <Faq />
        <Join />
      </main>
      <Footer />
      <AiWidget />
    </>
  );
}
