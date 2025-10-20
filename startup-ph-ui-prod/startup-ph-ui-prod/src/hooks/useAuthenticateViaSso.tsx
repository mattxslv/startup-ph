import { setToken } from '@/context/my-auth';
import { ws } from '@/lib';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const useEGovSso = () => {
  return useMutation({
    mutationFn: async ({ payload }: { payload: { exchange_code: string } }) =>
      await ws.post({
        url: '/api/v2/user/egov/sso_auth',
        payload,
        transform: (raw) => raw?.data?.token,
      }),
  });
};

const useAuthenticateViaSso = (query: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{ message: string } | null>(null);
  const mutator = useEGovSso();
  const router = useRouter();

  useEffect(() => {
    if (!query.exchange_code) {
      setError({
        message: 'Invalid pathname',
      });
      setIsLoading(false);
      return;
    }
    mutator.mutate(
      { payload: { exchange_code: `${query.exchange_code}` } },
      {
        onSuccess: (token) => {
          setToken(token);
          setIsLoading(false);
          router.replace('/');
        },
        onError: (err: any) => {
          setError({ message: err?.message });
          setIsLoading(false);
        },
      }
    );
    // eslint-disable-next-line
  }, [query.exchange_code]);
  return {
    isLoading,
    error,
  };
};

export default useAuthenticateViaSso;
