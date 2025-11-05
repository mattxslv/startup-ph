import HeatMap from './HeatMap';
import Overview from './Overview';
import LatestStartup from './LatestStartup';
import AdvancedAnalytics from './AdvancedAnalytics';
import { ExpiringPermitsCard } from './ExpiringPermitsCard';
import { ExportButtons } from './ExportButtons';
import { useCallback, useState } from 'react';
import { Acl } from 'features/profile';
import ReturnReasonCounts from './ReturnReasonCounts';

function Dashboard() {
  const [showExportMenu, setShowExportMenu] = useState(false);
  
  const onButtonClick = useCallback(() => {
    setShowExportMenu(!showExportMenu);
  }, [showExportMenu]);

  return (
    <div className="space-y-3">
      <Overview onExport={onButtonClick} />
      
      {showExportMenu && (
        <div className="bg-white p-4 rounded-lg shadow">
          <p className="text-sm font-semibold mb-3">Export Options</p>
          <ExportButtons />
        </div>
      )}
      
      <AdvancedAnalytics />
      <ExpiringPermitsCard />
      <HeatMap />
      <Acl code={['startups-view']}>
        <LatestStartup />
        <ReturnReasonCounts />
      </Acl>
    </div>
  );
}

export default Dashboard;
