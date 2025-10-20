import { ws } from '@/lib';
import Toast from '@/ui/toast/Toast';
import { useMutation } from '@tanstack/react-query';

export function useResubmitProgram() {
  return useMutation({
    mutationFn: async ({
      application_id,
      program_id,
      requirements,
    }: {
      application_id: string;
      program_id: string;
      requirements: Array<{ requirement_id: string; value: string }>;
    }) => {
      await Promise.all(
        requirements.map((payload) =>
          ws.post({
            url: '/api/v2/user/startup/requirements',
            payload,
          })
        )
      );

      await ws.post({
        url: `/api/v2/user/startup/applications/${application_id}/resubmit`,
        payload: {
          program_id,
        },
      });

      Toast.success('Application Submitted!');

      // ws.post({
      //   url: '/api/v2/user/startup/requirements',
      //   payload,
      // })
    },
  });
}
