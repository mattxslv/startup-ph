import { createContext, useContext } from 'react';
import { IProfile } from './types';
import useFetchProfile from './hooks/useFetchProfile';
import { Splash, UpdatePass } from 'components';

interface IProfileContext {
  profile: IProfile;
}

const ProfileContext = createContext<IProfileContext | null>(null);

function create() {
  function ProfileProvider({ children }: { children: React.ReactNode }) {
    const { isLoading, data: profile, fetchStatus } = useFetchProfile();
    if (profile?.with_temporary_password) return <UpdatePass />;
    if (fetchStatus !== 'idle' || isLoading) return <Splash />;
    return (
      <ProfileContext.Provider value={{ profile }}>
        {children}
      </ProfileContext.Provider>
    );
  }
  function useProfile() {
    const context = useContext(ProfileContext);
    if (!context) throw new Error('Not in provider');
    return context;
  }
  return { ProfileProvider, useProfile };
}

const { ProfileProvider, useProfile } = create();

export { ProfileProvider, useProfile };
