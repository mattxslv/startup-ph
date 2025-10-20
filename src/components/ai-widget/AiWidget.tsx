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



const AI_URL = 'https://chat-ai-poc.oueg.info/startup';

function AiWidget() {
  const [showTooltip, setShowTooltip] = useState(true);
  const [show, setShow] = useState(false);
  if (!AI_URL) return null;

  return (
    <>
      {/* AI Chat Popup Window */}
      {show && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-[9999] pointer-events-auto">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">eGov AI Assistant</h3>
            <button
              onClick={() => setShow(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <HiX className="h-5 w-5" />
            </button>
          </div>
          <div className="p-4 h-[calc(100%-4rem)]">
            <iframe
              className="border-none w-full h-full rounded"
              src={`${AI_URL}?long_answer=1`}
              title="chat widget"
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
