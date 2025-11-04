import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Toast } from 'ui/components';
import * as ws from 'lib/ws/service';

type FlagTestAccountParams = {
  id: string;
  is_test_account: boolean;
};

const useFlagTestAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, is_test_account }: FlagTestAccountParams) =>
      ws.patch({
        url: `/administrator/startups/${id}/flag-test-account`,
        payload: { is_test_account },
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['STARTUPS'] });
      queryClient.invalidateQueries({ queryKey: ['STARTUP', variables.id] });
      Toast.success(
        variables.is_test_account
          ? 'Startup flagged as test account'
          : 'Test account flag removed'
      );
    },
    onError: () => {
      Toast.error('Failed to flag test account');
    },
  });
};

export default useFlagTestAccount;
