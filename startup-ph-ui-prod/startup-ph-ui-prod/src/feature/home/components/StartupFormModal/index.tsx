import React, { ReactNode } from 'react';
import { showModal } from '@/components/modal';
import Identity from './Identity';
import Contact from './Contact';
import Startup from './Startup';
import Funding from './Funding';
import WebSocialMedia from './WebSocialMedia';

interface IStartupFormModalProps {
  onClose: () => void;
  children: ReactNode;
}

const MODAL_SECTIONS = {
  IDENTITY: 1,
  CONTACT: 2,
  STARTUP_INFO: 3,
  FUNDING: 4,
  SOCIAL_MEDIA: 5,
} as const;

const SECTION_TITLES: Record<number, string> = {
  [MODAL_SECTIONS.IDENTITY]: 'Startup Identity',
  [MODAL_SECTIONS.CONTACT]: 'Contact Information',
  [MODAL_SECTIONS.STARTUP_INFO]: 'Startup Information',
  [MODAL_SECTIONS.FUNDING]: 'Funding Information',
  [MODAL_SECTIONS.SOCIAL_MEDIA]: 'Web & Social Media',
};

const SECTION_COMPONENTS: Record<number, React.ComponentType<IStartupFormModalProps>> = {
  [MODAL_SECTIONS.IDENTITY]: Identity,
  [MODAL_SECTIONS.CONTACT]: Contact,
  [MODAL_SECTIONS.STARTUP_INFO]: Startup,
  [MODAL_SECTIONS.FUNDING]: Funding,
  [MODAL_SECTIONS.SOCIAL_MEDIA]: WebSocialMedia,
};

export const StartupFormModal = (section: number) => {
  const title = SECTION_TITLES[section];
  const Component = SECTION_COMPONENTS[section];

  showModal({
    id: 'startup-form-modal',
    title,
    titleClose: true,
    size: 'lg',
    component: (props: IStartupFormModalProps) => <Component {...props} />,
  });
};
