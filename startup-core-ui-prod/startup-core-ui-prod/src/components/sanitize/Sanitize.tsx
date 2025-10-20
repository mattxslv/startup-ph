import DOMPurify from 'dompurify';
import React from 'react';

type Props = {
  value: string;
};

function Sanitize({ value }: Props) {
  return (
    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(value) }} />
  );
}

export default Sanitize;
