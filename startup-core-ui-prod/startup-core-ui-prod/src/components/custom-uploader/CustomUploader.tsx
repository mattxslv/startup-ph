import { useEffect } from 'react';
import { Img, Toast } from 'ui/components';
import formatNumber from 'utils/formatNumber';

const CustomUploader = (props: any): JSX.Element => {
  const {
    onToggleMenu,
    MenuComponent,
    isShowMenu,
    progressPercentage,
    dataName,
    dataUrl,
    error,
  } = props;
  useEffect(() => {
    if (!error) return;
    Toast.error(error);
  }, [error]);
  return (
    <div className="relative">
      <button onClick={onToggleMenu}>
        <Img
          alt={dataName}
          className="h-24 w-32 flex-none rounded ring-1 ring-slate-900/10 p-1"
          src={dataUrl}
        />
        <div className="absolute bottom-0 left-0 w-full bg-black/30 z-20 text-xs text-center py-0.5 text-white">
          {typeof progressPercentage === 'number'
            ? `- ${formatNumber(progressPercentage, 1)}% -`
            : 'Click to edit'}
        </div>
      </button>
      <div>{isShowMenu ? MenuComponent : null}</div>
    </div>
  );
};

export default CustomUploader;
