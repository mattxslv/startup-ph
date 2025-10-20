import clsx from 'clsx';

interface Props {
  value: string;
}

function RichText({ value }: Props) {
  return (
    <div
      className={clsx(
        'prose-sm',
        'prose-pre:p-2 prose-pre:m-0 prose-pre:bg-fill-dark prose-pre:text-description',
        'prose-blockquote:border-primary-base',
        'prose-ol:list-decimal prose-ul:list-disc'
      )}
    >
      <div dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
}

export default RichText;
