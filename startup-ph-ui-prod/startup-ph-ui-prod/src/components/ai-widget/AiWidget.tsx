import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { HiSparkles, HiX } from 'react-icons/hi';

function Tooltip({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="absolute -top-16 -right-3">
      <div className="animate-bounce">
        <div className="bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg w-auto whitespace-nowrap">
          Try our eGov AI
        </div>
        <div className="absolute h-6 w-6 bg-gray-700 rounded rotate-45 translate-y-[-50%] left-[50%] translate-x-[calc(-50%+16px)]" />
      </div>
    </div>
  );
}

Tooltip.propTypes = {
  show: PropTypes.bool.isRequired,
};

const AI_URL = 'https://chat-ai-poc.oueg.info/startup';

function AiWidget() {
  const [showTooltip, setShowTooltip] = useState(true);
  const [show, setShow] = useState(false);
  if (!AI_URL) return null;
  return (
    <div
      className={clsx(
        'fixed inset-0 pointer-events-none z-[9999] transition-all',
        show ? 'bg-black/40' : 'bg-transparent/0'
      )}
    >
      <div
        className={clsx(
          'relative bg-white h-[calc(100%-9rem)] w-full transition-all',
          show
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 translate-y-4'
        )}
      >
        <iframe
          className="border-none inset-0 h-full w-full"
          src={`${AI_URL}?long_answer=1`}
          title="chat widget"
        />
      </div>
      <div className="absolute bottom-0 right-0 px-8 py-12">
        <div className="relative">
          <Tooltip show={showTooltip} />
          <button
            className="pointer-events-auto rounded-full h-20 w-20 bg-primary shadow-sm text-white flex justify-center items-center"
            type="button"
            onClick={() => {
              setShow(!show);
              setShowTooltip(false);
            }}
          >
            {show ? (
              <HiX className="h-12 w-12" />
            ) : (
              <HiSparkles className="h-12 w-12" />
            )}
            <span className="sr-only">Open AI</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AiWidget;
