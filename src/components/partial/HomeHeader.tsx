import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiMenu } from 'react-icons/hi';
import HeaderUserNav from '../auth/HeaderUserNav';
import ActiveLink from '../active-link/ActiveLink';

type Props = {};

interface IMyLink {
  children: React.ReactNode;
  href: any;
  activeClassName?: string;
}

const MyLink = ({ children, href, activeClassName, ...props }: IMyLink) => {
  return (
    <ActiveLink href={href} activeClassName={activeClassName} {...props}>
      {children}
    </ActiveLink>
  );
};

function HomeHeader({}: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b-2 border-black/20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" aria-label="Startup home">
          <Image
            src="/images/logo.png"
            alt="StartUp Ph logo"
            width={150}
            height={70}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-3 flex-1">
          <div className="ml-auto">
            <ul className="hidden md:flex items-center gap-8 text-base font-medium">
            <li>
              <Link className="relative transition-all duration-300 hover:text-blue-600 hover:scale-105 group cursor-pointer"
                 href="/">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link className="relative transition-all duration-300 hover:text-blue-600 hover:scale-105 group cursor-pointer"
                 href="/startups"
                 title="Discover innovative startups in the Philippine ecosystem">
                Startups
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link className="relative transition-all duration-300 hover:text-blue-600 hover:scale-105 group cursor-pointer"
                 href="/programs"
                 title="Explore accelerator programs and startup support initiatives">
                Programs
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link className="relative transition-all duration-300 hover:text-blue-600 hover:scale-105 group cursor-pointer"
                 href="/contact-us"
                 title="Get in touch with our team for inquiries and support">
                Contact Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link className="relative transition-all duration-300 hover:text-blue-600 hover:scale-105 group cursor-pointer"
                 href="/news"
                 title="Stay updated with the latest startup news and insights">
                News
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <Link className="relative transition-all duration-300 hover:text-blue-600 hover:scale-105 group cursor-pointer"
                 href="/resources"
                 title="Access tools, guides, and resources for startups">
                Resources
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </li>
            <li>
              <a className="relative transition-all duration-300 hover:text-blue-600 hover:scale-105 group cursor-pointer"
                 href="https://www.phstartupweek.com/"
                 title="Join the Philippine Startup Week event">
                Event
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            </ul>
          </div>

          <div className="ml-auto">
            <HeaderUserNav />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background/95 backdrop-blur border-b border-black/10 md:hidden">
            <div className="px-4 py-4 space-y-3">
              <Link className="block hover:underline underline-offset-4" href="/">Home</Link>
              <Link className="block hover:underline underline-offset-4" href="/startups">Startups</Link>
              <Link className="block hover:underline underline-offset-4" href="/programs">Programs</Link>
              <Link className="block hover:underline underline-offset-4" href="/contact-us">Contact Us</Link>
              <Link className="block hover:underline underline-offset-4" href="/news">News</Link>
              <Link className="block hover:underline underline-offset-4" href="/resources">Resources</Link>
              <a className="block hover:underline underline-offset-4" href="https://www.phstartupweek.com/">Event</a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export default HomeHeader;
