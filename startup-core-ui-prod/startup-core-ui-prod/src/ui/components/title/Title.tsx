interface Props {
  className?: string;
  subTitle?: string;
  children: React.ReactNode;
}

function Title({ className, subTitle, children }: Props) {
  return (
    <div className={className}>
      <div className="leading-[18px] font-semibold">{children}</div>
      {subTitle ? (
        <div className="leading-4 text-sm text-description">{subTitle}</div>
      ) : null}
    </div>
  );
}

export default Title;
