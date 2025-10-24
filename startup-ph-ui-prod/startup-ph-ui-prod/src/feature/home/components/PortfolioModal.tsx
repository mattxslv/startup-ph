import React, { useState } from 'react';
import { Section } from '@/components/input-campaign/types';
import { useSaveStartup } from '@/feature/startup/hooks/useStartupMutate';
import useMyStartup from '@/feature/startup/hooks/useMyStartup';
import { showModal } from '@/components/modal';
import Button from '@/ui/button/Button';
import { HiX, HiCheck } from 'react-icons/hi';

interface PortfolioModalProps {
  onClose: () => void;
}

const PortfolioModalContent = ({ onClose }: PortfolioModalProps) => {
  const { data } = useMyStartup();
  const [sections, setSections] = useState<Section[]>(data?.body || []);
  const [textContent, setTextContent] = useState('');
  const mutator = useSaveStartup();

  if (!data) {
    return (
      <div className='text-center py-8'>
        <p className='text-gray-500'>Loading...</p>
      </div>
    );
  }

  const handleAddSection = () => {
    const newSection: Section = {
      type: 'RICHTEXT',
      content: textContent,
    };
    setSections([...sections, newSection]);
    setTextContent('');
  };

  const handleSave = () => {
    mutator.mutate(
      {
        payload: {
          ...data,
          body: sections,
        },
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const handleClose = () => {
    onClose();
  };

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  return (
    <div className='bg-white'>
      {/* Editor Area */}
      <div className='space-y-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Add Content to Your Portfolio
          </label>
          <textarea
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder='Write about your startup, products, achievements...'
            className='w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
          />
          <Button
            variant='primary'
            onClick={handleAddSection}
            disabled={!textContent.trim()}
            className='mt-2'
          >
            Add Section
          </Button>
        </div>

        {/* Display existing sections */}
        {sections.length > 0 && (
          <div className='space-y-2 max-h-64 overflow-y-auto'>
            <h3 className='text-sm font-medium text-gray-700'>Current Sections ({sections.length})</h3>
            {sections.map((section, index) => (
              <div key={index} className='p-3 bg-gray-50 rounded border'>
                <div className='flex justify-between items-start'>
                  <div className='flex-1'>
                    <span className='text-xs text-gray-500 font-medium'>{section.type}</span>
                    {section.type === 'RICHTEXT' && (
                      <p className='text-sm text-gray-700 mt-1 line-clamp-2'>{section.content}</p>
                    )}
                    {section.type === 'IMAGE' && (
                      <p className='text-sm text-gray-700 mt-1'>Image Section</p>
                    )}
                    {section.type === 'VIDEO' && (
                      <p className='text-sm text-gray-700 mt-1'>Video Section ({section.source})</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemoveSection(index)}
                    className='text-red-500 hover:text-red-700 ml-2 text-sm'
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className='flex items-center justify-end gap-3 mt-6 pt-4 border-t'>
        <Button
          variant='outline'
          onClick={handleClose}
          disabled={mutator.isLoading}
          leading={<HiX />}
        >
          Cancel
        </Button>
        <Button
          variant='primary'
          onClick={handleSave}
          disabled={mutator.isLoading}
          leading={<HiCheck />}
        >
          {mutator.isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export const showPortfolioModal = () => {
  showModal({
    id: 'portfolio-modal',
    title: 'Edit Portfolio',
    titleClose: true,
    size: 'xl',
    closeOutsideClick: false,
    component: (props: PortfolioModalProps) => <PortfolioModalContent {...props} />,
  });
};

