// components/drawer/Drawer.tsx
import React, { ReactNode, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

export interface IDrawerConfig {
  position?: DrawerPosition;
  width?: string;
  className?: string;
  overlayClassName?: string;
}

interface DrawerProps extends IDrawerConfig {
  children: (props: { onClose: () => void }) => ReactNode;
  onClose: () => void;
}

const isBrowser = typeof window !== 'undefined';

const Drawer: React.FC<DrawerProps> = ({
  children,
  onClose,
  position = 'right',
  width = '400px',
  className,
  overlayClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Set drawer to open after initial render for animation
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 10);
    return () => clearTimeout(timer);
  }, []);
  
  // Handle close animation
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // Match the transition duration
  };
  
  // Handle escape key and body scroll
  useEffect(() => {
    if (!isBrowser) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const drawerStyles = {
    left: {
      top: 0,
      left: 0,
      height: '100vh',
      width,
      transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
    },
    right: {
      top: 0,
      right: 0,
      height: '100vh',
      width,
      transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
    },
    top: {
      top: 0,
      left: 0,
      width: '100%',
      height: width,
      transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
    },
    bottom: {
      bottom: 0,
      left: 0,
      width: '100%',
      height: width,
      transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
    },
  };

  if (!isBrowser) return null;

  return createPortal(
    <div className='fixed inset-0 z-50'>
      <div
        className={clsx(
          'fixed inset-0 bg-black/50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0',
          overlayClassName
        )}
        onClick={handleClose}
        aria-hidden='true'
      />
      <div
        className={clsx(
          'fixed bg-white shadow-lg transition-transform duration-300 ease-in-out',
          className
        )}
        style={drawerStyles[position]}
        role='dialog'
        aria-modal='true'
      >
        {children({ onClose: handleClose })}
      </div>
    </div>,
    document.body
  );
};

export default Drawer;
