/* eslint-disable @next/next/no-img-element */
import FitContent from '@/ui/fit-content/FitContent';
import NewsHorizontalList from '@/feature/news/NewsHorizontalList';
import FooterNav from '@/components/partial/FooterNav';
import Button from '@/ui/button/Button';
import { HiChevronLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';
import HomeLayout from './HomeLayout';

function NewsLayout({ children }: { children: React.ReactNode }) {
  const { pathname, back } = useRouter();
  return (
    <HomeLayout>
      <div className='relative'>
        <div className='container mx-auto relative z-10 pb-32'>
          {pathname !== '/news' && (
            <Button
              className='text-primary flex items-center mb-2'
              variant='link'
              leading={<HiChevronLeft />}
              onClick={back}
            >
              Back
            </Button>
          )}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10'>
            <div className='col-span-1 lg:col-span-2 space-y-6 lg:space-y-10'>{children}</div>
            <div className='flex'>
              <div className='bg-white p-6 rounded-none lg:rounded-lg relative w-full flex flex-col'>
                <div className='font-bold text-2xl mb-2'>All News</div>
                <FitContent className='!relative md:absolute'>
                  <NewsHorizontalList />
                </FitContent>
                {/* <div className="text-center text-sm text-slate-500 mt-7">
                  There are no more items.
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className='absolute bottom-0'>
          <img className='w-full' src='/images/misc/cloud-full.png' sizes='1400px' alt='' />
        </div>
      </div>
      <div className='fixed flex items-end inset-0 z-0'>
        <div className='absolute bottom-[50%] right-[50%] translate-x-[160%] z-[-1] h-[300px] w-[300px] rounded-full bg-highlight blur-[250px] opacity-80' />
        <div className='absolute bottom-[20%] left-[50%] translate-x-[-100%] z-[-1] h-[600px] w-[600px] rounded-full bg-[#BBE7FF] blur-[250px] opacity-80' />
        <div className='absolute top-[-10%] left-[50%] translate-x-[-160%] z-[-1] h-[300px] w-[300px] rounded-full bg-[#A78BFA] blur-[250px] opacity-80' />
        <img
          className='absolute top-44 right-0 h-72 w-72'
          src='/images/how-it-works/dots.png'
          alt=''
        />
        <img
          className='absolute top-96 translate-x-[-40%] left-0 h-72 w-72'
          src='/images/how-it-works/dots.png'
          alt=''
        />
      </div>
      <FooterNav />
    </HomeLayout>
  );
}

export default NewsLayout;
