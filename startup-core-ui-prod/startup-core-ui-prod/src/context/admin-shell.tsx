import { createContext, useContext, useMemo, useState } from 'react';

interface IStore {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  pageTitle: React.ReactNode | null;
  setPageTitle: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
}

function createInstance() {
  const StoreContext = createContext<IStore | null>(null);

  const useAdminShell = (): IStore => {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('Please use inside admin shell!');
    }
    return store;
  };

  function Provider({
    children,
  }: {
    children: (v: IStore) => JSX.Element | JSX.Element[];
  }) {
    const [showSidebar, setShowSidebar] = useState(false);
    const [pageTitle, setPageTitle] = useState<React.ReactNode | null>(null);
    const memoValue = useMemo(
      () => ({
        showSidebar,
        setShowSidebar,
        pageTitle,
        setPageTitle,
      }),
      [showSidebar, setShowSidebar, pageTitle, setPageTitle]
    );
    return (
      <StoreContext.Provider value={memoValue}>
        {children(memoValue)}
      </StoreContext.Provider>
    );
  }

  return { Provider, useAdminShell };
}

const { Provider, useAdminShell } = createInstance();

export { Provider, useAdminShell };
