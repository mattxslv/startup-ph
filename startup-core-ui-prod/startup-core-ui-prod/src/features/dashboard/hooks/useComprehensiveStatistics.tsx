import { useQuery } from '@tanstack/react-query';
import * as ws from 'lib/ws/service';

export interface DashboardStatistics {
  overview: {
    total_startups: number;
    verified_startups: number;
    for_verification: number;
    total_users: number;
  };
  user_types: {
    visitor?: number;
    startup?: number;
    enabler?: number;
  };
  by_sector: Array<{ label: string; count: number }>;
  by_region: Array<{ label: string; count: number }>;
  by_city: Array<{ label: string; count: number }>;
  by_phase: Array<{ label: string; count: number }>;
  by_status: Array<{ label: string; count: number }>;
}

const useComprehensiveStatistics = (filters?: any) => {
  return useQuery({
    queryKey: ['COMPREHENSIVE_STATISTICS', filters],
    queryFn: async () => {
      const response = await ws.get<DashboardStatistics>({
        url: '/administrator/dashboard/comprehensive-statistics',
        params: filters,
      });
      return response;
    },
  });
};

export default useComprehensiveStatistics;
