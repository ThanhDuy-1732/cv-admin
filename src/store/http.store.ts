// Utilities
import { watch } from 'vue';
import { defineStore } from "pinia";
import queryString from "query-string";
import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

// Constants
import { HTTP_STATUS, HTTP_URL } from '@/constants/http';

// Stores
import { useAuthStore } from '@/store/auth.store';

export type HttpConfig = {
  token?: string;
};

type HttpState = {};

type HttpGetters = {
  instance(state?: HttpState): (customConfig?: HttpConfig) => AxiosInstance;
};

type HttpActions = {};

const handleResponseError = async (error: AxiosError): Promise<void> => {
  if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
    const authStore = useAuthStore();

    if (error.config?.url === HTTP_URL.GET_TOKEN) {
      authStore.clearAuth();

      window.location.href = '/auth/login';
      return;
    }
    
    if (!authStore.isRefreshingToken) {
      authStore.getToken();
    }

    watch(
      () => authStore.isRefreshingToken,
      async (isRefreshingAfter, isRefreshingBefore) => {
        if (isRefreshingAfter || !isRefreshingBefore) {
          return;
        }
        
        try {
          const originalRequest = error.config as InternalAxiosRequestConfig<any>;

          originalRequest?.headers.setAuthorization(`Bearer ${authStore.accessToken}`);
          const response = await axios.request(originalRequest);

          Promise.resolve(response);
        } catch (error) {
          Promise.reject(error);
        }
      }
    )

    return;
  }

  throw new ApiError(error);
}

export const useHttpStore = defineStore<"http", HttpState, HttpGetters, HttpActions>("http", {
  state: () => ({}),

  getters: {
    instance: (state) => (customConfig) => {
      const http = axios.create({
        baseURL: import.meta.env.VITE_SERVER_API,
        paramsSerializer: function (params) {
          return queryString.stringify(params, {
            skipNull: true,
            skipEmptyString: true,
          });
        },
      });

      http.interceptors.request.use((config) => {
        config.headers.setContentType("application/json");
        
        if (customConfig?.token) {
          config.headers.setAuthorization(`Bearer ${customConfig.token}`);
          return config;
        }
        
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          config.headers.setAuthorization(`Bearer ${accessToken}`);
        }

        return config;
      });

      http.interceptors.response.use((response: AxiosResponse) => {
        return response;
      }, (error: AxiosError) => {
        handleResponseError(error);
      })

      return http;
    },
  },
});

export type ErrorResponseData = any & {
  message: string;
}

export class ApiError extends Error {
  code: string;
  status: number;

  constructor(error: AxiosError) {
    super();

    this.message = (error.response?.data as ErrorResponseData)?.message;
    this.code = error.code as string;
    this.status = error.response?.status as number;
  }

  static isApiError(error: any) {
    return error instanceof ApiError
  }
}
