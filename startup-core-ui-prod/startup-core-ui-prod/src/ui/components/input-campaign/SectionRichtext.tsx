import React from 'react';
import Sanitize from './Sanitize';

type Props = {
  content: string;
};

function SectionRichtext({ content }: Props) {
  return (
    <div className="bg-white p-4">
      <Sanitize value={content} />
    </div>
  );
}

export default SectionRichtext;
