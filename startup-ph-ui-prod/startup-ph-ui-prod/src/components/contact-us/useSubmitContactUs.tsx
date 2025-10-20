import { ws } from '@/lib';
import { useMutation } from '@tanstack/react-query';

const useSubmitContactUs = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: any }) =>
      await ws.post({
        url: '/api/v2/public/contact_us',
        payload,
      }),
  });
};

export default useSubmitContactUs;
