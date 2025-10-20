import clsx from 'clsx';
// import DOMPurify from 'dompurify'

type Props = {
  className?: string;
  value: string;
};

function Sanitize({ className, value }: Props) {
  return (
    <div
      className={clsx(className, 'richtext prose prose-sm')}
      dangerouslySetInnerHTML={{
        __html: value, // DOMPurify.sanitize(value)
      }}
    />
  );
}

export default Sanitize;
