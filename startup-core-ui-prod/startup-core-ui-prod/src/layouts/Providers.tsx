import { Provider as SessionProvider } from 'context/session';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as ModalProvider } from 'context/modal';
import { ProfileProvider } from 'features/profile';
import { ToastProvider } from 'ui/components';
import { queryClient } from 'lib';

interface Props {
  children: JSX.Element;
}

function Providers({ children }: Props) {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ProfileProvider>
            <ModalProvider>{children}</ModalProvider>
          </ProfileProvider>
        </SessionProvider>
      </QueryClientProvider>
    </ToastProvider>
  );
}

export default Providers;
