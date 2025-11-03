import useComprehensiveStatistics from '../hooks/useComprehensiveStatistics';

function StatCard({ label, value, color = 'blue' }: { label: string; value: number; color?: string }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
  }[color] || 'bg-gray-50 text-gray-700 border-gray-200';

  return (
    <div className={`p-4 rounded-lg border-2 ${colorClasses}`}>
      <div className="text-sm font-medium opacity-80">{label}</div>
      <div className="text-3xl font-bold mt-1">{value.toLocaleString()}</div>
    </div>
  );
}

function ListCard({ title, items }: { title: string; items: Array<{ label: string; count: number }> }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">{title}</h3>
      <div className="space-y-2">
        {items.slice(0, 5).map((item, index) => (
          <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-600 truncate">{item.label || 'N/A'}</span>
            <span className="text-sm font-semibold text-gray-900 ml-2">{item.count}</span>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-gray-400 italic">No data available</p>
        )}
      </div>
    </div>
  );
}

function ComprehensiveStatistics() {
  const { data, isFetching } = useComprehensiveStatistics();

  if (isFetching) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-32 bg-gray-200 rounded-lg"></div>
        <div className="h-32 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div>
        <p className="text-xs text-gray-400 mb-3">STATISTICS OVERVIEW</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Total Startups" value={data.overview.total_startups} color="blue" />
          <StatCard label="Verified Startups" value={data.overview.verified_startups} color="green" />
          <StatCard label="For Verification" value={data.overview.for_verification} color="orange" />
          <StatCard label="Total Users" value={data.overview.total_users} color="purple" />
        </div>
      </div>

      {/* User Types */}
      <div>
        <p className="text-xs text-gray-400 mb-3">USER TYPES</p>
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Startups" value={data.user_types.startup || 0} color="blue" />
          <StatCard label="Visitors" value={data.user_types.visitor || 0} color="purple" />
          <StatCard label="Enablers" value={data.user_types.enabler || 0} color="green" />
        </div>
      </div>

      {/* Breakdown Lists */}
      <div>
        <p className="text-xs text-gray-400 mb-3">DETAILED BREAKDOWN</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ListCard title="Top Sectors" items={data.by_sector} />
          <ListCard title="Top Regions" items={data.by_region} />
          <ListCard title="Top Cities" items={data.by_city} />
          <ListCard title="Development Phase" items={data.by_phase} />
          <ListCard title="By Status" items={data.by_status} />
        </div>
      </div>
    </div>
  );
}

export default ComprehensiveStatistics;
