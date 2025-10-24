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
  return (
    <>
      <div className='mb-6'>
        <Title label='My Portfolio' />
      </div>
      
      {Array.isArray(body) && body.length > 0 ? (
        <ViewCampaign data={body} />
      ) : (
        <div className='bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-12 text-center border-2 border-dashed border-blue-200'>
          <div className='max-w-md mx-auto'>
            <div className='flex justify-center gap-4 mb-6'>
              <div className='bg-white p-4 rounded-lg shadow-sm'>
                <HiDocumentText className='w-8 h-8 text-blue-500' />
              </div>
            </div>
            
            <h3 className='text-2xl font-bold text-gray-900 mb-3'>
              Showcase Your Startup Story
            </h3>
            <p className='text-gray-600 mb-6'>
              Build an engaging portfolio with rich text content. Tell your startup's unique story and attract investors, partners, and customers.
            </p>
            
            {canEdit ? (
              <div className='flex justify-center'>
                <Button
                  onClick={() => showPortfolioModal()}
                  variant='primary'
                  size='base'
                  className='shadow-lg hover:shadow-xl transition-all'
                >
                  Create Your Portfolio
                </Button>
              </div>
            ) : (
              <p className='text-gray-500 italic'>No portfolio content available</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;
