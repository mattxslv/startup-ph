import { Button, NavIcon } from 'ui/components';
import { HiMenu, HiBell } from 'react-icons/hi';
import { NavUserInfo } from 'components';
import { useAdminShell } from 'context/admin-shell';
import { useEffect } from 'react';

export const NavHeaderTitle = ({ children }: { children: React.ReactNode }) => {
  const { setPageTitle } = useAdminShell();
  useEffect(() => {
    setPageTitle(children);
    return () => {
      setPageTitle(null);
    };
  }, [setPageTitle, children]);
  return null;
};

function NavHeader() {
  const { pageTitle, showSidebar, setShowSidebar } = useAdminShell();

  return (
    <>
      {/* for desktop */}
      <div className="border-b bg-white sticky top-0 z-20">
        <div className="h-[63px] w-full px-6 flex items-center">
          <div className="mr-6 md:hidden">
            <Button onClick={() => setShowSidebar(!showSidebar)}>
              <HiMenu />{' '}
            </Button>
          </div>
          <div className="flex items-center space-x-4">{pageTitle}</div>
          <div className="ml-auto items-center space-x-[22px] hidden md:flex">
            <NavIcon icon={HiBell} />
            <NavUserInfo />
          </div>
        </div>
      </div>

      {/* for mobile */}
      {/* <footer className="md:hidden fixed bottom-0 left-0 w-full">
        <div className="h-[63px] bg-white border-t">
          <div className="flex divide-x h-full">
            <div className="flex-1 flex">
              <div className="m-auto">Notifications</div>
            </div>
            <div className="flex-1 flex">
              <div className="m-auto">Profile</div>
            </div>
          </div>
        </div>
      </footer> */}
    </>
  );
}

export default NavHeader;
