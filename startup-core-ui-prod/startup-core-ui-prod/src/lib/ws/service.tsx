import axios, { AxiosRequestConfig } from 'axios';
import { throttle } from 'lodash';
import { Toast } from 'ui/components';
import storage from 'utils/storage';

interface IParams<T> {
  url: string;
  params?: any;
  payload?: any;
  transform?: (res: any) => T;
}

interface IPayload<T> {
  url: string;
  payload?: any;
  transform?: (res: any) => T;
}

const TIMEOUT = 30000;

const instance = axios.create({
  baseURL: import.meta.env.VITE_WS_ENDPOINT,
  timeout: TIMEOUT,
  headers: {
    Accepts: 'application/json',
    'Content-Type': 'application/json',
  },
  validateStatus: (status: number) => status >= 200,
});

instance.interceptors.request.use((config: any) => {
  const session = storage.get('session', null);
  if (session?.token) config.headers.Authorization = `Bearer ${session?.token}`;
  return config;
});

const forceLogout = throttle(() => {
  console.log('force logout!');
  window.location.href = `/logout?from=${window.location.href}`;
}, 1000);

instance.interceptors.response.use(
  (res) => {
    if (res.status === 403 && res?.config?.method !== 'post') {
      if (res?.data?.message) Toast.error(res?.data?.message);
    }
    if (res.status === 401) {
      // TODO: 401 TOO MUCH VAGUE, does not know if invalid token or token expired etc...
      Toast.error('Session expired!');
      forceLogout();
      // throw Object.assign(
      //   new Error(res?.data?.message || 'Error 401'),
      //   { data: res?.data }
      // )
    }
    if (res.status === 422) {
      if (res?.data?.message) Toast.error(res?.data?.message);
    }
    return res;
  },
  (error) => {
    // console.warn('handle error!', error)
    return error;
  }
);

// const wait = async (t: number) => await new Promise((resolve) => setTimeout(resolve, t))

async function get<T>(
  { url, params, transform }: IParams<T>,
  config?: AxiosRequestConfig<any>
): Promise<T> {
  const raw = await instance.get(url, { ...config, params });
  if (raw?.status === 404) {
    Toast.error('Not found!');
    throw Object.assign(new Error('Not found'), { not_found: true });
  }
  return typeof transform === 'function' ? transform(raw) : (raw as T);
}

async function post<T = unknown>(
  { url, payload, transform }: IPayload<T>,
  config?: AxiosRequestConfig<any>
): Promise<T> {
  const raw = await instance.post(url, payload, config);
  if (raw?.status === 422) {
    throw Object.assign(new Error('Unprocessable Entity'), {
      errors: raw?.data?.errors,
    });
  }
  if (raw?.status >= 300) {
    if (raw?.data?.error === 'secondary_authentication') {
      throw Object.assign(new Error('Secondary Authentication Required'), {
        secondary_authentication: true,
        authToken: raw?.data?.meta?.auth_token || '',
      });
    }

    Toast.error(
      raw?.data?.message || raw?.data?.error || 'Unable to process',
      {}
    );
    throw Object.assign(new Error('Unable to process'), {});
  }

  return typeof transform === 'function' ? transform(raw) : (raw as T);
}

async function put<T = unknown>(
  { url, payload, transform }: IPayload<T>,
  config?: AxiosRequestConfig<any>
): Promise<T> {
  const raw = await instance.put(url, payload, config);
  if (raw?.status === 422) {
    throw Object.assign(new Error('Unprocessable Entity'), {
      errors: raw?.data?.errors,
    });
  }
  if (raw?.status >= 300) {
    Toast.error(raw?.data?.message || 'Unable to process');
    throw Object.assign(new Error('Unable to process'), {});
  }

  return typeof transform === 'function' ? transform(raw) : (raw as T);
}

async function patch<T = unknown>({
  url,
  payload,
  transform,
}: IPayload<T>): Promise<T> {
  const raw = await instance.patch(url, payload);
  if (raw?.status === 422) {
    throw Object.assign(new Error('Unprocessable Entity'), {
      errors: raw?.data?.errors,
    });
  }
  if (raw?.status >= 300) {
    Toast.error(raw?.data?.message || 'Unable to process');
    throw Object.assign(new Error('Unable to process'), {});
  }

  return typeof transform === 'function' ? transform(raw) : (raw as T);
}

async function remove<T = unknown>({
  url,
  payload,
  transform,
}: IPayload<T>): Promise<T> {
  const raw = await instance.delete(url, payload);
  if (raw?.status >= 300) {
    Toast.error(raw?.data?.message || 'Unable to process');
    throw Object.assign(new Error('Unable to process'), {});
  }

  return typeof transform === 'function' ? transform(raw) : (raw as T);
}

export { get, post, put, patch, remove };
