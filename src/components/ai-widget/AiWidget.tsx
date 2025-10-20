import React, { useState } from 'react';
import { HiSparkles, HiX } from 'react-icons/hi';

function Tooltip({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
      <div className="animate-bounce">
        <div className="bg-gray-800 text-white font-medium py-1 px-2 text-xs shadow-lg rounded whitespace-nowrap">
          Try our<br />eGov AI
        </div>
        <div className="absolute h-2 w-2 bg-gray-800 rotate-45 -bottom-1 left-1/2 transform -translate-x-1/2" />
      </div>
    </div>
  );
}

const AI_URL = 'https://chat-ai-poc.oueg.info/startup';

function AiWidget() {
  const [showTooltip, setShowTooltip] = useState(true);
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (!AI_URL) return null;

  return (
    <>
      {/* AI Chat Popup Window */}
      {show && (
        <div className="fixed bottom-24 right-6 w-[28rem] h-[36rem] bg-white rounded-2xl shadow-2xl border border-gray-200/80 z-[9999] pointer-events-auto backdrop-blur-sm">
          <div className="relative h-full">
            {!loaded && (
              <div className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center z-10">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            <iframe
              className="border-none w-full h-full rounded-2xl"
              src={`${AI_URL}?long_answer=1`}
              title="chat widget"
              onLoad={() => setLoaded(true)}
            />
          </div>
        </div>
      )}

      {/* AI Chat Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[9998]">
        <div className="relative">
          <Tooltip show={showTooltip} />
          <button
            className="pointer-events-auto rounded-full h-16 w-16 bg-primary shadow-lg hover:shadow-xl text-white flex justify-center items-center transition-all duration-200 hover:scale-110"
            type="button"
            onClick={() => {
              setShow(!show);
              setShowTooltip(false);
            }}
          >
            {show ? (
              <HiX className="h-8 w-8" />
            ) : (
              <HiSparkles className="h-8 w-8" />
            )}
            <span className="sr-only">Open AI</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default AiWidget;
