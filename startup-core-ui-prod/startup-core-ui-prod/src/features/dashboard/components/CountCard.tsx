import { CgMathEqual } from 'react-icons/cg';
import { HiTrendingDown, HiTrendingUp } from 'react-icons/hi';
import { ImSpinner2 } from 'react-icons/im';

interface Props {
  label: string;
  value: string | number;
  percent: string | number;
  trend: string;
  isLoading?: boolean;
}

function CountCard({ label, value, percent, trend, isLoading }: Props) {
  const trendPercent = () => {
    // Don't show anything if there's no trend
    if (!trend || trend === '') {
      return null;
    }
    
    if (trend === 'upward')
      return (
        <div className="flex-shrink-0 flex items-center gap-1 text-green-500 text-xs font-semibold">
          <p>{percent}</p>
          <HiTrendingUp />
        </div>
      );
    if (trend === 'downward')
      return (
        <div className="flex-shrink-0 flex items-center gap-1 text-red-600 text-xs font-semibold">
          <p>{percent}</p>
          <HiTrendingDown />
        </div>
      );
    return (
      <div className="flex-shrink-0 flex items-center gap-1 text-gray-400 text-xs font-semibold">
        <p>{percent}</p>
        <CgMathEqual />
      </div>
    );
  };

  return (
    <div className="bg-white p-4 rounded-md flex items-end justify-between">
      <div className="flex-1">
        <div className="text-gray-600 text-xs font-semibold mb-2">{label}</div>
        <div className="text-lg font-bold">
          {isLoading ? (
            <ImSpinner2 className="animate-spin text-gray-400 h-7 w-7" />
          ) : (
            value
          )}
        </div>
      </div>
      {!isLoading && trendPercent()}
    </div>
  );
}

export default CountCard;
