interface Props {
  value: string;
  label: string;
}

function CodeSnippet({ value, label }: Props) {
  return (
    <div>
      <div className="uppercase font-bold text-xs mb-1 text-description">
        {label}
      </div>
      <div className="bg-fill-dark rounded shadow-active p-4">
        <pre className="whitespace-pre-wrap">
          {JSON.stringify(value, undefined, 2)}
        </pre>
      </div>
    </div>
  );
}

export default CodeSnippet;
