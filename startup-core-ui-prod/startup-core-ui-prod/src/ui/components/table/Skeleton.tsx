import clsx from 'clsx';

const Skeleton = ({ noOfRow = 8 }: { noOfRow?: number }) => {
  const header = ['w-[30%]', 'w-[30%]', 'w-[30%]', 'w-[30%]'];
  const body = ['w-[70%]', 'w-[80%]', 'w-[70%]', 'w-[70%]'];

  return (
    <div className="border border-gray-200/90 animate-pulse">
      <div className="grid grid-cols-[1fr_2fr_1fr_1fr] bg-slate-50 p-5 ">
        {header.map((className, i) => (
          <div key={i}>
            <div className={clsx('bg-gray-300 h-3 rounded-sm', className)} />
          </div>
        ))}
      </div>
      <div className="divide-y divide-gray-200/90">
        {[...Array(noOfRow)].map((_, i) => (
          <div key={i} className="grid grid-cols-[1fr_2fr_1fr_1fr] p-5">
            {body.map((className, idx) => (
              <div key={idx}>
                <div
                  className={clsx('bg-gray-200 h-3 rounded-sm', className)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
