import React from 'react'
import { HiHand, HiHome, HiNewspaper, HiUser } from 'react-icons/hi'
import { IoIosRocket } from 'react-icons/io'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'

type Props = {}

interface IFooterItem {
  icon: React.ReactNode
  label: string
  href: string
  onClick?: () => void
  isActive?: boolean
}

const FooterItem = ({ icon, label, href, onClick, isActive }: IFooterItem) => {
  return (
    <Link className={clsx("flex cursor-pointer flex-col items-center justify-center w-full text-center h-14", isActive ? 'text-primary' : 'text-slate-500')} href={href} onClick={(e) => {
      if (typeof onClick === 'function') {
        e.preventDefault();
        onClick();
      }
    }}>
      <div>
        {icon}
      </div>
      <div className="text-[11px]">{label}</div>
    </Link>
  )
}

function FooterNav({}: Props) {
  const router = useRouter();
  return (
    <footer className="fixed bottom-0 left-0 w-full z-40 bg-white lg:hidden border-t border-slate-300 pb-2">
      <div className="grid grid-cols-5">
        <FooterItem icon={<HiHome className="h-6 w-6" />} label="Home" href="/" />
        <FooterItem icon={<IoIosRocket className="h-6 w-6" />} label="My Startup" href="/dashboard" isActive={router.pathname === '/dashboard'} />
        <FooterItem icon={<HiHand className="h-6 w-6" />} label="Programs" href="/programs" isActive={router.pathname === '/programs'} />
        <FooterItem icon={<HiNewspaper className="h-6 w-6" />} label="News" href="/news" isActive={router.pathname === '/news'} />
        <FooterItem icon={<HiUser className="h-6 w-6" />} label="Profile" href="/profile" isActive={router.pathname === '/profile'} />
      </div>
    </footer>
  )
}

export default FooterNav