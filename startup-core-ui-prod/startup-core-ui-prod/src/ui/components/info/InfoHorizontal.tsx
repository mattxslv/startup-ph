interface Props {
  label: string;
  labelWidth?: number | string;
  children: React.ReactNode;
}

function InfoHorizontal({ label, labelWidth, children }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <p
        title={label}
        className="flex-shrink-0 text-description text-xs leading-4 font-semibold truncate"
        style={{ width: labelWidth }}
      >
        {label}
      </p>
      <p className="flex-1 min-w-0 text-black text-sm leading-4">{children}</p>
    </div>
  );
}

InfoHorizontal.defaultProps = {
  labelWidth: '180px',
};

export default InfoHorizontal;
