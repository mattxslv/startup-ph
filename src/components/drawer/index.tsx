// components/drawer/index.tsx
import React, { createContext, useMemo, useReducer, useEffect } from 'react';
import Drawer, { IDrawerConfig } from './Drawer';

interface IDrawer<T = unknown> extends Partial<IDrawerConfig> {
  id: string;
  component: React.ElementType;
  props?: T;
}

interface IDrawerContext {
  drawers: Record<string, IDrawer>;
}

const DrawerContext = createContext<IDrawerContext | null>(null);

const initialState: Record<string, IDrawer> = {};

// eslint-disable-next-line
const omit = (obj: any, str: string) => {
  const res = Object.assign({}, obj);
  delete res[str];
  return res;
};

function reducer(state: Record<string, IDrawer>, action: { type: string; data: Partial<IDrawer> }) {
  switch (action.type) {
    case 'APPEND':
      return Object.assign({}, state, {
        [action?.data?.id ?? '-']: action.data,
      });
    case 'OMIT':
      return omit(state, action?.data?.id ?? '-');
    default:
      return state;
  }
}

function createDrawerInstance() {
  // eslint-disable-next-line
  let dispatcher: any;
  function Provider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(
      () => ({
        drawers: state,
      }),
      [state]
    );
    useEffect(() => {
      dispatcher = dispatch;
    }, []);
    return (
      <DrawerContext.Provider value={value}>
        {children}
        {Object.keys(state).map((key) => {
          const { component: C, props, ...rest } = state[key];
          return (
            <Drawer
              key={key}
              {...rest}
              onClose={() => dispatch({ type: 'OMIT', data: { id: key } })}
            >
              {({ onClose }: { onClose: () => void }) => <C {...(props ?? {})} onClose={onClose} />}
            </Drawer>
          );
        })}
      </DrawerContext.Provider>
    );
  }
  function showDrawer<T>(data: IDrawer<T>) {
    if (!dispatcher) {
      throw new Error('Drawer is not initialized!');
    }
    dispatcher({
      type: 'APPEND',
      data,
    });
  }
  return {
    Provider,
    showDrawer,
  };
}

const { Provider, showDrawer } = createDrawerInstance();

export { Provider, showDrawer };
