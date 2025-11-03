import Title from '@/components/home/Title';
import { Section } from '@/components/input-campaign/types';
import ViewCampaign from '@/components/input-campaign/ViewCampaign';
import Button from '@/ui/button/Button';
import router from 'next/router';
import React from 'react';
import { HiPencil, HiDocumentText } from 'react-icons/hi';
import { showPortfolioModal } from './PortfolioModal';

interface Props {
  canEdit: boolean;
  body: Section[];
}

const Portfolio = ({ canEdit, body }: Props) => {
  const hasContent = Array.isArray(body) && body.length > 0;
  
  return (
    <>
      <div className='mb-6 flex items-center justify-between'>
        <Title label='My Portfolio' />
        {canEdit && hasContent && (
          <Button
            onClick={() => showPortfolioModal()}
            variant='outline'
            size='sm'
            leading={<HiPencil />}
            className='shadow-sm hover:shadow-md transition-all'
          >
            Edit Portfolio
          </Button>
        )}
      </div>
      
      {hasContent ? (
        <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
          <ViewCampaign data={body} />
        </div>
      ) : (
        <div className='bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 rounded-xl p-12 text-center border-2 border-dashed border-purple-200 relative overflow-hidden'>
          {/* Decorative background elements */}
          <div className='absolute inset-0 opacity-30'>
            <div className='absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3'></div>
            <div className='absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3'></div>
          </div>
          
          <div className='max-w-md mx-auto relative z-10'>
            <div className='flex justify-center gap-4 mb-6'>
              <div className='bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-lg border border-purple-100'>
                <HiDocumentText className='w-10 h-10 text-purple-600' />
              </div>
            </div>
            
            <h3 className='text-3xl font-bold text-gray-900 mb-3'>
              Showcase Your Startup Story
            </h3>
            <p className='text-gray-700 mb-8 text-lg'>
              Build an engaging portfolio with rich text content. Tell your startup's unique story and attract investors, partners, and customers.
            </p>
            
            {canEdit ? (
              <div className='flex justify-center'>
                <Button
                  onClick={() => showPortfolioModal()}
                  variant='primary'
                  size='lg'
                  leading={<HiDocumentText />}
                  className='shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                >
                  Create Your Portfolio
                </Button>
              </div>
            ) : (
              <div className='bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-purple-100'>
                <p className='text-gray-600 italic'>No portfolio content available</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
