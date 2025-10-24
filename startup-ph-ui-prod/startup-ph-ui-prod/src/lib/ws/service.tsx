// lib/ws/service.tsx
import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import storage from '@/utils/storage';
import Toast from '@/ui/toast/Toast';

interface IParams<T> {
  url: string;
  params?: any;
  payload?: any;
  transform?: (res: any) => T;
  isUpload?: boolean; // New flag to determine which instance to use
}

interface IPayload<T> {
  url: string;
  payload?: any;
  transform?: (res: any) => T;
  isUpload?: boolean; // New flag to determine which instance to use
}

const TIMEOUT = 30000;

// Helper function to get cookie value
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  }
  return null;
}

// Create main instance
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_END_POINT,
  timeout: TIMEOUT,
  withCredentials: true, // Enable cookies for CSRF
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  validateStatus: (status: number) => status >= 200,
});

// Create uploader instance
const uploaderInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_UPLOADER_ENDPOINT,
  timeout: TIMEOUT,
  headers: {
    Accepts: 'application/json',
    'Content-Type': 'multipart/form-data',
    'X-Api-Key': process.env.NEXT_PUBLIC_UPLOADER_API_KEY,
  },
  validateStatus: (status: number) => status >= 200,
});

// Add interceptors to both instances
[instance, uploaderInstance].forEach((instance) => {
  instance.interceptors.request.use((config: any) => {
    const session = storage.get('_session', null);
    if (session?.token) config.headers.Authorization = `Bearer ${session?.token}`;
    
    // Add XSRF token from cookie to header
    const xsrfToken = getCookie('XSRF-TOKEN');
    if (xsrfToken) {
      config.headers['X-XSRF-TOKEN'] = xsrfToken;
    }
    
    return config;
  });
});

// Helper function to get the appropriate instance
const getInstance = (isUpload?: boolean): AxiosInstance => {
  return isUpload ? uploaderInstance : instance;
};

// Helper function to get CSRF cookie
async function getCsrfCookie(): Promise<void> {
  try {
    // Use base URL without /api/v2 for sanctum endpoint
    console.log('Fetching CSRF cookie from:', `${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`);
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error('Failed to fetch CSRF cookie:', error);
  }
}

async function get<T>(
  { url, params, transform, isUpload }: IParams<T>,
  config?: AxiosRequestConfig<any>
): Promise<T> {
  const axiosInstance = getInstance(isUpload);
  const raw = await axiosInstance.get(url, { ...config, params });

  if (raw?.status === 422) {
    throw Object.assign(new Error(raw?.data?.message), { errors: raw?.data?.errors });
  }

  if (raw?.status === 404) {
    throw Object.assign(new Error('Not found'), { not_found: true });
  }

  if (raw?.status === 400) {
    throw Object.assign(new Error(raw?.data?.message), { errors: raw?.data?.errors, status: 400 });
  }

  if (raw?.status === 401) {
    if (typeof window !== 'undefined') window.location.href = '/logout';
  }

  return typeof transform === 'function' ? transform(raw) : (raw as T);
}

async function post<T = unknown>(
  { url, payload, transform, isUpload }: IPayload<T>,
  config?: AxiosRequestConfig<any>
): Promise<T> {
  // Get CSRF cookie before making POST request
  if (!isUpload) {
    await getCsrfCookie();
  }
  
  const axiosInstance = getInstance(isUpload);
  const raw = await axiosInstance.post(url, payload, config);

  if (raw?.status === 422) {
    throw Object.assign(new Error('Unprocessable Entity'), {
      errors: raw?.data?.errors,
      message: raw?.data?.message,
      status: raw?.status,
    });
  }

  if (raw?.status >= 300) {
    const errMessage = raw?.data?.message || 'Unable to process';
    console.error('🚨 API Error Response:', raw?.data);
    console.error('🚨 API Error Status:', raw?.status);
    Toast.error(errMessage);
    throw Object.assign(new Error(errMessage), { status: raw?.status });
  }

  return typeof transform === 'function' ? transform(raw) : (raw as T);
}

async function put<T = unknown>(
  { url, payload, transform, isUpload }: IPayload<T>,
  config?: AxiosRequestConfig<any>
): Promise<T> {
  const axiosInstance = getInstance(isUpload);
  const raw = await axiosInstance.put(url, payload, config);

  if (raw?.status === 422) {
    throw Object.assign(new Error('Unprocessable Entity'), {
      errors: raw?.data?.errors,
      message: raw?.data?.message,
      status: raw?.status,
    });
  }

  if (raw?.status >= 300) {
    Toast.error(raw?.data?.message || 'Unable to process');
    throw Object.assign(new Error('Unable to process'), {});
  }

  return typeof transform === 'function' ? transform(raw) : (raw as T);
}

async function patch<T = unknown>({ url, payload, transform, isUpload }: IPayload<T>): Promise<T> {
  const axiosInstance = getInstance(isUpload);
  const raw = await axiosInstance.patch(url, payload);

  if (raw?.status === 422) {
    throw Object.assign(new Error('Unprocessable Entity'), {
      errors: raw?.data?.errors,
      message: raw?.data?.message,
      status: raw?.status,
    });
  }

  if (raw?.status >= 300) {
    Toast.error(raw?.data?.message || 'Unable to process');
    throw Object.assign(new Error('Unable to process'), {});
  }

  return typeof transform === 'function' ? transform(raw) : (raw as T);
}

async function remove<T = unknown>({ url, payload, transform, isUpload }: IPayload<T>): Promise<T> {
  const axiosInstance = getInstance(isUpload);
  const raw = await axiosInstance.delete(url, payload);

  if (raw?.status >= 300) {
    Toast.error(raw?.data?.message || 'Unable to process');
    throw Object.assign(new Error('Unable to process'), {});
  }

  return typeof transform === 'function' ? transform(raw) : (raw as T);
}

export { get, post, put, patch, remove };
