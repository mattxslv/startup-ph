/* eslint-disable @next/next/no-img-element */
import FitContent from '@/ui/fit-content/FitContent';
import FooterNav from '@/components/partial/FooterNav';
import Button from '@/ui/button/Button';
import { HiChevronLeft } from 'react-icons/hi';
import { useRouter } from 'next/router';
import HomeLayout from './HomeLayout';
import ResourcesHorizontalList from '@/feature/resources/NewsHorizontalList';

function NewsLayout({ children }: { children: React.ReactNode }) {
  const { pathname, back } = useRouter();
  return (
    <HomeLayout>
      <div className='relative'>
        <div className='container mx-auto relative z-10'>
          {pathname !== '/resources' && (
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
                <div className='font-bold text-2xl mb-2'>All Resources</div>
                <FitContent className='!relative md:absolute'>
                  <ResourcesHorizontalList />
                </FitContent>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterNav />
    </HomeLayout>
  );
}

export default NewsLayout;
