import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { Provider as ModalProvider } from '@/components/modal';
import { ConfirmAlertProvider } from '@/components/confirm-alert';
import { SessionProvider } from '@/context/my-auth';
import { ToastProvider } from '@/ui/toast/Toast';
import type { AppProps } from 'next/app';
import { queryClient } from '@/lib';
import 'react-datepicker/dist/react-datepicker.css';
import '@/lib/react-datepicker/custom-style.css';
import '@/styles/globals.css';
import 'aos/dist/aos.css';
import ModalContainer from 'egov-upload-widget/modal-container';
import { Provider as DrawerProvider } from '@/components/drawer';

export default function App({ Component, pageProps: { /* session, */ ...pageProps } }: AppProps) {
  return (
    // <SessionProvider session={session}>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ConfirmAlertProvider>
          <ToastProvider>
            <DrawerProvider>
              <ModalProvider>
                <SessionProvider>
                  <Component {...pageProps} />
                  <ModalContainer />
                </SessionProvider>
              </ModalProvider>
            </DrawerProvider>
          </ToastProvider>
        </ConfirmAlertProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
