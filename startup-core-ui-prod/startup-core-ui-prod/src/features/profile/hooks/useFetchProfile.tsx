import { ws } from 'lib';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { useSession } from 'context/session';
import { IProfile } from '../types';
import { useEffect } from 'react';

const transformProfile = (raw: any): IProfile => ({
  name: raw?.display_name,
  email: raw?.email,
  photo_url: raw?.photo_url,
  permissions: ['ALL_ACCESS', ...(raw?.abilities || [])],
  with_temporary_password: raw?.with_temporary_password,
});

const fetch =
  () =>
  async ({ signal }: QueryFunctionContext) =>
    ws.get<IProfile>(
      {
        url: '/api/v2/administrator/profile',
        transform: (res) => transformProfile(res?.data?.data),
      },
      { signal }
    );
// const fetch = () => async () => transformProfile({
//   profile: {
//     first_name: 'Admin',
//     last_name: 'User',
//     roles: [
//       'User'
//     ],
//   }
// })

const INITIAL_DATA: IProfile = {
  email: '',
  name: '',
  photo_url: '',
  permissions: [],
  with_temporary_password: 0,
};

const useFetchProfile = (params?: any) => {
  const [isAuthenticated, setSession] = useSession(
    (state) => state.isAuthenticated
  );
  const query = useQuery({
    queryKey: ['PROFILE'],
    queryFn: fetch(),
    onError: (err) => {
      setSession({ isAuthenticated: false, token: undefined });
    },
    // staleTime: 1000,
    initialData: INITIAL_DATA,
    enabled: isAuthenticated,
  });
  useEffect(() => {
    if (!isAuthenticated) {
      // console.log('do stuff for not auth!');
      return;
    }
    query.refetch();
  }, [isAuthenticated]);
  return query;
};

export default useFetchProfile;
