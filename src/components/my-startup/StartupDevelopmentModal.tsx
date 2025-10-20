import React from 'react';
import { showModal } from '../modal';
import Button from '@/ui/button/Button';

export const showStartupDevelopmentModal = () => {
  showModal({
    id: 'startup-development',
    title: '',
    component: StartupDevelopmentModal,
    closeOutsideClick: true,
    titleClose: true,
    size: 'lg',
  });
};

interface Props {
  onClose: () => void;
}

const formationList = [
  'Ideation',
  'Conceptualizing and Strategizing',
  'Entrepreneurial-Mind Setting',
  'Committing',
  'Defining Mission and Vision',
  'Basic Market Research',
];

const validationList = [
  'Research and Development',
  'Product Launch',
  'Prototyping',
  'Commercialization',
  'Product Development',
  'Business Registration',
  'Minimum Viable Product',
  'Marketing',
  'Market Validation & Research',
  'Revenue Stream Generation',
  'IP Application',
];

const GrowthList = [
  'Increased Market Traction',
  'Expansion',
  'Penetration of New Markets',
  'Initial Public Offering',
  'Globalize',
  'Exit Strategy',
];

function StartupDevelopmentModal({ onClose }: Props) {
  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-center font-bold text-lg'>Startup Development Phase</h1>
      <Container title='Formation' list={formationList} />
      <Container title='Validation' list={validationList} />
      <Container title='Growth' list={GrowthList} />
    </div>
  );
}

interface ContainerProps {
  title: string;
  list: string[];
}

const Container = ({ title, list }: ContainerProps) => (
  <div className='p-5 rounded-lg flex flex-col gap-3 border border-gray-200'>
    <h2 className='text-md font-semibold'>{title}</h2>
    <p className='text-muted text-sm font-semibold'>Key Activities:</p>
    <ul className='grid grid-cols-2 gap-1 list-disc list-inside'>
      {list.map((item, index) => (
        <li key={index} className='text-muted text-sm'>
          {item}
        </li>
      ))}
    </ul>
  </div>
);
