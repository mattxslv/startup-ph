import { useMutation, useQueryClient } from '@tanstack/react-query';
import { showToast } from 'ui/components';
import { api } from 'lib/api-client';

type FlagTestAccountParams = {
  id: string;
  is_test_account: boolean;
};

const useFlagTestAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, is_test_account }: FlagTestAccountParams) =>
      api.patch(`/administrator/startups/${id}/flag-test-account`, {
        is_test_account,
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['STARTUPS'] });
      queryClient.invalidateQueries({ queryKey: ['STARTUP', variables.id] });
      showToast({
        variant: 'success',
        message: variables.is_test_account
          ? 'Startup flagged as test account'
          : 'Test account flag removed',
      });
    },
    onError: () => {
      showToast({
        variant: 'danger',
        message: 'Failed to flag test account',
      });
    },
  });
};

export default useFlagTestAccount;
