import usePersistState from "@/hooks/usePersistState";
import { createContext, useContext } from "react";

interface ITabContext {
  tab: any
  setTab: (x: any) => void
}

const TabContext = createContext<ITabContext | null>(null);

function createTabContext<T>() {
  function TabProvider({ id, defaultTab, children } : {
    id: string
    defaultTab: T,
    children: React.ReactNode
  }) {
    const [tab, setTab] = usePersistState(id, defaultTab);
    return (
      <TabContext.Provider value={{ tab, setTab }}>
        {children}
      </TabContext.Provider>
    )
  }
  function useTab() {
    const context = useContext(TabContext);
    if (!context) throw new Error('Not in provider!');
    return context as {
      tab: T,
      setTab: (x: T) => void
    };
  }
  return {
    TabProvider,
    useTab,
  }
}

const { TabProvider, useTab } = createTabContext();

export {
  TabProvider,
  useTab,
};