import { createContext } from 'react';

interface ITabContext {
  tab: string;
  setTab: (s: string) => void;
}

export const TabContext = createContext<ITabContext | null>(null);
