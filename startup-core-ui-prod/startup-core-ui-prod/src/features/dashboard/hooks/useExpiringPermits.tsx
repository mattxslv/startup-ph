import { useQuery } from '@tanstack/react-query';
import { api } from 'lib/api-client';

interface ExpiringPermitsParams {
  days_ahead?: number;
  status?: 'expiring' | 'expired' | 'all';
  per_page?: number;
}

interface ExpiringPermitsStatistics {
  expired_count: number;
  expiring_30_days: number;
  expiring_15_days: number;
  expiring_7_days: number;
}

interface ExpiringPermitsResponse {
  statistics: ExpiringPermitsStatistics;
  startups: {
    data: any[];
    total: number;
    per_page: number;
    current_page: number;
  };
}

export const useExpiringPermits = (params: ExpiringPermitsParams = {}) => {
  return useQuery<ExpiringPermitsResponse>({
    queryKey: ['expiring-permits', params],
    queryFn: async () => {
      const response = await api.get<ExpiringPermitsResponse>(
        '/administrator/dashboard/expiring_permits',
        { params }
      );
      return response.data;
    },
  });
};
