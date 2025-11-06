import React, { useState, useEffect, useRef } from 'react';
import { HiX, HiPaperAirplane } from 'react-icons/hi';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Add popup animation styles
const popupStyles = `
  @keyframes chatPopIn {
    0% {
      opacity: 0;
      transform: scale(0.3) translateX(20px) translateY(20px);
      transform-origin: bottom right;
    }
    50% {
      opacity: 0.8;
      transform: scale(1.05) translateX(0) translateY(0);
      transform-origin: bottom right;
    }
    100% {
      opacity: 1;
      transform: scale(1) translateX(0) translateY(0);
      transform-origin: bottom right;
    }
  }
  
  @keyframes chatPopOut {
    0% {
      opacity: 1;
      transform: scale(1) translateX(0) translateY(0);
      transform-origin: bottom right;
    }
    50% {
      opacity: 0.6;
      transform: scale(0.8) translateX(10px) translateY(10px);
      transform-origin: bottom right;
    }
    100% {
      opacity: 0;
      transform: scale(0.3) translateX(20px) translateY(20px);
      transform-origin: bottom right;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

// Custom AI Assistant Icon Component
const AIAssistantIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
    <circle cx="8" cy="10" r="1"/>
    <circle cx="12" cy="10" r="1"/>
    <circle cx="16" cy="10" r="1"/>
  </svg>
);

function SimpleChatbot() {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! 👋 I\'m your Startup Registration Assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animationOffset, setAnimationOffset] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Smooth floating animation
  useEffect(() => {
    let animationId: number;
    let startTime: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Create a smooth sine wave for floating effect
      const offset = Math.sin(elapsed * 0.001) * 6; // 6px amplitude
      setAnimationOffset(offset);
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Filter out the initial greeting message from conversation history
      const conversationHistory = messages
        .filter(msg => msg.content !== "Hi! 👋 I'm your Startup Registration Assistant. How can I help you today?")
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

      const response = await fetch('http://localhost:8080/api/v2/user/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          conversation_history: conversationHistory,
        }),
      });

      const data = await response.json();
      
      console.log('Chatbot API Response:', data);

      if (data.success) {
        // Clean up the response to remove excessive markdown formatting
        let cleanedMessage = data.message;
        
        // Remove the greeting if it appears in the response
        cleanedMessage = cleanedMessage.replace(/Hi! 👋 I'm your Startup Registration Assistant\. How can I help you today\?\s*/g, '');
        
        // Remove ALL markdown formatting including asterisks
        cleanedMessage = cleanedMessage.replace(/\*\*([^*]+)\*\*/g, '$1'); // Remove **bold**
        cleanedMessage = cleanedMessage.replace(/\*([^*]+)\*/g, '$1'); // Remove *italic*
        cleanedMessage = cleanedMessage.replace(/###\s*/g, ''); // Remove ### headers
        cleanedMessage = cleanedMessage.replace(/##\s*/g, ''); // Remove ## headers
        cleanedMessage = cleanedMessage.replace(/#\s*/g, ''); // Remove # headers
        
        const assistantMessage: Message = {
          role: 'assistant',
          content: cleanedMessage.trim(),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again or contact support.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    'What documents do I need?',
    'DTI vs SEC - which one?',
    'How long does verification take?',
    'What is a startup enabler?',
  ];

  const handleQuickQuestion = async (question: string) => {
    const userMessage: Message = {
      role: 'user',
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Filter out the initial greeting message from conversation history
      const conversationHistory = messages
        .filter(msg => msg.content !== "Hi! 👋 I'm your Startup Registration Assistant. How can I help you today?")
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

      const response = await fetch('http://localhost:8080/api/v2/user/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: question,
          conversation_history: conversationHistory,
        }),
      });

      const data = await response.json();
      
      console.log('Chatbot API Response (Quick Question):', data);

      if (data.success) {
        // Clean up the response to remove excessive markdown formatting
        let cleanedMessage = data.message;
        
        // Remove the greeting if it appears in the response
        cleanedMessage = cleanedMessage.replace(/Hi! 👋 I'm your Startup Registration Assistant\. How can I help you today\?\s*/g, '');
        
        // Remove ALL markdown formatting including asterisks
        cleanedMessage = cleanedMessage.replace(/\*\*([^*]+)\*\*/g, '$1'); // Remove **bold**
        cleanedMessage = cleanedMessage.replace(/\*([^*]+)\*/g, '$1'); // Remove *italic*
        cleanedMessage = cleanedMessage.replace(/###\s*/g, ''); // Remove ### headers
        cleanedMessage = cleanedMessage.replace(/##\s*/g, ''); // Remove ## headers
        cleanedMessage = cleanedMessage.replace(/#\s*/g, ''); // Remove # headers
        
        const assistantMessage: Message = {
          role: 'assistant',
          content: cleanedMessage.trim(),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chatbot error (Quick Question):', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again or contact support.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    // Add a slight delay to show the button click animation
    setTimeout(() => {
      setIsOpen(true);
      setIsClosing(false);
    }, 100);
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 200); // Match animation duration
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: popupStyles }} />
      {/* Chat Button - Only show when chat is closed */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <div 
            className="relative transition-transform duration-100 ease-out"
            style={{
              transform: `translateY(${animationOffset}px)`
            }}
          >
            {/* Animated background glow - synchronized with main button */}
            <div 
              className={`absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300`}
              style={{
                transform: `scale(${1.1 + Math.abs(animationOffset) * 0.01}) translateY(${animationOffset * 0.5}px)`,
                opacity: isHovered ? 0.5 : 0.3 + Math.abs(animationOffset) * 0.02
              }}
            />
            
            {/* Main button */}
            <button
              className={`relative rounded-full h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl text-white flex justify-center items-center transition-all duration-300 transform ${isHovered ? 'scale-110' : 'scale-100'} group active:scale-95`}
              type="button"
              onClick={handleClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Icon container with rotation animation on hover */}
              <div className={`relative transition-transform duration-300 ${isHovered ? 'rotate-12' : 'rotate-0'}`}>
                <AIAssistantIcon className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              
              <span className="sr-only">Open AI Assistant</span>
            </button>

            {/* Tooltip - positioned outside button to avoid rotation */}
            <div className={`absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200 z-10 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
              💬 AI Assistant
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900" />
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div 
                className="absolute top-1 right-1 w-1.5 h-1.5 bg-blue-300 rounded-full transition-all duration-100"
                style={{
                  transform: `translateY(${animationOffset * -0.8}px) rotate(${animationOffset * 2}deg)`,
                  opacity: 0.8 + animationOffset * 0.05
                }}
              />
              <div 
                className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-purple-300 rounded-full transition-all duration-100"
                style={{
                  transform: `translateY(${animationOffset * -0.6}px) translateX(${animationOffset * 0.3}px)`,
                  opacity: 0.8 + animationOffset * 0.03
                }}
              />
              <div 
                className="absolute top-3 left-1 w-1 h-1 bg-white rounded-full transition-all duration-100"
                style={{
                  transform: `scale(${1 + Math.abs(animationOffset) * 0.05})`,
                  opacity: 0.9 - Math.abs(animationOffset) * 0.02
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          className='fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden'
          style={{
            animation: isClosing ? 'fadeOut 0.2s ease-in' : 'fadeIn 0.3s ease-out'
          }}
          onClick={handleClose}
        />
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className='fixed bottom-6 right-6 w-[95vw] max-w-md h-[80vh] max-h-[550px] bg-white rounded-xl shadow-2xl z-50 flex flex-col border border-gray-100 overflow-hidden'
          style={{
            animation: isClosing ? 'chatPopOut 0.2s ease-in forwards' : 'chatPopIn 0.3s ease-out forwards',
            transformOrigin: 'bottom right'
          }}
        >
          {/* Header */}
          <div className='bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-5 md:rounded-t-xl flex justify-between items-center shadow-lg'>
            <div className='flex items-center space-x-3'>
              <div className='w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center'>
                <span className='text-xl'>🤖</span>
              </div>
              <div>
                <h3 className='font-bold text-lg'>Startup Assistant</h3>
                <p className='text-xs text-blue-100 flex items-center'>
                  <span className='w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse'></span>
                  Online • Ready to help!
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className='hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all duration-200 hover:scale-110 hover:rotate-90'
              aria-label='Close chat'
            >
              <HiX className='w-5 h-5' />
            </button>
          </div>

          {/* Messages */}
          <div className='flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-50 to-white'>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-3 duration-200`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`flex items-end space-x-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {message.role === 'user' ? 'You' : '🤖'}
                  </div>
                  
                  {/* Message bubble */}
                  <div
                    className={`rounded-2xl px-4 py-3 shadow-sm ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
                    }`}
                  >
                    <p className='text-sm leading-relaxed whitespace-pre-wrap'>{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className='flex justify-start animate-in slide-in-from-bottom-3 duration-200'>
                <div className='flex items-end space-x-2'>
                  <div className='flex-shrink-0 w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-bold'>
                    🤖
                  </div>
                  <div className='bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm'>
                    <div className='flex space-x-1'>
                      <div className='w-2 h-2 bg-blue-500 rounded-full animate-bounce'></div>
                      <div
                        className='w-2 h-2 bg-purple-500 rounded-full animate-bounce'
                        style={{ animationDelay: '0.1s' }}
                      ></div>
                      <div
                        className='w-2 h-2 bg-indigo-500 rounded-full animate-bounce'
                        style={{ animationDelay: '0.2s' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions (only show if no messages from user yet) */}
          {messages.length === 1 && (
            <div className='px-6 pb-4 bg-white border-t border-gray-100'>
              <p className='text-sm font-medium text-gray-600 mb-3 mt-4'>💡 Quick questions to get started:</p>
              <div className='grid grid-cols-1 gap-2'>
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className='text-sm bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-700 px-4 py-3 rounded-xl border border-blue-200 transition-all duration-200 text-left hover:shadow-md hover:scale-[1.02] flex items-center space-x-2'
                  >
                    <span className='text-blue-500'>❓</span>
                    <span>{question}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className='p-6 border-t border-gray-200 bg-white md:rounded-b-xl'>
            <div className='flex gap-3 items-end'>
              <div className='flex-1'>
                <input
                  type='text'
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder='Ask me anything about startup registration...'
                  className='w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 disabled:bg-gray-50 resize-none'
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
                aria-label='Send message'
              >
                <HiPaperAirplane className='w-5 h-5' />
              </button>
            </div>
            <div className='flex items-center justify-center mt-3 space-x-2'>
              <span className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></span>
              <p className='text-xs text-gray-500'>
                Powered by Your AI • Secure & Private
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SimpleChatbot;