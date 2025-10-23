import Image from 'next/image';
import React from 'react';
import { HiCheckCircle, HiDocumentText, HiCurrencyDollar, HiAcademicCap, HiBuildingOffice } from 'react-icons/hi2';

type Props = {};

function SectionStartup({}: Props) {
  const supportPrograms = [
    {
      icon: HiDocumentText,
      title: 'Startup Registration',
      description: 'Official registration platform for Philippine startups and businesses',
      color: 'bg-blue-700'
    },
    {
      icon: HiCurrencyDollar,
      title: 'Program Applications',
      description: 'Apply for government startup programs and track application status',
      color: 'bg-red-600'
    },
    {
      icon: HiAcademicCap,
      title: 'Resource Library',
      description: 'Access government guidelines, forms, and startup-related information',
      color: 'bg-amber-600'
    },
    {
      icon: HiBuildingOffice,
      title: 'Business Directory',
      description: 'Connect with other startups and explore the Philippine startup ecosystem',
      color: 'bg-blue-600'
    }
  ];

  return (
    <div className='py-8 md:py-12'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-8 md:mb-12'>
          <div className='inline-flex items-center gap-2 bg-blue-100 border border-blue-300 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4'>
            <HiCheckCircle className='w-4 h-4 text-blue-600' />
            <span>Government Startup Program</span>
          </div>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
            Everything You Need to
            <span className='text-blue-600 block'>Start & Scale</span>
          </h2>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
            The official government platform providing comprehensive support for Philippine startups,
            from registration to program applications and resource access.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16'>
          {/* Left Column - Image & Quick Stats */}
          <div className='flex flex-col gap-6'>
            <div className='relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-xl bg-white'>
              <Image
                className='object-contain object-center p-8'
                src='/images/landing/banner-startup.png'
                fill
                sizes='400px'
                alt='Startup Support Programs'
              />
            </div>

            {/* Quick Benefits */}
            <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-200'>
              <h3 className='text-xl font-bold text-gray-900 mb-4 text-center'>Why Choose Government Support?</h3>
              <ul className='space-y-3'>
                {[
                  'Official government registration platform',
                  'Access to startup program applications',
                  'Comprehensive resource library',
                  'Connection to startup ecosystem'
                ].map((benefit, index) => (
                  <li key={index} className='flex items-start gap-3'>
                    <HiCheckCircle className='w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5' />
                    <span className='text-sm text-gray-700'>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Support Programs */}
          <div className='flex flex-col'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 h-full'>
              {supportPrograms.map((program, index) => (
                <div
                  key={index}
                  className='bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 group hover:-translate-y-1'
                >
                  <div className={`w-14 h-14 ${program.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <program.icon className='w-7 h-7 text-white' />
                  </div>
                  <h3 className='text-xl font-bold text-gray-900 mb-3'>{program.title}</h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>{program.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SectionStartup;
