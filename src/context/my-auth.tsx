import { queryClient, ws } from '@/lib';
import storage from '@/utils/storage';
import { createContext, Dispatch, useCallback, useContext, useEffect, useReducer } from 'react';

interface ISession {
  token?: string;
  username?: string;
}

interface IReducer {
  data: ISession;
  error?: any;
  state: TState;
}

const INIT_SESSION: ISession = {
  token: undefined,
  username: undefined,
};

const initSession = (): ISession => {
  return storage.get('_session', INIT_SESSION);
};

type TState = 'loading' | 'ready' | 'authenticating';

interface ISessionContext {
  data: ISession;
  state: TState;
  error?: any;
  setData: (t: Partial<ISession>) => void;
}

const INIT_STATE: ISessionContext = {
  data: initSession(),
  state: 'loading',
  error: undefined,
  setData: () => {},
};

const SessionContext = createContext<ISessionContext>(INIT_STATE);

function createSession() {
  let dispatcher: Dispatch<any>;

  const reducer = (state: IReducer, action: any) => {
    switch (action.type) {
      case 'SET_SESSION':
        const newState: ISession = { token: action?.token, username: 'User' };
        storage.set('_session', newState);
        return { ...state, data: newState };
      case 'LOGOUT':
        queryClient.clear();
        sessionStorage.clear();
        storage.remove('_session');
        return { ...state, data: INIT_SESSION };
      case 'SET_STATE':
        return { ...state, state: action?.state };
      case 'SET_ERROR':
        return { ...state, error: action?.error };
      case 'CLEAR_ERROR':
        return { ...state, error: undefined };
      default:
        return state;
    }
  };
  function SessionProvider({ children }: { children: any }) {
    const [redux, dispatch] = useReducer(reducer, {
      data: initSession(),
      state: 'loading',
      error: undefined,
    });
    useEffect(() => {
      dispatcher = dispatch;
      dispatch({ type: 'SET_STATE', state: 'ready' });
    }, [dispatch]);
    const setData = useCallback((newData: Partial<ISession>) => {
      dispatch({ type: 'SET_SESSION', token: newData.token });
    }, []);
    return (
      <SessionContext.Provider
        value={{ data: redux.data, state: redux.state, error: redux.error, setData }}
      >
        {children}
      </SessionContext.Provider>
    );
  }
  function useSession() {
    const context = useContext(SessionContext);
    if (!context) return INIT_STATE;
    return context;
  }
  const signIn = (payload: any, callback: () => void) => {
    if (!dispatcher) return;
    dispatcher({ type: 'SET_STATE', state: 'authenticating' });
    dispatcher({ type: 'CLEAR_ERROR' });
    ws.post<any>({
      url: '/api/v2/user/authenticate',
      payload: {
        email: payload.email,
        password: payload.password,
        captcha: payload.captcha,
      },
    })
      .then((raw) => {
        dispatcher({ type: 'SET_STATE', state: 'ready' });
        dispatcher({ type: 'SET_SESSION', token: raw?.data?.token });
        callback();
      })
      .catch((error) => {
        dispatcher({ type: 'SET_STATE', state: 'ready' });
        if (error.status === 422)
          dispatcher({ type: 'SET_ERROR', error: error, status: error?.status });
      });
  };
  const setToken = (token: string) => {
    if (!dispatcher) return;
    dispatcher({ type: 'SET_SESSION', token });
  };
  const signOut = () => {
    dispatcher({ type: 'LOGOUT' });
  };
  return {
    SessionProvider,
    useSession,
    signIn,
    signOut,
    setToken,
  };
}

const { SessionProvider, useSession, signIn, signOut, setToken } = createSession();

export { SessionProvider, useSession, signIn, signOut, setToken };
