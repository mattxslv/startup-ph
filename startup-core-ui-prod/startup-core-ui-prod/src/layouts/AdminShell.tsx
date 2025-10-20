import clsx from 'clsx';
import { NavHeader } from 'components';
import { Outlet } from 'react-router-dom';
import { Provider } from 'context/admin-shell';
import { logo } from 'assets/images';
import Sidebar from './admin/Sidebar';
import { Suspense } from 'react';
import PageContainer from './PageContainer';

// interface Props {
//   children: JSX.Element
// }

const AdminShell = (): JSX.Element => {
  return (
    <Provider>
      {({ showSidebar, setShowSidebar }) => (
        <>
          <aside className="fixed top-0 h-full w-full z-30 flex pointer-events-none">
            <div
              className={clsx(
                'flex flex-col w-[240px] border-r overflow-auto bg-white relative z-10 pointer-events-auto transition',
                showSidebar
                  ? 'translate-x-0'
                  : '-translate-x-full md:translate-x-0'
              )}
            >
              <div className="px-6 py-4 md:py-10">
                <div className="flex justify-center text-white items-center">
                  <div className="font-black text-xl mr-2">
                    <img
                      className="h-12 object-left object-contain"
                      src={logo}
                      alt="brand"
                    />
                  </div>
                </div>
              </div>
              <Sidebar />
            </div>
            <div
              className={clsx(
                'fixed inset-0 bg-black/20 transition block md:hidden',
                showSidebar ? 'opacity-100 pointer-events-auto' : 'opacity-0'
              )}
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </aside>
          <main className="pl-0 md:pl-[240px] min-h-screen flex flex-col">
            <NavHeader />
            <Suspense fallback={<PageContainer>&nbsp;</PageContainer>}>
              <Outlet />
            </Suspense>
          </main>
        </>
      )}
    </Provider>
  );
};

export default AdminShell;
