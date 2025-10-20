import React from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

interface TurnstileWidgetProps {
  onTokenChange: (token: string | null) => void;
}

const TurnstileWidget: React.FC<TurnstileWidgetProps> = ({ onTokenChange }) => {
  return (
    <Turnstile
      siteKey={import.meta.env.VITE_TURNSTILE_KEY || '1x00000000000000000000AA'}
      onSuccess={onTokenChange}
      onError={() => onTokenChange(null)}
      onExpire={() => onTokenChange(null)}
      options={{
        theme: 'light',
        size: 'normal',
        appearance: 'always',
        language: 'auto',
      }}
    />
  );
};

export default TurnstileWidget;
