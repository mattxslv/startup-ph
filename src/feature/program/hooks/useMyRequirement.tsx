import { useSession } from '@/context/my-auth';
import { ws } from '@/lib'
import { useQuery } from '@tanstack/react-query'

function useMyRequirement() {
  const session = useSession();
  return useQuery({
    queryKey: ['MY_REQUIREMENTS'],
    queryFn: async () => {
      return await ws.get({
        url: '/api/v2/user/startup/requirements',
        transform: (res) => {
          const response: Record<string, string> = {};
          (res?.data?.data || []).forEach((row: any) => {
            response[String(row?.requirement_id)] = row?.value || '';
          })
          return response;
        }
      })
    },
    enabled: Boolean(session.data.token)
  })
}

export default useMyRequirement