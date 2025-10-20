import { showDrawer } from '@/components/drawer';
import React from 'react';
import ActiveLink from '../active-link/ActiveLink';
import { HiOutlineX } from 'react-icons/hi';

interface Props {
  onClose: () => void;
}

export const showSideNav = () => {
  showDrawer({
    id: 'side-nav',
    component: SideNav,
    position: 'right',
    width: '300px',
  });
};

function SideNav({ onClose }: Props) {
  return (
    <div className='flex flex-col h-full bg-white relative'>
      {/* Header with close button */}
      <div className='flex items-center justify-between p-4 border-b border-gray-100'>
        <h2 className='text-xl font-semibold text-gray-800'>Menu</h2>
        <button
          onClick={onClose}
          className='p-2 rounded-full hover:bg-gray-100 transition-colors'
          aria-label='Close menu'
        >
          <HiOutlineX className='w-5 h-5 text-gray-600' />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className='flex flex-col py-6 px-4 space-y-1'>
        <ActiveLink
          onClick={onClose}
          className='py-3 px-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium text-base'
          href='/'
        >
          Home
        </ActiveLink>
        <ActiveLink
          onClick={onClose}
          className='py-3 px-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium text-base'
          href='/startups'
        >
          Startups
        </ActiveLink>
        <ActiveLink
          onClick={onClose}
          className='py-3 px-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium text-base'
          href='/programs'
        >
          Programs
        </ActiveLink>
        <ActiveLink
          onClick={onClose}
          className='py-3 px-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium text-base'
          href='/contact-us'
        >
          Contact Us
        </ActiveLink>
        <ActiveLink
          onClick={onClose}
          className='py-3 px-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium text-base'
          href='/news'
        >
          News
        </ActiveLink>
        <ActiveLink
          onClick={onClose}
          className='py-3 px-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium text-base'
          href='/resources'
        >
          Resources
        </ActiveLink>
        <ActiveLink
          onClick={onClose}
          className='py-3 px-4 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium text-base'
          href='https://www.phstartupweek.com/'
          activeClassName=''
        >
          Event
        </ActiveLink>
      </nav>

      {/* Footer */}
      <div className='mt-auto p-6 border-t border-gray-100'>
        <p className='text-sm text-gray-500 text-center'>© 2023 Startup PH</p>
      </div>
    </div>
  );
}

export default SideNav;
