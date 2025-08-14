// services/auth.ts

import { AuthResponse, LoginCredentials } from '@/types/auth';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';


const API_URL = 'http://localhost:8080/api/v1';

/**
 * Server-side API instance (no localStorage)
 */
export const serverApi: AxiosInstance = axios.create({
  baseURL: API_URL,
});

/**
 * Browser-side API instance (with localStorage token support)
 */
export const browserApi: AxiosInstance = axios.create({
  baseURL: API_URL,
});

if (typeof window !== 'undefined') {
  // Add request interceptor
  browserApi.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('jwt');
      if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Add response interceptor
  browserApi.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('jwt');
        window.location.href = '/signin';
      }
      return Promise.reject(error);
    }
  );
}

/**
 * Login user
 */
export const loginUser = async (
  credentials: LoginCredentials,
  useBrowserClient = true
): Promise<AuthResponse> => {
  try {
    const api = useBrowserClient ? browserApi : serverApi;
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || error.message || 'Login failed';
      throw new Error(message);
    }
    throw new Error('An unexpected error occurred during login');
  }
};

/**
 * Set auth token for browser requests
 */
export const setAuthToken = (token: string | null): void => {
  if (typeof window === 'undefined') return; // Prevent SSR crash
  if (token) {
    browserApi.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('jwtToken', token);
  } else {
    delete browserApi.defaults.headers.common['Authorization'];
    localStorage.removeItem('jwtToken');
  }
};

/**
 * Get auth token from browser
 */
export const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null; // Prevent SSR crash
  return localStorage.getItem('jwtToken');
};
