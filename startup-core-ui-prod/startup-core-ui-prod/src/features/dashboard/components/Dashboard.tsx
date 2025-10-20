import HeatMap from './HeatMap';
import Overview from './Overview';
import LatestStartup from './LatestStartup';
import { toPng } from 'html-to-image';
import { useCallback, useRef } from 'react';
import { Acl } from 'features/profile';
import ReturnReasonCounts from './ReturnReasonCounts';

function Dashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'dashboard.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);
  return (
    <div className="space-y-3" ref={ref}>
      <Overview onExport={onButtonClick} />
      <HeatMap />
      <Acl code={['startups-view']}>
        <LatestStartup />
        <ReturnReasonCounts />
      </Acl>
    </div>
  );
}

export default Dashboard;
